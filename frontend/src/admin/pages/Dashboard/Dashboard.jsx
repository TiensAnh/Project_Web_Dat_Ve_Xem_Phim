import { useState } from 'react'
import classNames from 'classnames/bind'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import DataTable from '../../components/common/DataTable/DataTable.jsx'
import styles from './Dashboard.module.css'

const cx = classNames.bind(styles)
const numberFormat = new Intl.NumberFormat('vi-VN')
const dayFormat = new Intl.DateTimeFormat('vi-VN', {
  timeZone: 'Asia/Ho_Chi_Minh',
  day: '2-digit',
  month: '2-digit',
})
const screeningFormat = new Intl.DateTimeFormat('vi-VN', {
  timeZone: 'Asia/Ho_Chi_Minh',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})
const millisecondsPerDay = 24 * 60 * 60 * 1000

// Dùng dữ liệu mẫu cho đến khi có API. Số cuối là doanh thu hôm nay.
const MOCK_REVENUE = [8650000, 10780000, 9200000, 11600000, 10420000, 13260000, 12450000]
const MOCK_MOVIES = [
  { id: 'quy-tu', title: 'Quý Tử Vượt Giàu', ticketsSold: 96 },
  { id: 'nguoi-nhen', title: 'Người Nhện: Khởi Đầu Mới', ticketsSold: 248 },
  { id: 'ho-linh', title: 'Hồ Linh Tráng Sĩ', ticketsSold: 173 },
  { id: 'trai-buon-nguoi', title: 'Trại Buôn Người', ticketsSold: 216 },
  { id: 'nghi-he', title: 'Nghỉ Hè Sợ Nghỉ Hưu', ticketsSold: 137 },
  { id: 'bo-sua-bay', title: 'Bò Sữa Bay', ticketsSold: 64 },
]

// Đơn mẫu dùng mốc tương đối để vẫn hiển thị gần ngày mở Dashboard.
const MOCK_BOOKINGS = [
  {
    id: 'TM-1022', customer: 'Trần Minh Anh', movie: 'Hồ Linh Tráng Sĩ',
    minutesAgo: 55, screeningHoursAhead: 3, tickets: 2, total: 180000, status: 'paid',
  },
  {
    id: 'TM-1024', customer: 'Nguyễn Thu Hà', movie: 'Người Nhện: Khởi Đầu Mới',
    minutesAgo: 5, screeningHoursAhead: 4, tickets: 3, total: 315000, status: 'paid',
  },
  {
    id: 'TM-1020', customer: 'Phạm Hoàng Nam', movie: 'Quý Tử Vượt Giàu',
    minutesAgo: 180, screeningHoursAhead: 6, tickets: 2, total: 150000, status: 'paid',
  },
  {
    id: 'TM-1023', customer: 'Lê Gia Bảo', movie: 'Trại Buôn Người',
    minutesAgo: 12, screeningHoursAhead: 2, tickets: 2, total: 190000, status: 'pending',
  },
  {
    id: 'TM-1021', customer: 'Vũ Ngọc Linh', movie: 'Nghỉ Hè Sợ Nghỉ Hưu',
    minutesAgo: 90, screeningHoursAhead: 5, tickets: 1, total: 85000, status: 'cancelled',
  },
]

const BOOKING_STATUS_LABELS = {
  paid: 'Đã thanh toán',
  pending: 'Chờ thanh toán',
  cancelled: 'Đã hủy',
}

function createMockBookings() {
  const now = Date.now()
  const millisecondsPerMinute = 60_000
  const millisecondsPerHour = 60 * millisecondsPerMinute
  const currentHour = Math.floor(now / millisecondsPerHour) * millisecondsPerHour

  return MOCK_BOOKINGS.map(({ minutesAgo, screeningHoursAhead, ...booking }) => ({
    ...booking,
    createdAt: now - minutesAgo * millisecondsPerMinute,
    screeningAt: new Date(currentHour + screeningHoursAhead * millisecondsPerHour),
  }))
}

// Định dạng tiền đầy đủ cho thẻ, tooltip và bảng đơn. Trục biểu đồ dùng đơn vị triệu đồng.
function formatMoney(amount) {
  return numberFormat.format(amount) + ' đ'
}

function createRevenueByDay() {
  const today = Date.now()

  return MOCK_REVENUE.map((revenue, index) => {
    const daysAgo = MOCK_REVENUE.length - 1 - index
    return { date: dayFormat.format(today - daysAgo * millisecondsPerDay).replace('-', '/'), revenue }
  })
}

const STATS = [
  { id: 'revenue', label: 'Doanh thu hôm nay', value: formatMoney(MOCK_REVENUE.at(-1)), icon: 'fa-coins' },
  { id: 'tickets', label: 'Vé đã bán', value: '186', icon: 'fa-ticket' },
  { id: 'movies', label: 'Phim đang chiếu', value: '14', icon: 'fa-film' },
  { id: 'screenings', label: 'Suất chiếu hôm nay', value: '38', icon: 'fa-calendar-days' },
]

function RevenueChart({ revenueByDay }) {
  return (
    <section className={cx('analyticsPanel')} aria-labelledby="dashboard-revenue-title">
      <h2 id="dashboard-revenue-title">Doanh thu 7 ngày gần nhất</h2> 
      <p className={cx('panelCaption')}>Đơn vị trục dọc là triệu đồng</p>

      <ResponsiveContainer width="100%" height={260} minWidth={0}>
        <BarChart data={revenueByDay} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="date"
            interval={0}
            tick={{ fill: '#64748b', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            width={38}
            tick={{ fill: '#64748b', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={value => numberFormat.format(value / 1_000_000)}
          />
          <Tooltip
            labelFormatter={date => 'Ngày ' + date}
            formatter={value => [formatMoney(value), 'Doanh thu']}
            cursor={{ fill: '#eff6ff' }}
            contentStyle={{ borderRadius: 8, borderColor: '#e2e8f0' }}
          />
          <Bar
            dataKey="revenue"
            name="Doanh thu"
            fill="#2563eb"
            radius={[6, 6, 0, 0]}
            maxBarSize={36}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}

function TopMovies({ movies }) {
  // Sắp xếp bản sao để giữ nguyên dữ liệu nguồn, rồi lấy tối đa 5 phim.
  const topMovies = [...movies]
    .sort((first, second) => second.ticketsSold - first.ticketsSold)
    .slice(0, 5)

  return (
    <section className={cx('analyticsPanel')} aria-labelledby="dashboard-top-movies-title">
      <h2 id="dashboard-top-movies-title">Top 5 phim bán vé nhiều nhất</h2>
      <p className={cx('panelCaption')}>Trong 7 ngày gần nhất</p>

      <ol className={cx('movieRanking')}>
        {topMovies.map(({ id, title, ticketsSold }, index) => (
          <li key={id} className={cx('rankingItem')}>
            <span className={cx('rank')} aria-hidden="true">{index + 1}</span>
            <span className={cx('movieName')}>{title}</span>
            <span className={cx('ticketCount')}>{numberFormat.format(ticketsSold)} vé</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

const BOOKING_COLUMNS = [
  { key: 'id', label: 'Mã đơn', rowHeader: true },
  { key: 'customer', label: 'Khách hàng' },
  { key: 'movie', label: 'Phim' },
  {
    key: 'screeningAt',
    label: 'Suất chiếu',
    render: ({ screeningAt }) => (
      <time className={cx('screeningTime')} dateTime={screeningAt.toISOString()}>
        {screeningFormat.format(screeningAt)}
      </time>
    ),
  },
  { key: 'tickets', label: 'Số vé', numeric: true, render: ({ tickets }) => numberFormat.format(tickets) },
  { key: 'total', label: 'Tổng tiền', numeric: true, render: ({ total }) => formatMoney(total) },
  {
    key: 'status',
    label: 'Trạng thái',
    render: ({ status }) => <span className={cx('bookingStatus', status)}>{BOOKING_STATUS_LABELS[status]}</span>,
  },
]

function RecentBookings({ bookings }) {
  // Sắp xếp bản sao theo thời điểm tạo để đơn mới nhất đứng đầu.
  const sortedBookings = [...bookings].sort((first, second) => second.createdAt - first.createdAt)

  return (
    <section className={cx('analyticsPanel', 'recentBookings')} aria-labelledby="dashboard-bookings-title">
      <div className={cx('bookingsHeader')}>
        <h2 id="dashboard-bookings-title">Đơn đặt vé gần đây</h2>
      </div>

      <DataTable
        label="Bảng đơn đặt vé gần đây"
        columns={BOOKING_COLUMNS}
        rows={sortedBookings}
        minWidth={760}
      />
    </section>
  )
}

export default function Dashboard() {
  const [revenueByDay] = useState(createRevenueByDay)
  const [bookings] = useState(createMockBookings)

  return (
    <section className={cx('overview')} aria-label="Số liệu tổng quan">
      {/* Mỗi thẻ ghép tên chỉ số (dt) với giá trị tương ứng (dd). */}
      <dl className={cx('stats')}>
        {STATS.map(({ id, label, value, icon }) => (
          <div key={id} className={cx('card', id)}>
            <dt className={cx('cardHeader')}>
              <span>{label}</span>
              <span className={cx('iconBadge')} aria-hidden="true">
                <i className={cx('fa-solid', icon)} />
              </span>
            </dt>
            <dd className={cx('value')}>{value}</dd>
          </div>
        ))}
      </dl>

      <div className={cx('analytics')}>
        <div className={cx('analyticsGrid')}>
          <RevenueChart revenueByDay={revenueByDay} />
          <TopMovies movies={MOCK_MOVIES} />
        </div>
      </div>

      <RecentBookings bookings={bookings} />
    </section>
  )
}

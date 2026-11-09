import { ALL_MOVIES } from '../../../data/moviesData.js'
import AdminList from '../../components/common/AdminList/AdminList.jsx'
import { ROOMS } from '../../data/roomsData.js'

const SCREENING_COLUMNS = [
  { key: 'movieTitle', label: 'Phim', rowHeader: true, truncate: true },
  { key: 'cinemaName', label: 'Rạp', truncate: true },
  { key: 'roomName', label: 'Phòng' },
  { key: 'startTime', label: 'Giờ bắt đầu' },
  { key: 'endTime', label: 'Giờ kết thúc' },
  { key: 'price', label: 'Giá vé' },
  { key: 'status', label: 'Trạng thái' },
]

const timeFormat = new Intl.DateTimeFormat('vi-VN', {
  timeZone: 'Asia/Ho_Chi_Minh',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})
const priceFormat = new Intl.NumberFormat('vi-VN')
const roomsById = new Map(ROOMS.map(room => [room.id, room]))
const moviesById = new Map(ALL_MOVIES.map(movie => [movie.id, movie]))

// Giờ mẫu dùng UTC+07:00. Giờ kết thúc lấy từ thời lượng phim.
const MOCK_SCREENINGS = [
  { id: 'SC01', movieId: 24991, roomId: 'P01', startAt: '2026-11-09T10:00:00+07:00', price: 85000, status: 'Đang mở bán' },
  { id: 'SC02', movieId: 1, roomId: 'P02', startAt: '2026-11-09T10:45:00+07:00', price: 90000, status: 'Đang mở bán' },
  { id: 'SC03', movieId: 2, roomId: 'P03', startAt: '2026-11-09T11:30:00+07:00', price: 80000, status: 'Đang mở bán' },
  { id: 'SC04', movieId: 3, roomId: 'P04', startAt: '2026-11-09T13:00:00+07:00', price: 95000, status: 'Bản nháp' },
  { id: 'SC05', movieId: 24991, roomId: 'P05', startAt: '2026-11-09T14:00:00+07:00', price: 95000, status: 'Đang mở bán' },
  { id: 'SC06', movieId: 1, roomId: 'P06', startAt: '2026-11-09T15:30:00+07:00', price: 90000, status: 'Đã đóng bán vé' },
  { id: 'SC07', movieId: 2, roomId: 'P07', startAt: '2026-11-09T16:30:00+07:00', price: 105000, status: 'Đang mở bán' },
  { id: 'SC08', movieId: 3, roomId: 'P08', startAt: '2026-11-09T17:00:00+07:00', price: 105000, status: 'Bản nháp' },
  { id: 'SC09', movieId: 24991, roomId: 'P09', startAt: '2026-11-09T19:30:00+07:00', price: 115000, status: 'Đang mở bán' },
  { id: 'SC10', movieId: 1, roomId: 'P01', startAt: '2026-11-09T22:30:00+07:00', price: 95000, status: 'Đang mở bán' },
]

const SCREENINGS = MOCK_SCREENINGS.map(({ id, movieId, roomId, startAt, price, status }) => {
  const movie = moviesById.get(movieId)
  const room = roomsById.get(roomId)
  const startTime = Date.parse(startAt)

  return {
    id,
    movieTitle: movie.title,
    cinemaName: room.cinemaName,
    roomName: room.name,
    startTime: timeFormat.format(startTime),
    endTime: timeFormat.format(startTime + movie.duration * 60_000),
    price: priceFormat.format(price) + ' đ',
    status,
  }
})

export default function Screenings() {
  return <AdminList title="Danh sách lịch chiếu" columns={SCREENING_COLUMNS} rows={SCREENINGS} />
}

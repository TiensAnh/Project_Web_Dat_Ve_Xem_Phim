import { useState } from 'react'
import AdminList from '../../components/common/AdminList/AdminList.jsx'
import { ROOMS } from '../../data/roomsData.js'
import styles from './Seats.module.css'

const SEAT_COLUMNS = [
  { key: 'cinemaName', label: 'Rạp', truncate: true },
  { key: 'name', label: 'Phòng', rowHeader: true },
  { key: 'rowCount', label: 'Số hàng' },
  { key: 'seatCount', label: 'Tổng số ghế' },
]

const cinemaOptions = new Map(ROOMS.map(({ cinemaId, cinemaName }) => [cinemaId, cinemaName]))

export default function Seats() {
  const [cinemaId, setCinemaId] = useState('')
  const visibleRooms = cinemaId ? ROOMS.filter(room => String(room.cinemaId) === cinemaId) : ROOMS

  return (
    <>
      <label className={styles.cinemaFilter}>
        <span>Lọc theo rạp</span>
        <select value={cinemaId} onChange={event => setCinemaId(event.target.value)}>
          <option value="">Tất cả rạp</option>
          {[...cinemaOptions].map(([id, name]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
      </label>
      {/* Đổi rạp sẽ tạo lại danh sách từ trang đầu, còn ô chọn giữ focus. */}
      <AdminList key={cinemaId} title="Danh sách sơ đồ chỗ ngồi" columns={SEAT_COLUMNS} rows={visibleRooms} />
    </>
  )
}

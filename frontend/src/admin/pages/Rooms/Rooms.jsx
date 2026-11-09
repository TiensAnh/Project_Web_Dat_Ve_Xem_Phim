import AdminList from '../../components/common/AdminList/AdminList.jsx'
import { ROOMS } from '../../data/roomsData.js'

const ROOM_COLUMNS = [
  { key: 'id', label: 'Mã phòng', rowHeader: true },
  { key: 'cinemaName', label: 'Rạp', truncate: true },
  { key: 'name', label: 'Tên phòng' },
  { key: 'seatCount', label: 'Tổng số ghế' },
]

export default function Rooms() {
  return <AdminList title="Danh sách phòng chiếu" columns={ROOM_COLUMNS} rows={ROOMS} />
}

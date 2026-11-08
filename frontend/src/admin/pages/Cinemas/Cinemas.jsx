import { BRAND_ITEMS, CINEMAS_DATA } from '../../../data/cinemasData.js'
import AdminList from '../../components/common/AdminList/AdminList.jsx'

const brandNames = new Map(BRAND_ITEMS.map(({ id, name }) => [id, name]))
const CINEMA_COLUMNS = [
  { key: 'id', label: 'Mã rạp', rowHeader: true },
  { key: 'name', label: 'Tên rạp' },
  { key: 'brandId', label: 'Cụm rạp', render: ({ brandId }) => brandNames.get(brandId) },
  { key: 'city', label: 'Thành phố' },
  { key: 'address', label: 'Địa chỉ', truncate: true },
]

export default function Cinemas() {
  return <AdminList title="Danh sách rạp chiếu" columns={CINEMA_COLUMNS} rows={CINEMAS_DATA} />
}

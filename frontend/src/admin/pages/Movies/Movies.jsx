import { ALL_MOVIES } from '../../../data/moviesData.js'
import AdminList from '../../components/common/AdminList/AdminList.jsx'

const MOVIE_COLUMNS = [
  { key: 'id', label: 'Mã phim', rowHeader: true },
  { key: 'title', label: 'Tên phim', truncate: true },
  { key: 'genres', label: 'Thể loại', render: ({ genres }) => genres?.join(', ') },
  { key: 'duration', label: 'Thời lượng', render: ({ duration }) => duration == null ? null : duration + ' phút' },
  { key: 'ageRating', label: 'Độ tuổi' },
  { key: 'releaseDate', label: 'Ngày khởi chiếu' },
]

export default function Movies() {
  return <AdminList title="Danh sách phim" columns={MOVIE_COLUMNS} rows={ALL_MOVIES} />
}

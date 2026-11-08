import { ALL_MOVIES } from '../../../data/moviesData.js'
import AdminList from '../../components/common/AdminList/AdminList.jsx'

const PEOPLE_COLUMNS = [
  { key: 'name', label: 'Họ tên', rowHeader: true },
  { key: 'roles', label: 'Vai trò' },
  { key: 'movieCount', label: 'Số phim tham gia', numeric: true },
]

// Tạm gộp theo họ tên vì mã diễn viên và đạo diễn trong dữ liệu mẫu được đặt riêng.
function collectPeople(movies) {
  const peopleByName = new Map()

  function addCredit(person, role, movieId) {
    const name = person?.name?.normalize('NFC').trim().replace(/\s+/g, ' ')
    if (!name) return

    const id = name.toLocaleLowerCase('vi-VN')
    if (!peopleByName.has(id)) {
      peopleByName.set(id, { id, name, roles: new Set(), movies: new Set() })
    }

    const personCredits = peopleByName.get(id)
    personCredits.roles.add(role)
    personCredits.movies.add(movieId)
  }

  for (const movie of movies) {
    for (const actor of movie.casts ?? []) {
      addCredit(actor, 'Diễn viên', movie.id)
    }
    addCredit(movie.director, 'Đạo diễn', movie.id)
  }

  return Array.from(peopleByName.values(), ({ id, name, roles, movies }) => ({
    id,
    name,
    roles: [...roles].join(', '),
    movieCount: movies.size,
  }))
}

const PEOPLE = collectPeople(ALL_MOVIES)

export default function People() {
  return <AdminList title="Danh sách diễn viên / đạo diễn" columns={PEOPLE_COLUMNS} rows={PEOPLE} />
}

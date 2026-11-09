import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import classNames from 'classnames/bind'
import AdminLayout from './layouts/AdminLayout/AdminLayout.jsx'
import Blog from './pages/Blog/Blog.jsx'
import Cinemas from './pages/Cinemas/Cinemas.jsx'
import Movies from './pages/Movies/Movies.jsx'
import People from './pages/People/People.jsx'
import Rooms from './pages/Rooms/Rooms.jsx'
import Screenings from './pages/Screenings/Screenings.jsx'
import Seats from './pages/Seats/Seats.jsx'
import Users from './pages/Users/Users.jsx'
import styles from './AdminApp.module.css'

const cx = classNames.bind(styles)

// Tải Dashboard khi mở Tổng quan để trang khách không tải kèm thư viện biểu đồ.
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard.jsx'))

// Dùng chung đường dẫn và tiêu đề cho router, sidebar và breadcrumb.
const MENU_ITEMS = [
  { id: 'overview', path: 'dashboard', label: 'Tổng quan', Page: Dashboard },
  { id: 'users', path: 'user', label: 'Người dùng', Page: Users },
  { id: 'movies', path: 'movie', label: 'Phim', Page: Movies },
  { id: 'people', path: 'people', label: 'Diễn viên / Đạo diễn', Page: People },
  {
    id: 'cinema-management',
    label: 'Quản lý rạp',
    icon: 'cinemas',
    children: [
      { id: 'cinemas', path: 'cinema', label: 'Rạp chiếu', Page: Cinemas },
      { id: 'rooms', path: 'rooms', label: 'Phòng chiếu', Page: Rooms },
      { id: 'seats', path: 'seats', label: 'Sơ đồ chỗ ngồi', Page: Seats },
    ],
  },
  { id: 'screenings', path: 'screenings', label: 'Lịch chiếu', Page: Screenings },
  { id: 'blog', path: 'blog', label: 'Bài viết & Blog', Page: Blog },
]

const ADMIN_PAGES = MENU_ITEMS.flatMap(item =>
  item.children ? item.children.map(page => ({ ...page, parent: item })) : item
)

export default function AdminApp() {
  return (
    <div className={cx('root')}>
      <Routes>
        <Route element={<AdminLayout items={MENU_ITEMS} pages={ADMIN_PAGES} />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          {ADMIN_PAGES.map(({ path, Page }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
      </Routes>
    </div>
  )
}

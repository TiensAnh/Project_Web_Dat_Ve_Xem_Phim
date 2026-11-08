import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import AdminHeader from '../../components/layout/AdminHeader/AdminHeader.jsx'
import Sidebar, { MenuIcon } from '../../components/layout/Sidebar/Sidebar.jsx'
import classNames from 'classnames/bind'
import Blog from '../../pages/Blog/Blog.jsx'
import Cinemas from '../../pages/Cinemas/Cinemas.jsx'
import Movies from '../../pages/Movies/Movies.jsx'
import People from '../../pages/People/People.jsx'
import Users from '../../pages/Users/Users.jsx'
import styles from './AdminLayout.module.css'

const cx = classNames.bind(styles)

// Tải Dashboard khi mở Tổng quan để trang khách không tải kèm thư viện biểu đồ.
const Dashboard = lazy(() => import('../../pages/Dashboard/Dashboard.jsx'))

const MENU_ITEMS = [
  { id: 'overview', label: 'Tổng quan' },
  { id: 'users', label: 'Người dùng' },
  { id: 'movies', label: 'Phim' },
  { id: 'people', label: 'Diễn viên / Đạo diễn' },
  { id: 'cinemas', label: 'Rạp chiếu' },
  { id: 'screenings', label: 'Lịch chiếu' },
  { id: 'seats', label: 'Sơ đồ chỗ ngồi' },
  { id: 'blog', label: 'Bài viết & Blog' },
]

export default function AdminLayout() {
  const [selectedId, setSelectedId] = useState('overview')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOn, setIsOn] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const sidebarRef = useRef(null)
  const menuButtonRef = useRef(null)
  const selectedItem = MENU_ITEMS.find((item) => item.id === selectedId)

  // Thêm mục con sau mục cha khi cần hiển thị đường dẫn nhiều cấp.
  const breadcrumbItems = [selectedItem]

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const handleChange = (event) => {
      setIsMobile(event.matches)
      setIsMenuOpen(false)
    }
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!isMobile || !isMenuOpen) return

    const sidebar = sidebarRef.current
    const menuButton = menuButtonRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menuButton.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setIsMenuOpen(false)
        return
      }

      if (event.key !== 'Tab') return
      const buttons = [menuButton, ...sidebar.querySelectorAll('button:not(:disabled)')]
      const first = buttons[0]
      const last = buttons[buttons.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      if (menuButton.getClientRects().length > 0) {
        menuButton.focus()
      } else {
        sidebar.querySelector('[aria-current="page"]')?.focus()
      }
    }
  }, [isMobile, isMenuOpen])

  const handleSelect = (id) => {
    setSelectedId(id)
    setIsMenuOpen(false)
  }

  const handleToggle = () => {
    setIsOn(previous => !previous)
  }

  const isCollapsed = isOn && !isMobile

  return (
    <div className={cx('layout', { collapsed: isCollapsed })}>
      <a href="#admin-content" className={cx('skipLink')} inert={isMobile && isMenuOpen}>
        Đến nội dung chính
      </a>

      <AdminHeader
        menuButtonRef={menuButtonRef}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(previous => !previous)}
        isOn={isCollapsed}
        onToggle={handleToggle}
      />

      {isMobile && isMenuOpen && (
        <div className={cx('backdrop')} onClick={() => setIsMenuOpen(false)} aria-hidden="true" />
      )}
      <Sidebar
        items={MENU_ITEMS}
        selectedId={selectedId}
        onSelect={handleSelect}
        isMobile={isMobile}
        isOpen={isMenuOpen}
        isCollapsed={isCollapsed}
        sidebarRef={sidebarRef}
      />

      <div className={cx('content')} inert={isMobile && isMenuOpen}>
        <main id="admin-content" className={cx('main')} tabIndex={-1}>
          <div className={cx('pageHeading')}>
            <nav className={cx('breadcrumb')} aria-label="Đường dẫn quản trị">
              <ol>
                <li>
                  <button type="button" onClick={() => handleSelect('overview')}>Home</button>
                </li>
                {breadcrumbItems.map((item, index) => (
                  <li key={item.id}>
                    <span className={cx('breadcrumbSeparator')} aria-hidden="true">&gt;</span>
                    <span aria-current={index === breadcrumbItems.length - 1 ? 'page' : undefined}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ol>
            </nav>
            <h1 className={cx('pageTitle')} aria-live="polite">
              <span className={cx('pageIcon')} aria-hidden="true">
                <MenuIcon name={selectedItem.id} />
              </span>
              {selectedItem.label}
            </h1>
          </div>
          {selectedId === 'overview' && (
            <Suspense fallback={<p>Đang tải tổng quan…</p>}>
              <Dashboard />
            </Suspense>
          )}
          {selectedId === 'users' && <Users />}
          {selectedId === 'movies' && <Movies />}
          {selectedId === 'people' && <People />}
          {selectedId === 'cinemas' && <Cinemas />}
          {selectedId === 'blog' && <Blog />}
        </main>
      </div>
    </div>
  )
}

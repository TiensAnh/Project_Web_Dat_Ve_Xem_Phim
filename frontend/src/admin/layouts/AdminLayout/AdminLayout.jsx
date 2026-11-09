import { Suspense, useEffect, useRef, useState } from 'react'
import { Link, Outlet, useMatch } from 'react-router-dom'
import AdminHeader from '../../components/layout/AdminHeader/AdminHeader.jsx'
import Sidebar, { MenuIcon } from '../../components/layout/Sidebar/Sidebar.jsx'
import classNames from 'classnames/bind'
import styles from './AdminLayout.module.css'

const cx = classNames.bind(styles)

export default function AdminLayout({ items, pages }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOn, setIsOn] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const sidebarRef = useRef(null)
  const menuButtonRef = useRef(null)
  const match = useMatch('/admin/:page/*')
  const selectedItem = pages.find(item => item.path === match?.params.page?.toLowerCase()) ?? pages[0]
  const breadcrumbItems = selectedItem.parent ? [selectedItem.parent, selectedItem] : [selectedItem]

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
      const menuControls = [...sidebar.querySelectorAll('a[href], button:not(:disabled)')]
        .filter(control => !control.closest('[inert]'))
      const first = menuButton
      const last = menuControls.at(-1) ?? menuButton

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

  const closeMenu = () => setIsMenuOpen(false)

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
        <div className={cx('backdrop')} onClick={closeMenu} aria-hidden="true" />
      )}
      <Sidebar
        items={items}
        selectedItem={selectedItem}
        onNavigate={closeMenu}
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
                  <Link to="/admin/dashboard">Home</Link>
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
          <Suspense fallback={<p>Đang tải trang quản trị…</p>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import Sidebar from '../../components/layout/Sidebar/Sidebar.jsx'
import styles from './AdminLayout.module.css'

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
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const sidebarRef = useRef(null)
  const menuButtonRef = useRef(null)
  const selectedItem = MENU_ITEMS.find((item) => item.id === selectedId)

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
    sidebar.querySelector('button:not(:disabled)')?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setIsMenuOpen(false)
        return
      }

      if (event.key !== 'Tab') return
      const buttons = Array.from(sidebar.querySelectorAll('button:not(:disabled)'))
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

  return (
    <div className={styles.layout}>
      <a href="#admin-content" className={styles.skipLink}>Đến nội dung chính</a>

      {isMobile && isMenuOpen && (
        <div className={styles.backdrop} onClick={() => setIsMenuOpen(false)} aria-hidden="true" />
      )}

      <Sidebar
        items={MENU_ITEMS}
        selectedId={selectedId}
        onSelect={handleSelect}
        isMobile={isMobile}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        sidebarRef={sidebarRef}
      />

      <div className={styles.content} inert={isMobile && isMenuOpen}>
        <header className={styles.mobileHeader}>
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Mở menu quản trị"
            aria-controls="admin-sidebar"
            aria-expanded={isMenuOpen}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M4 6h16 M4 12h16 M4 18h16" />
            </svg>
          </button>
          <span>TianMovie Admin</span>
        </header>

        <main id="admin-content" className={styles.main} tabIndex={-1}>
          <p className={styles.eyebrow}>QUẢN TRỊ HỆ THỐNG</p>
          <h1 aria-live="polite">{selectedItem.label}</h1>
        </main>
      </div>
    </div>
  )
}

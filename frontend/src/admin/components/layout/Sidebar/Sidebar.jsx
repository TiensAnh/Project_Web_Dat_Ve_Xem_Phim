import logo from '../../../assets/Logo/Logo_darkTheme.png'
import styles from './Sidebar.module.css'

const ICON_PATHS = {
  overview: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  users: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6 M16 10a2.5 2.5 0 1 0 0-5 M3 20v-2a5 5 0 0 1 10 0v2z M16 14a4 4 0 0 1 5 4v2h-5',
  movies: 'M4 3h16v18H4z M8 3v18 M16 3v18 M4 8h4 M4 16h4 M16 8h4 M16 16h4',
  people: 'M12 3 3 7v6c0 4 5 7 9 8 4-1 9-4 9-8V7z M8 12l3 3 5-6',
  cinemas: 'M5 21V3h14v18 M3 21h18 M9 7h1 M14 7h1 M9 11h1 M14 11h1 M10 21v-6h4v6',
  screenings: 'M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2z M7 2v5 M17 2v5 M3 10h18 M7 14h3 M14 14h3',
  seats: 'M7 13V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8 M5 9a2 2 0 0 0-2 2v7h18v-7a2 2 0 0 0-4 0v3H7v-3a2 2 0 0 0-2-2 M6 18v3 M18 18v3',
  blog: 'M5 3h10l4 4v14H5z M14 3v5h5 M9 12h6 M9 16h6',
  logout: 'M10 4H4v16h6 M14 8l4 4-4 4 M8 12h13',
}

function MenuIcon({ name }) {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICON_PATHS[name]} />
    </svg>
  )
}

export default function Sidebar({ items, selectedId, onSelect, isMobile, isOpen, onClose, sidebarRef }) {
  return (
    <aside
      id="admin-sidebar"
      ref={sidebarRef}
      className={styles.sidebar + (isOpen ? ' ' + styles.open : '')}
      role={isMobile ? 'dialog' : undefined}
      aria-modal={isMobile && isOpen ? true : undefined}
      aria-label="Menu quản trị TianMovie"
      inert={isMobile && !isOpen}
    >
      <div className={styles.brand}>
        <img src={logo} alt="TianMovie" width="196" height="65" />
        <span>QUẢN TRỊ HỆ THỐNG</span>
        <button className={styles.closeButton} type="button" onClick={onClose} aria-label="Đóng menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="m6 6 12 12 M18 6 6 18" />
          </svg>
        </button>
      </div>

      <nav className={styles.navigation} aria-label="Các mục quản trị">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={styles.menuItem + (selectedId === item.id ? ' ' + styles.active : '')}
            aria-current={selectedId === item.id ? 'page' : undefined}
            onClick={() => onSelect(item.id)}
          >
            <MenuIcon name={item.id} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className={styles.footer} title="Đăng xuất sẽ khả dụng khi có đăng nhập">
        <button type="button" className={styles.logout} disabled>
          <MenuIcon name="logout" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  )
}

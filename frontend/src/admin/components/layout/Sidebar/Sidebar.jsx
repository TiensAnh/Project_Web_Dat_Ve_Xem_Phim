import { useId, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Sidebar.module.css'

const cx = classNames.bind(styles)

const ICON_PATHS = {
  overview: 'M3 3h7v7H3z M14 3h 7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  users: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6 M16 10a2.5 2.5 0 1 0 0-5 M3 20v-2a5 5 0 0 1 10 0v2z M16 14a4 4 0 0 1 5 4v2h-5',
  movies: 'M4 3h16v18H4z M8 3v18 M16 3v18 M4 8h4 M4 16h4 M16 8h4 M16 16h4',
  people: 'M12 3 3 7v6c0 4 5 7 9 8 4-1 9-4 9-8V7z M8 12l3 3 5-6',
  cinemas: 'M5 21V3h14v18 M3 21h18 M9 7h1 M14 7h1 M9 11h1 M14 11h1 M10 21v-6h4v6',
  rooms: 'M4 4h16v12H4z M8 20h8 M12 16v4',
  screenings: 'M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2z M7 2v5 M17 2v5 M3 10h18 M7 14h3 M14 14h3',
  seats: 'M7 13V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8 M5 9a2 2 0 0 0-2 2v7h18v-7a2 2 0 0 0-4 0v3H7v-3a2 2 0 0 0-2-2 M6 18v3 M18 18v3',
  blog: 'M5 3h10l4 4v14H5z M14 3v5h5 M9 12h6 M9 16h6',
  logout: 'M10 4H4v16h6 M14 8l4 4-4 4 M8 12h13',
}

// Dùng cùng icon ở sidebar và tiêu đề của trang quản trị.
export function MenuIcon({ name }) {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICON_PATHS[name]} />
    </svg>
  )
}

function SidebarLink({ item, onNavigate }) {
  return (
    <NavLink
      to={'/admin/' + item.path}
      className={({ isActive }) => cx('menuItem', { active: isActive })}
      aria-label={item.label}
      onClick={onNavigate}
    >
      <MenuIcon name={item.id} />
      <span>{item.label}</span>
    </NavLink>
  )
}

function SidebarGroup({ item, active, onNavigate }) {
  const contentId = useId()
  const [expansion, setExpansion] = useState(false)

function toggleGroup (){
  const nextOpen = !expansion;
  setExpansion(nextOpen)
}
  return (
    <div className={cx('menuGroup')}>
      <button
        type="button"
        className={cx('menuItem', { groupActive: active })}
        aria-controls={contentId}
        aria-expanded={expansion}
        onClick={toggleGroup}
      >
        <MenuIcon name={item.icon} />
        <span>{item.label}</span>
        <svg className={cx('chevron', { rotated: expansion })} width="16" height="16"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m9 6 6 6-6 6" />
        </svg>
      </button>
      <div id={contentId} className={cx('subMenu', { expanded: expansion })} inert={!expansion}>
        <div className={cx('subMenuLinks')}>
          {item.children.map(child => <SidebarLink key={child.id} item={child} onNavigate={onNavigate} />)}
        </div>
      </div>
    </div>
  )
}

export default function Sidebar({ items, selectedItem, onNavigate, isMobile, isOpen, isCollapsed, sidebarRef }) {
  return (
    <aside
      id="admin-sidebar"
      ref={sidebarRef}
      className={cx('sidebar', { open: isOpen, collapsed: isCollapsed })}
      aria-label="Menu quản trị TianMovie"
      inert={isCollapsed || (isMobile && !isOpen)}
    >
      <nav className={cx('navigation')} aria-label="Các mục quản trị">
        {items.map(item => item.children ? (
          <SidebarGroup key={item.id} item={item} active={selectedItem.parent?.id === item.id} onNavigate={onNavigate} />
        ) : (
          <SidebarLink key={item.id} item={item} onNavigate={onNavigate} />
        ))}
      </nav>
    </aside>
  )
}

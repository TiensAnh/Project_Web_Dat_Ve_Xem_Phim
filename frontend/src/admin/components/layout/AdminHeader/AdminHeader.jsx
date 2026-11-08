import { useEffect, useRef, useState } from 'react'
import logo from '../../../assets/Logo/Logo_darkTheme.png'
import classNames from 'classnames/bind'
import styles from './AdminHeader.module.css'

const cx = classNames.bind(styles)

export default function AdminHeader({ menuButtonRef, isMenuOpen, onToggleMenu, isOn, onToggle }) {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const accountRef = useRef(null)
  const accountButtonRef = useRef(null)

  useEffect(() => {
    if (!isAccountMenuOpen) return

    const handlePointerDown = (event) => {
      if (!accountRef.current?.contains(event.target)) setIsAccountMenuOpen(false)
    }

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      setIsAccountMenuOpen(false)
      accountButtonRef.current?.focus()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isAccountMenuOpen])

  return (
    <header className={cx('header')}>
      <div className={cx('brand')}>
        <a href='/admin'><img src={logo} alt="TianMovie" width="168" height="56" /></a>
        <button
            type="button"
            role="switch"
            aria-checked={isOn}
            aria-label="Ẩn sidebar"
            aria-controls="admin-sidebar"
            className={cx('toggle-switch', { 'is-on': !isOn })}
            onClick={onToggle}
        >
          <span className={cx('toggle-thumb')} />
        </button>
      </div>
      <div className={cx('actions')}>
        <button
          ref={menuButtonRef}
          type="button"
          className={cx('menuButton')}
          onClick={() => {
            setIsAccountMenuOpen(false)
            onToggleMenu()
          }}
          aria-label={isMenuOpen ? 'Đóng menu quản trị' : 'Mở menu quản trị'}
          aria-controls="admin-sidebar"
          aria-expanded={isMenuOpen}
        >
          <span className={cx('toggle-switch', { 'is-on': isMenuOpen })} aria-hidden="true">
            <span className={cx('toggle-thumb')} />
          </span>
        </button>
      </div>
      <div ref={accountRef} className={cx('account')}>
        <button
          ref={accountButtonRef}
          type="button"
          className={cx('accountButton')}
          aria-label="Tài khoản Quản trị viên"
          aria-controls="admin-account-menu"
          aria-expanded={isAccountMenuOpen}
          disabled={isMenuOpen}
          onClick={() => setIsAccountMenuOpen(previous => !previous)}
        >
          <span className={cx('avatar')} aria-hidden="true">QT</span>
          <span className={cx('accountName')}>Quản trị viên</span>
          <svg
            className={cx('accountArrow', { accountArrowOpen: isAccountMenuOpen })}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        <div id="admin-account-menu" className={cx('accountMenu')} hidden={!isAccountMenuOpen}>
          <p className={cx('accountMenuName')}>Quản trị viên</p>
          <button type="button" className={cx('accountMenuItem')} disabled>Hồ sơ</button>
          <button type="button" className={cx('accountMenuItem')} disabled>Cài đặt</button>
          <button type="button" className={cx('accountMenuItem')} disabled>Đăng xuất</button>
        </div>
      </div>
    </header>
  )
}

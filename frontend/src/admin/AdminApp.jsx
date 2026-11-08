import AdminLayout from './layouts/AdminLayout/AdminLayout.jsx'
import classNames from 'classnames/bind'
import styles from './AdminApp.module.css'

const cx = classNames.bind(styles)

export default function AdminApp() {
  return (
    <div className={cx('root')}>
      <AdminLayout />
    </div>
  )
}

import AdminLayout from './layouts/AdminLayout/AdminLayout.jsx'
import styles from './AdminApp.module.css'

export default function AdminApp() {
  return (
    <div className={styles.root}>
      <AdminLayout />
    </div>
  )
}

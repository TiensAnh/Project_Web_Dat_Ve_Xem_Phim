import { useId, useState } from 'react'
import classNames from 'classnames/bind'
import DataTable from '../DataTable/DataTable.jsx'
import styles from './AdminList.module.css'

const cx = classNames.bind(styles)
const PAGE_SIZE = 8

// Các nút sẽ được bật khi có luồng thêm, sửa và xóa.
function RowActions() {
  return (
    <div className={cx('rowActions')}>
      <button type="button" className={cx('actionButton', 'addAction')} aria-label="Thêm" title="Thêm" disabled>
        <i className={cx('fa-solid', 'fa-plus')} aria-hidden="true" />
      </button>
      <button type="button" className={cx('actionButton', 'editAction')} aria-label="Sửa" title="Sửa" disabled>
        <i className={cx('fa-solid', 'fa-pen-to-square')} aria-hidden="true" />
      </button>
      <button type="button" className={cx('actionButton', 'deleteAction')} aria-label="Xóa" title="Xóa" disabled>
        <i className={cx('fa-solid', 'fa-trash')} aria-hidden="true" />
      </button>
    </div>
  )
}

const ACTION_COLUMN = { key: 'actions', label: 'Thao tác', render: () => <RowActions /> }

export default function AdminList({ title, columns, rows }) {
  const headingId = useId()
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(rows.length / PAGE_SIZE)

  // Chỉ đưa các dòng của trang hiện tại vào DataTable.
  const startIndex = (page - 1) * PAGE_SIZE
  const visibleRows = rows.slice(startIndex, startIndex + PAGE_SIZE)

  const tableColumns = columns.map(column => ({
    ...column,
    render: row => {
      const value = column.render ? column.render(row) : row[column.key]
      return value == null || value === '' ? '—' : value
    },
  }))
  tableColumns.push(ACTION_COLUMN)

  let pagination = null
  if (totalPages > 1) {
    pagination = (
      <nav className={cx('pagination')} aria-label="Phân trang">
        <button
          type="button"
          className={cx('pageButton')}
          disabled={page === 1}
          onClick={() => setPage(previous => previous - 1)}
        >
          Trang trước
        </button>
        <span aria-live="polite">Trang {page} / {totalPages}</span>
        <button
          type="button"
          className={cx('pageButton')}
          disabled={page === totalPages}
          onClick={() => setPage(previous => previous + 1)}
        >
          Trang sau
        </button>
      </nav>
    )
  }

  return (
    <section className={cx('panel')} aria-labelledby={headingId}>
      <h2 id={headingId} className={cx('panelHeading')}>{title}</h2>
      <DataTable
        label={title}
        columns={tableColumns}
        rows={visibleRows}
        minWidth={740}
        centered
        changePage={pagination}
      />
    </section>
  )
}

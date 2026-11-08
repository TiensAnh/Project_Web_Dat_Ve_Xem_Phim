import classNames from 'classnames/bind'
import styles from './DataTable.module.css'

const cx = classNames.bind(styles)

// Mỗi dòng có id riêng. Cột đọc dữ liệu theo key hoặc dùng render để định dạng ô.
export default function DataTable({ label, columns, rows, minWidth, changePage, centered }) {
  return (
    <>
      <div className={cx('scrollRegion')} role="region" aria-label={label} tabIndex={0}>
        <table className={cx('table', { centered })} aria-label={label} style={{ minWidth }}>
          <thead>
            <tr>
              {columns.map(({ key, label: columnLabel, numeric }) => (
                <th key={key} scope="col" className={cx({ numeric })}>{columnLabel}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id}>
                {columns.map(({ key, render, numeric, rowHeader, truncate }) => {
                  const Cell = rowHeader ? 'th' : 'td'
                  const value = render ? render(row) : row[key]

                  return (
                    <Cell key={key} scope={rowHeader ? 'row' : undefined} className={cx({ numeric })}>
                      {truncate && typeof value === 'string' ? (
                        <span className={cx('truncatedText')} title={value}>{value}</span>
                      ) : value}
                    </Cell>
                  )
                })}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className={cx('empty')} colSpan={columns.length}>Chưa có dữ liệu.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {changePage}
    </>
  )
}

import classNames from 'classnames/bind';
import style from './MovieInfo.module.css';

const cx = classNames.bind(style);

function MovieInfo({ info }) {
    if (!info) return null;

    return (
        <section className={cx('info-section')}>
            <h2 className={cx('section-title')}>Thông tin chi tiết</h2>

            {/* Specs Table */}
            {info.table && info.table.length > 0 && (
                <div className={cx('table-wrapper')}>
                    <table className={cx('specs-table')}>
                        <tbody>
                            {info.table.map((row, index) => (
                                <tr key={index}>
                                    <td className={cx('label-col')}>{row.label}</td>
                                    <td className={cx('val-col')}>{row.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Story Plot */}
            {info.storyPlot && (
                <div className={cx('block')}>
                    <h3 className={cx('block-title')}>Cốt truyện</h3>
                    <p className={cx('block-content')}>{info.storyPlot}</p>
                </div>
            )}

            {/* Highlights */}
            {info.highlights && info.highlights.length > 0 && (
                <div className={cx('block')}>
                    <h3 className={cx('block-title')}>Những lý do không thể bỏ qua</h3>
                    <ul className={cx('highlights-list')}>
                        {info.highlights.map((item, idx) => (
                            <li key={idx} className={cx('highlight-item')}>
                                <strong>{item.title}:</strong> {item.desc}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}

export default MovieInfo;

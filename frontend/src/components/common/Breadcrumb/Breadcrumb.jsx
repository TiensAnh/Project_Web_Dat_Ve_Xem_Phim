import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import style from './Breadcrumb.module.css';

const cx = classNames.bind(style);

function Breadcrumb({ items = [] }) {
    if (!items || items.length === 0) return null;

    return (
        <div className={cx('breadcrumb-wrapper')}>
            <div className={cx('container')}>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb-list')}>
                        {items.map((item, index) => {
                            const isLast = index === items.length - 1;

                            return (
                                <li key={index} className={cx('breadcrumb-item', { active: isLast })}>
                                    {isLast ? (
                                        <span className={cx('current-text')} aria-current="page">
                                            {item.label}
                                        </span>
                                    ) : (
                                        <Link to={item.path || '/'} className={cx('breadcrumb-link')}>
                                            {item.isHome ? (
                                                <i className={cx('fa-solid fa-house', 'home-icon')} title="Trang chủ"></i>
                                            ) : (
                                                item.label
                                            )}
                                        </Link>
                                    )}

                                    {/* Dấu phân cách '>' nếu không phải phần tử cuối cùng */}
                                    {!isLast && (
                                        <i className={cx('fa-solid fa-chevron-right', 'separator-icon')}></i>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </div>
        </div>
    );
}

export default Breadcrumb;

import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './CinemaBrandGrid.module.css';
import { getAllBrands } from '../../../data/cinemasData.js';

const cx = classNames.bind(style);

function CinemaBrandGrid({ brands, bgColor, initialCount = 8, step = 4 }) {
    // Toàn bộ 13 thương hiệu rạp (ưu tiên 8 rạp lớn ở trên đầu)
    const allBrands = useMemo(() => {
        return brands || getAllBrands();
    }, [brands]);

    // Mặc định hiển thị 8 brand lớn ban đầu
    const [visibleCount, setVisibleCount] = useState(initialCount);

    const hasMore = visibleCount < allBrands.length;
    const displayedBrands = allBrands.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => Math.min(prev + step, allBrands.length));
    };

    const customStyle = bgColor ? { backgroundColor: bgColor } : {};

    return (
        <section className={cx('cinema-brand-grid-section')} style={customStyle}>
            <div className={cx('container')}>
                {/* Tiêu đề & Phụ đề căn giữa chuẩn TianMovie */}
                <div className={cx('section-header')}>
                    <h2 className={cx('title')}>Hệ thống rạp chiếu phim</h2>
                    <p className={cx('subtitle')}>
                        Danh sách hệ thống rạp chiếu phim lớn có mặt khắp cả nước
                    </p>
                </div>

                {/* Lưới 2 cột chứa các thương hiệu rạp */}
                <div className={cx('brands-grid')}>
                    {displayedBrands.map((brand) => (
                        <Link
                            key={brand.id}
                            to={`/rap-chieu/${brand.id}`}
                            className={cx('brand-card')}
                        >
                            {/* Logo thương hiệu bên trái */}
                            <div className={cx('logo-wrapper')}>
                                <img
                                    src={brand.src}
                                    alt={brand.name}
                                    className={cx('logo-img')}
                                    loading="lazy"
                                />
                            </div>

                            {/* Cột thông tin chi tiết bên phải */}
                            <div className={cx('info-wrapper')}>
                                <h3 className={cx('brand-name')}>{brand.name}</h3>

                                {brand.description && (
                                    <p className={cx('brand-description')}>{brand.description}</p>
                                )}

                                {/* Dòng ưu đãi khuyến mãi đặc biệt (nếu có) */}
                                {brand.promotion && (
                                    <div className={cx('promo-row')}>
                                        <i className="fa-solid fa-gift"></i>
                                        <span>{brand.promotion}</span>
                                    </div>
                                )}

                                {/* Hàng đánh giá 5 sao kèm số lượng người đánh giá */}
                                <div className={cx('rating-row')}>
                                    <div className={cx('stars-box')}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <i
                                                key={star}
                                                className={cx(
                                                    'star-icon',
                                                    star <= (brand.rating || 5)
                                                        ? 'fa-solid fa-star'
                                                        : 'fa-regular fa-star star-empty'
                                                )}
                                                aria-hidden="true"
                                            ></i>
                                        ))}
                                    </div>
                                    <span className={cx('rating-count')}>
                                        {(brand.ratingCount || 0).toLocaleString('vi-VN')} đánh giá
                                    </span>
                                </div>

                                {/* Hàng số lượng rạp trong hệ thống */}
                                <div className={cx('store-row')}>
                                    <i className="fa-solid fa-location-dot"></i>
                                    <span>{brand.storeCount || 0} rạp</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Nút Xem thêm (ẩn khi đã hiển thị hết 13 brand, không có nút Thu gọn) */}
                {hasMore && (
                    <div className={cx('action-more')}>
                        <button
                            type="button"
                            className={cx('btn-more')}
                            onClick={handleLoadMore}
                        >
                            <span>Xem thêm</span>
                            <i className="fa-solid fa-chevron-down"></i>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default CinemaBrandGrid;

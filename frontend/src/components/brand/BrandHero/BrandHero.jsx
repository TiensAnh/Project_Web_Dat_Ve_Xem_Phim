import classNames from 'classnames/bind';
import style from './BrandHero.module.css';

const cx = classNames.bind(style);

function BrandHero({
    coverImage,
    logo,
    brandName = 'CGV',
    description = '',
    rating = 5,
    ratingCount = 0,
    storeCount = 0,
}) {
    // Render 5 ngôi sao: Đạt điểm là sao vàng đặc (fa-solid), chưa đạt là sao rỗng ruột bên trong (fa-regular)
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(Number(rating) || 5);

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(
                    <i key={i} className={cx('star-icon', 'fa-solid', 'fa-star')} aria-hidden="true"></i>
                );
            } else {
                stars.push(
                    <i key={i} className={cx('star-icon', 'star-empty', 'fa-regular', 'fa-star')} aria-hidden="true"></i>
                );
            }
        }
        return stars;
    };

    const formattedRatingCount = typeof ratingCount === 'number'
        ? ratingCount.toLocaleString('vi-VN')
        : ratingCount;

    return (
        <section
            className={cx('brand-hero')}
            style={coverImage ? { backgroundImage: `url(${coverImage})` } : undefined}
        >
            {/* Lớp phủ gradient tối tăng độ tương phản để chữ và avatar luôn nổi bật */}
            <div className={cx('hero-overlay')}></div>

            <div className={cx('container')}>
                <div className={cx('hero-content')}>
                    {/* Khối Avatar logo thương hiệu */}
                    <div className={cx('avatar-wrapper')}>
                        {logo ? (
                            <img src={logo} alt={brandName} className={cx('avatar-img')} />
                        ) : (
                            <div className={cx('avatar-placeholder')}>{brandName.charAt(0)}</div>
                        )}
                    </div>

                    {/* Cột thông tin chi tiết của thương hiệu rạp */}
                    <div className={cx('info-wrapper')}>
                        <h1 className={cx('brand-name')}>{brandName}</h1>

                        {description && (
                            <p className={cx('brand-description')}>{description}</p>
                        )}

                        {/* Hàng đánh giá theo số sao */}
                        <div className={cx('rating-row')}>
                            <div className={cx('stars-box')}>{renderStars()}</div>
                            <span className={cx('rating-score')}>{rating}</span>
                            <span className={cx('rating-separator')}>/</span>
                            <div className={cx('rating-users')}>
                                <i className="fa-solid fa-user"></i>
                                <span>{formattedRatingCount}</span>
                            </div>
                        </div>

                        {/* Hàng số cửa hàng có trong hệ thống */}
                        <div className={cx('store-row')}>
                            <i className="fa-solid fa-location-dot"></i>
                            <span>{storeCount} cửa hàng trong hệ thống</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BrandHero;

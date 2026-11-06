import classNames from 'classnames/bind';
import style from './CinemaHero.module.css';

const cx = classNames.bind(style);

function CinemaHero({
    coverImage,
    logo,
    cinemaName = '',
    brandName = '',
    address = '',
    mapUrl = '',
}) {
    return (
        <section
            className={cx('cinema-hero')}
            style={coverImage ? { backgroundImage: `url(${coverImage})` } : undefined}
        >
            {/* Lớp phủ gradient tối tăng tương phản */}
            <div className={cx('hero-overlay')}></div>

            <div className={cx('container')}>
                <div className={cx('hero-content')}>
                    {/* Logo cụm rạp / thương hiệu */}
                    <div className={cx('avatar-wrapper')}>
                        {logo ? (
                            <img src={logo} alt={cinemaName || brandName} className={cx('avatar-img')} />
                        ) : (
                            <div className={cx('avatar-placeholder')}>
                                {(cinemaName || 'R').charAt(0)}
                            </div>
                        )}
                    </div>

                    {/* Khối thông tin chi tiết của rạp */}
                    <div className={cx('info-wrapper')}>
                        <h1 className={cx('cinema-name')}>{cinemaName}</h1>

                        {/* Vị trí địa chỉ rạp */}
                        {address && (
                            <div className={cx('address-row')}>
                                <i className="fa-solid fa-location-dot"></i>
                                <span className={cx('address-text')}>{address}</span>
                            </div>
                        )}

                        {/* Nút bản đồ có gắn link Google Map */}
                        {mapUrl && (
                            <div className={cx('map-row')}>
                                <a
                                    href={mapUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={cx('map-link')}
                                    title={`Xem bản đồ đường đi tới ${cinemaName}`}
                                >
                                    <i className="fa-solid fa-diamond-turn-right"></i>
                                    <span>[ Bản đồ ]</span>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CinemaHero;

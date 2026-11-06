import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './CinemaInfo.module.css';
import { CINEMAS_DATA } from '../../../../../data/cinemasData.js';

const cx = classNames.bind(style);

// Dữ liệu rạp mặc định lấy từ mockdata tập trung
const DEFAULT_CINEMA = CINEMAS_DATA[0];

function CinemaInfo({ cinema = DEFAULT_CINEMA, isDark = false }) {
    const currentCinema = cinema || DEFAULT_CINEMA;
    const cinemaLink = currentCinema?.id ? `/rap/${currentCinema.id}` : '#';
    const mapUrl = currentCinema.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentCinema.name + ' ' + (currentCinema.address || ''))}`;

    const handleMapClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(mapUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div 
            className={cx('cinema-info-container', { 'dark-theme': isDark })}
        >
            {/* Logo rạp */}
            <div className={cx('logo-box')}>
                <img 
                    src={currentCinema.logo} 
                    alt={currentCinema.name} 
                    className={cx('logo-img')} 
                />
            </div>

            {/* Thông tin rạp */}
            <div className={cx('info-content')}>
                <h3 className={cx('cinema-title')}>
                    <Link 
                        to={cinemaLink} 
                        className={cx('cinema-title-link')}
                        title={`Xem chi tiết rạp ${currentCinema.name}`}
                    >
                        Lịch chiếu phim{' '}
                        <span className={cx('cinema-name')}>
                            {currentCinema.name}
                        </span>
                    </Link>
                </h3>
                <div className={cx('address-line')}>
                    <span className={cx('address-text')} title={currentCinema.address}>
                        {currentCinema.address}
                    </span>
                    <span 
                        role="button"
                        tabIndex={0}
                        className={cx('map-link')}
                        onClick={handleMapClick}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleMapClick(e);
                            }
                        }}
                        title="Xem bản đồ trên Google Maps"
                    >
                        [ Bản đồ ]
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CinemaInfo;
import classNames from 'classnames/bind';
import style from './CinemaSelector.module.css';

const cx = classNames.bind(style);

const DEFAULT_CINEMA = {
    name: 'CGV Vincom Royal City',
    logo: 'https://homepage.momocdn.net/cinema/momo-amazone-s3-api-240829164527-638605467276820522.png',
    address: 'Tầng B2 - Khu R4 | Vincom Mega Mall Royal City , số 72A đường Nguyễn Trãi, quận Thanh Xuân, Hà Nội',
};

function CinemaSelector({
    cinema = DEFAULT_CINEMA,
    label = 'Chọn rạp xem lịch chiếu',
    onClick,
    isOpen = false,
    isDark = false,
}) {
    const currentCinema = cinema || DEFAULT_CINEMA;

    return (
        <div className={cx('cinema-selector-wrapper', { 'dark-theme': isDark })} onClick={onClick}>
            {/* Nhãn đè lên đường viền trên */}
            <span className={cx('selector-label')}>{label}</span>

            {/* Nội dung bên trong */}
            <div className={cx('selector-body')}>
                {/* Khung logo rạp */}
                <div className={cx('logo-box')}>
                    <img
                        src={currentCinema.logo}
                        alt={currentCinema.name}
                        className={cx('logo-img')}
                    />
                </div>

                {/* Thông tin tên và địa chỉ */}
                <div className={cx('info-box')}>
                    <div className={cx('cinema-name')}>{currentCinema.name}</div>
                    <div className={cx('cinema-address')} title={currentCinema.address}>
                        {currentCinema.address}
                    </div>
                </div>

                {/* Mũi tên dropdown */}
                <div className={cx('arrow-box', { open: isOpen })}>
                    <i className="fa-solid fa-chevron-down"></i>
                </div>
            </div>
        </div>
    );
}

export default CinemaSelector;
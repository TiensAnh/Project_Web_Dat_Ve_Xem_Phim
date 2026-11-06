import { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import style from './CityModal.module.css';

const cx = classNames.bind(style);

const VIETNAM_CITIES = [
    'Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Đồng Nai',
    'Lạng Sơn', 'Bình Dương', 'An Giang', 'Bà Rịa Vũng Tàu',
    'Bắc Giang', 'Bạc Liêu', 'Bắc Ninh', 'Bến Tre',
    'Bình Định', 'Bình Thuận', 'Cà Mau', 'Cần Thơ',
    'Đắk Lắk', 'Đồng Tháp', 'Gia Lai', 'Hà Nam',
    'Hà Tĩnh', 'Hải Dương', 'Hải Phòng', 'Hậu Giang',
    'Hưng Yên', 'Khánh Hòa', 'Kiên Giang', 'Kon Tum',
    'Lâm Đồng', 'Lào Cai', 'Long An', 'Nam Định',
    'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ',
    'Phú Yên', 'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi',
    'Quảng Ninh', 'Quảng Trị', 'Sóc Trăng', 'Sơn La',
    'Tây Ninh', 'Thái Bình', 'Thái Nguyên', 'Thanh Hóa',
    'Thừa Thiên Huế', 'Tiền Giang', 'Trà Vinh', 'Tuyên Quang',
    'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái', 'Cao Bằng',
    'Bắc Kạn', 'Điện Biên', 'Hà Giang', 'Hòa Bình',
    'Lai Châu'
];

function removeVietnameseTones(str) {
    if (!str) return '';
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
}

function CityModal({ isOpen, onClose, selectedCity = 'Hà Nội', onSelectCity, isDark = false }) {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const filteredCities = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) return VIETNAM_CITIES;

        const rawQuery = removeVietnameseTones(query);
        return VIETNAM_CITIES.filter((city) => {
            const lowerCity = city.toLowerCase();
            const rawCity = removeVietnameseTones(lowerCity);
            return lowerCity.includes(query) || rawCity.includes(rawQuery);
        });
    }, [searchTerm]);

    if (!isOpen) return null;

    const handleSelect = (city) => {
        if (onSelectCity) {
            onSelectCity(city);
        }
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className={cx('modal-overlay', { 'dark-theme': isDark })} onClick={onClose}>
            <div className={cx('modal-dialog', { 'dialog-dark': isDark })} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className={cx('modal-header')}>
                    <h3 className={cx('modal-title')}>Chọn địa điểm</h3>
                    <div className={cx('search-box')}>
                        <input
                            type="text"
                            className={cx('search-input')}
                            placeholder="Tìm địa điểm ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                        <i className={cx('search-icon', 'fa-solid', 'fa-magnifying-glass')}></i>
                    </div>
                    <button type="button" className={cx('close-btn')} onClick={onClose} aria-label="Đóng">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Body: Lưới tỉnh thành */}
                <div className={cx('modal-body')}>
                    {filteredCities.length > 0 ? (
                        <div className={cx('cities-grid')}>
                            {filteredCities.map((city) => {
                                const isSelected = city === selectedCity;
                                return (
                                    <button
                                        key={city}
                                        type="button"
                                        className={cx('city-item', { active: isSelected })}
                                        onClick={() => handleSelect(city)}
                                    >
                                        <span className={cx('city-name')}>{city}</span>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className={cx('empty-result')}>
                            Không tìm thấy địa điểm nào phù hợp với &quot;{searchTerm}&quot;
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className={cx('modal-footer')}>
                    <button type="button" className={cx('btn-close-action')} onClick={onClose}>
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CityModal;

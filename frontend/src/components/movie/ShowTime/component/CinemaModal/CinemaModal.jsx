import { useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './CinemaModal.module.css';
import CinemaBrands from '../CinemaBrands/CinemaBrands.jsx';
import CinemaList from '../CinemaList/CinemaList.jsx';

const cx = classNames.bind(style);

function CinemaModal({
    isOpen,
    onClose,
    brand_items,
    selectedBrandId = 'all',
    onSelectBrand,
    brand_items_time,
    cinemas,
    selectedCity,
    hideBrandBar = false,
    selectedCinema,
    onSelectCinema,
}) {
    // Khóa cuộn trang khi modal mở, lắng nghe phím ESC và tự đóng khi phóng to màn hình (> 768px)
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        const handleResize = () => {
            if (window.innerWidth > 768) {
                onClose();
            }
        };

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('resize', handleResize);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', handleResize);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSelectCinemaAndClose = (cinema) => {
        if (onSelectCinema) {
            onSelectCinema(cinema);
        }
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className={cx('modal-overlay')} onClick={onClose}>
            <div className={cx('modal-dialog')} onClick={(e) => e.stopPropagation()}>
                {/* Header modal: Nút X bên trái, Tiêu đề Danh sách rạp ở giữa */}
                <div className={cx('modal-header')}>
                    <button className={cx('close-icon-btn')} onClick={onClose} aria-label="Đóng">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <h3 className={cx('modal-title')}>Danh sách rạp</h3>
                    <div className={cx('header-spacer')}></div>
                </div>

                {/* Body modal: Gồm 2 component có sẵn */}
                <div className={cx('modal-body')}>
                    {/* 1. Component CinemaBrands: Chọn hãng rạp */}
                    {!hideBrandBar && (
                        <div className={cx('brands-section')}>
                            <CinemaBrands
                                brand_items={brand_items}
                                selectedBrandId={selectedBrandId}
                                onSelectBrand={onSelectBrand}
                            />
                        </div>
                    )}

                    {/* 2. Component CinemaList: Tìm kiếm & Danh sách cụm rạp */}
                    <div className={cx('cinemas-section')}>
                        <CinemaList
                            cinemas={cinemas}
                            brand_items_time={brand_items_time}
                            selectedBrandId={selectedBrandId}
                            selectedCity={selectedCity}
                            selectedCinemaId={selectedCinema?.id}
                            autoSelectOnBrandChange={false}
                            onCinemaClick={handleSelectCinemaAndClose}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CinemaModal;

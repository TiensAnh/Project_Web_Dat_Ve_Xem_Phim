import classNames from 'classnames/bind';
import { useRef, useState, useEffect } from 'react';
import style from './CinemaBrands.module.css';

const cx = classNames.bind(style);

function CinemaBrands({ brand_items, selectedBrandId = 'all', onSelectBrand, isDark = false }) {
    const listRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = () => {
        if (listRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = listRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth -1);
        }
    };

    useEffect(() => {
        checkScroll();
        const timer = setTimeout(checkScroll, 100);
        window.addEventListener('resize', checkScroll);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkScroll);
        };
    }, [brand_items]);

    const handleScroll = (direction) => {
        if (listRef.current) {
            const scrollAmount = 200;
            listRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const handleBrandClick = (brandId) => {
        if (onSelectBrand) {
            onSelectBrand(brandId);
        }
    };

    return (
        <div className={cx('cinemas-brands', { 'dark-theme': isDark })}>
            <div className={cx('brands-slider-container')}>
                {canScrollLeft && (
                    <div className={cx('wrapper-btn-left')}>
                        <button
                            className={cx('arrow-btn', 'left-arrow')}
                            onClick={() => handleScroll('left')}
                        >
                            <i className="fa-solid fa-angle-left"></i>
                        </button>
                    </div>
                )}
                <div
                    className={cx('list-brands')}
                    ref={listRef}
                    onScroll={checkScroll}
                >
                    {brand_items.map((item, index) => {
                        const isSelected = item.id === selectedBrandId;
                        return (
                            <div key={index} className={cx('wrapper-logo-brand-items')}>
                                <div className={cx('logo-brand-items')}>
                                    <div
                                        onClick={() => handleBrandClick(item.id)}
                                        style={{
                                            borderColor: isSelected ? '#2563EB' : (isDark ? 'rgba(255, 255, 255, 0.2)' : '#e4e4e4'),
                                            borderWidth: isSelected ? '2px' : '1px',
                                        }}
                                        className={cx('border-box-img', { 'selected-brand': isSelected })}
                                    >
                                        <div className={cx('wrapper-img')}>
                                            <img src={item.src} className={cx('brand-img')} alt={item.name} />
                                        </div>
                                    </div>
                                    <div className={cx('name-brands')}>
                                        <h5
                                            style={{
                                                color: isSelected ? (isDark ? '#60a5fa' : '#2563EB') : (isDark ? '#cbd5e1' : '#333'),
                                                fontWeight: isSelected ? '600' : '500',
                                            }}
                                        >
                                            {item.name}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {canScrollRight && (
                    <div className={cx('wrapper-btn-right')}>
                        <button
                            className={cx('arrow-btn', 'right-arrow')}
                            onClick={() => handleScroll('right')}
                        >
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CinemaBrands;
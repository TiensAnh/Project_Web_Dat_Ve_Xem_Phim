import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './MovieCast.module.css';

const cx = classNames.bind(style);

function MovieCast({ casts = [], director }) {
    const sliderRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Chuẩn hóa danh sách đạo diễn (hỗ trợ cả object lẫn mảng)
    const directorList = Array.isArray(director)
        ? director
        : director
            ? [director]
            : [];

    // Danh sách thành viên (diễn viên và đạo diễn) được hiển thị như nhau
    const members = [
        ...casts.map((c) => ({
            id: c.id,
            name: c.name,
            picture: c.picture,
            roleTitle: c.character || 'Diễn viên',
        })),
        ...directorList.map((d) => ({
            id: d.id || `dir_${d.name}`,
            name: d.name,
            picture: d.picture,
            roleTitle: d.role || 'Đạo diễn',
        })),
    ];

    const checkScroll = () => {
        if (sliderRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = sliderRef.current;
            setCanScrollLeft(scrollLeft > 5);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
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
    }, [members]);

    const handleScroll = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = 260;
            sliderRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    if (members.length === 0) return null;

    return (
        <section className={cx('cast-section')}>
            <h2 className={cx('section-title')}>Dàn diễn viên & Đạo diễn</h2>

            {/* Casts & Directors Slider */}
            <div className={cx('cast-slider-container')}>
                {canScrollLeft && (
                    <button
                        type="button"
                        className={cx('arrow-btn', 'left-arrow')}
                        onClick={() => handleScroll('left')}
                        aria-label="Previous"
                    >
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                )}

                <div
                    ref={sliderRef}
                    className={cx('cast-track')}
                    onScroll={checkScroll}
                >
                    {members.map((member) => (
                        <div key={member.id} className={cx('cast-card')}>
                            <div className={cx('avatar-wrapper')}>
                                <img src={member.picture} alt={member.name} loading="lazy" />
                            </div>
                            <div className={cx('cast-info')}>
                                <div className={cx('cast-name')} title={member.name}>
                                    {member.name}
                                </div>
                                <div className={cx('cast-char')} title={member.roleTitle}>
                                    {member.roleTitle}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {canScrollRight && (
                    <button
                        type="button"
                        className={cx('arrow-btn', 'right-arrow')}
                        onClick={() => handleScroll('right')}
                        aria-label="Next"
                    >
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                )}
            </div>
        </section>
    );
}

export default MovieCast;

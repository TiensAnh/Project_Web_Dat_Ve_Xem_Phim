import { useState, useRef, useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import style from './DatePicker.module.css';

const cx = classNames.bind(style);

// Hàm tạo danh sách ngày (tối đa numDays ngày tính từ hôm nay)
function generateDates(numDays = 14) {
    const daysOfWeek = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const result = [];
    const today = new Date();

    for (let i = 0; i < numDays; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);

        const dateNumber = d.getDate();
        const dayLabel = i === 0 ? 'Hôm nay' : daysOfWeek[d.getDay()];
        const fullDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

        result.push({
            id: fullDate,
            dateNumber,
            dayLabel,
            fullDate,
            isToday: i === 0,
        });
    }
    return result;
}

function DatePicker({ onSelectDate, selectedDate, isDark = false, numDays = 14, centerDates = false, alignRight = false }) {
    const dates = useMemo(() => generateDates(numDays), [numDays]);
    const listRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    
    // Lấy id ngày đang chọn (hỗ trợ cả dạng string hoặc object)
    const getSelectedId = (val) => {
        if (!val) return null;
        return typeof val === 'object' ? val.id : val;
    };

    const [activeDateId, setActiveDateId] = useState(() => getSelectedId(selectedDate) || dates[0]?.id);

    // Đồng bộ nếu activeDateId hiện tại không còn nằm trong danh sách dates mới
    useEffect(() => {
        if (dates.length > 0 && !dates.some((d) => d.id === activeDateId)) {
            setActiveDateId(dates[0].id);
        }
    }, [dates, activeDateId]);

    const currentSelectedId = getSelectedId(selectedDate) || activeDateId;

    const checkScroll = () => {
        if (listRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = listRef.current;
            setCanScrollLeft(scrollLeft > 4);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
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
    }, [dates]);

    const handleScroll = (direction) => {
        if (listRef.current) {
            const scrollAmount = 240;
            listRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const handleDateClick = (dateItem) => {
        setActiveDateId(dateItem.id);
        if (onSelectDate) {
            onSelectDate(dateItem);
        }
    };

    return (
        <div className={cx('date-picker-container', { 'dark-theme': isDark })}>
            {canScrollLeft && (
                <div className={cx('wrapper-btn-left')}>
                    <button
                        type="button"
                        className={cx('arrow-btn', 'left-arrow')}
                        onClick={() => handleScroll('left')}
                        aria-label="Cuộn sang trái"
                    >
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                </div>
            )}

            <div
                className={cx('date-list', { 'center-dates': centerDates, 'align-right': alignRight })}
                ref={listRef}
                onScroll={checkScroll}
            >
                {dates.map((item) => {
                    const isSelected = item.id === currentSelectedId;
                    return (
                        <div
                            key={item.id}
                            className={cx('date-item', { active: isSelected, 'item-dark': isDark })}
                            onClick={() => handleDateClick(item)}
                        >
                            <div className={cx('date-top')}>
                                <span className={cx('date-number')}>{item.dateNumber}</span>
                            </div>
                            <div className={cx('date-bottom')}>
                                <span className={cx('date-label')}>{item.dayLabel}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {canScrollRight && (
                <div className={cx('wrapper-btn-right')}>
                    <button
                        type="button"
                        className={cx('arrow-btn', 'right-arrow')}
                        onClick={() => handleScroll('right')}
                        aria-label="Cuộn sang phải"
                    >
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            )}
        </div>
    );
}

export default DatePicker;
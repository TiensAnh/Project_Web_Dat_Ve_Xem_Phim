// Hiển thị banner trang chủ và tự động chuyển slide.
import { useEffect, useState } from "react";
import style from './ImageSlider.module.css';
import classNames from 'classnames/bind';
import useSlider from "../../../hooks/useSlider.jsx";
const cx = classNames.bind(style);
const AUTO_PLAY_INTERVAL_MS = 3000;

// Điều khiển banner, cử chỉ và thời gian tự chuyển slide.
function ImageSlider({ slides, isMobile = false }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isTouching, setIsTouching] = useState(false);

    const {
        goToPrevious,
        goToNext,
        handleTransitionEnd,
        goToSlide,
        activeDot,
        currentIndex,
        isTransition,
        extendSlide,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        handleMouseDown,
        handleMouseUp,
        handleMouseLeave,
    } = useSlider(slides);

    // Tự chuyển banner và dọn bộ đếm khi trạng thái slider thay đổi.
    useEffect(function startAutoPlay() {
        const isAutoPlayPaused = isHovered || isFocused || isTouching;

        // Chờ người dùng thao tác xong hoặc có đủ slide mới tự chuyển.
        if (slides.length < 2 || isAutoPlayPaused) {
            return;
        }

        const mobileViewport = window.matchMedia('(max-width: 768px)');

        // Chỉ chuyển phiên bản đang hiển thị và khi tab đang mở.
        function advanceVisibleSlide() {
            const isVisibleSlider = mobileViewport.matches === isMobile;

            if (document.hidden || !isVisibleSlider) {
                return;
            }

            goToNext();
        }

        const autoPlayTimer = window.setInterval(advanceVisibleSlide, AUTO_PLAY_INTERVAL_MS);

        // Hủy bộ đếm cũ để không tạo nhiều lịch chuyển slide cùng lúc.
        return function stopAutoPlay() {
            window.clearInterval(autoPlayTimer);
        };
    }, [slides.length, isMobile, isHovered, isFocused, isTouching, goToNext]);

    // Tạm dừng tự chuyển khi người dùng rê chuột vào banner.
    function handleSliderMouseEnter() {
        setIsHovered(true);
    }

    // Tiếp tục tự chuyển và kết thúc kéo chuột khi rời banner.
    function handleSliderMouseLeave() {
        setIsHovered(false);
        handleMouseLeave();
    }

    // Tạm dừng tự chuyển trong lúc người dùng chạm hoặc vuốt banner.
    function handleSliderTouchStart(event) {
        setIsTouching(true);
        handleTouchStart(event);
    }

    // Xử lý vuốt xong rồi cho phép tự chuyển trở lại.
    function handleSliderTouchEnd() {
        handleTouchEnd();
        setIsTouching(false);
    }

    // Cho phép tự chuyển trở lại khi trình duyệt hủy cử chỉ chạm.
    function handleSliderTouchCancel() {
        setIsTouching(false);
    }

    // Tạm dừng tự chuyển khi người dùng đặt focus trong slider.
    function handleSliderFocus() {
        setIsFocused(true);
    }

    // Chỉ tiếp tục tự chuyển khi focus rời khỏi toàn bộ slider.
    function handleSliderBlur(event) {
        if (event.currentTarget.contains(event.relatedTarget)) {
            return;
        }

        setIsFocused(false);
    }

    const slideStyle = {
        transform: `translateX(-${100 * currentIndex}%)`,
        transition: isTransition ? 'all 0.3s ease-in-out' : 'none'
    };

    return (
        <div 
            className={cx('slider', { 'mobile-view': isMobile })}
            onTouchStart={handleSliderTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleSliderTouchEnd}
            onTouchCancel={handleSliderTouchCancel}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseEnter={handleSliderMouseEnter}
            onMouseLeave={handleSliderMouseLeave}
            onFocusCapture={handleSliderFocus}
            onBlurCapture={handleSliderBlur}
        >
            <div className={cx('arrow-overlay', 'left-overlay')} onClick={goToPrevious}>
                <div className={cx('arrow-btn')}>
                    <i className="fa-solid fa-angle-left"></i>
                </div>
            </div>
            <div className={cx('arrow-overlay', 'right-overlay')} onClick={goToNext}>
                <div className={cx('arrow-btn')}>
                    <i className="fa-solid fa-angle-right"></i>
                </div>
            </div>
            <div onTransitionEnd={handleTransitionEnd} style={slideStyle} className={cx('wrapperSlide')}>
                {extendSlide.map((slide, index) => (
                    <img 
                        key={index} 
                        src={slide.src} 
                        alt={`Banner quảng cáo ${index + 1}`}
                        className={cx('slide')}
                        draggable={false}
                    />
                ))}
            </div>
            <div className={cx('bottom-fade')}></div>
            <div className={cx('dots')}>
                {slides.map((_, index) => (
                    <button key={index} onClick={() => goToSlide(index)}>
                        {index === activeDot ? <i className="fa-regular fa-circle-dot"></i> : <i className="fa-regular fa-circle"></i>}
                    </button>
                ))}
            </div>
        </div>
    );  
}
 export default ImageSlider

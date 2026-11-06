import { useState } from "react";
import style from './ImageSlider.module.css';
import classNames from 'classnames/bind';
import useSlider from "../../../hooks/useSlider.jsx";
const cx = classNames.bind(style);
function ImageSlider({ slides, isMobile = false }) {
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

    const slideStyle = {
        transform: `translateX(-${100 * currentIndex}%)`,
        transition: isTransition ? 'all 0.3s ease-in-out' : 'none'
    };

    return (
        <div 
            className={cx('slider', { 'mobile-view': isMobile })}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
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
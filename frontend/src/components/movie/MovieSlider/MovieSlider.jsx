import { useRef } from 'react';
import classNames from 'classnames/bind';
import style from './MovieSlider.module.css';
import MovieCard  from '../MovieCard/MovieCard.jsx';
import useCardSlider from '../../../hooks/useCardSlider.jsx';
const cx = classNames.bind(style);
function MovieSlider ({movieSlides,color}){
    const {
        goToNextPage,
        currentPage,
        setCurrentPage,
        goToPreviousPage,
        isFirstPage,
        isLastPage
     } = useCardSlider(movieSlides,5)

    const trackRef = useRef(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const hasMoved = useRef(false);

    const handleMouseDown = (e) => {
        if (window.innerWidth > 768) return;
        isDown.current = true;
        hasMoved.current = false;
        startX.current = e.pageX - trackRef.current.offsetLeft;
        scrollLeft.current = trackRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown.current = false;
    };

    const handleMouseUp = () => {
        isDown.current = false;
    };

    const handleMouseMove = (e) => {
        if (!isDown.current) return;
        e.preventDefault();
        const x = e.pageX - trackRef.current.offsetLeft;
        const walk = x - startX.current;
        if (Math.abs(walk) > 5) {
            hasMoved.current = true;
        }
        trackRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleClickCapture = (e) => {
        if (hasMoved.current) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const leftArrowStyle = {
        display: isFirstPage ()? 'none' : 'flex'
    }
    const rightArrowStyle = {
        display: isLastPage ()? 'none' : 'flex'
    }
    const innerMovieTrackStyle ={
        transform:`translateX(calc(-${currentPage*100}% - ${24*currentPage}px))`,
        transition: 'transform 0.5s ease-in-out' 
    }
    return(
        <div className={cx('movieTrack')}>
            <div className={cx('items-movieTrack')}>
                <div style={color}>
                    <button style = {leftArrowStyle} onClick = {goToPreviousPage} className={cx('leftArrow')}>
                        <i style={color} className="fa-solid fa-angle-left"></i>
                    </button>
                </div>
                <div style={color}>
                    <button style={rightArrowStyle}onClick= {goToNextPage} className={cx('rightArrow')}>
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                </div>
                <div 
                    ref={trackRef}
                    className={cx('wrapper-movieTrack')}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onClickCapture={handleClickCapture}
                >
                    <div style = {innerMovieTrackStyle}className={cx('inner-movieTrack')}>   
                        {movieSlides.map((movie,index) => (
                            <MovieCard  key = {index} movie = {movie}/>
                        ))}
                    </div>
                </div> 
                
            </div>
        </div>
    )
}
export default MovieSlider
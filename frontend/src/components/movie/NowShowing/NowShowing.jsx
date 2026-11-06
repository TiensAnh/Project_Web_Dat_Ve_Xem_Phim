import classNames from 'classnames/bind';
import style from './NowShowing.module.css';
import MovieSlider from '../MovieSlider/MovieSlider';
import { getNowShowingMovies } from '../../../data/moviesData.js';

const cx = classNames.bind(style);
const movieSlides = getNowShowingMovies();

const color= {
    color:'black'
}
function NowShowing({ isDark = true, bgColor, textColor, titleColor }){
    const customStyle = {
        ...(bgColor ? { backgroundColor: bgColor } : {}),
        ...(textColor ? { '--nowshowing-text-color': textColor } : {}),
        ...(titleColor ? { '--nowshowing-title-color': titleColor } : {}),
    };

    return (
        <section className={cx('nowShowing', { 'light-theme': !isDark })} style={customStyle}>
            <div className={cx('nowShowing-container')}>
                <div className={cx('wrapper-title')}>
                    <h1 className={cx('title', { 'title-light': !isDark })}>Phim đang chiếu</h1>
                </div>
                
                <div className={cx('movieList')}>
                    <MovieSlider color = {color} movieSlides = {movieSlides}/>
                </div>
            </div>
            
            
        </section>

    )
}
export default NowShowing
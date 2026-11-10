import classNames from 'classnames/bind';
import style from './UpComingMovie.module.css';
import MovieSlider from '../MovieSlider/MovieSlider';
import { getUpcomingMovies } from '../../../data/moviesData.js';

const cx = classNames.bind(style);
const movieSlides = getUpcomingMovies();
const color= {
    color:'black'
}
// Hiển thị danh sách phim sắp chiếu.
function UpComingMovie({ isDark = true, bgColor, textColor, titleColor, showFindMoviesLink = true }){
    const customStyle = {
        ...(bgColor ? { backgroundColor: bgColor } : {}),
        ...(textColor ? { '--upcoming-text-color': textColor } : {}),
        ...(titleColor ? { '--upcoming-title-color': titleColor } : {}),
    };

    return (
        <section
            className={cx('upComingMovie', { 'light-theme': !isDark })}
            style={customStyle}
        >
            <div className={cx('upComingMovie-container')}>
                <div className={cx('upComingMovie-wrapper-title')}>
                    <h1 className={cx('upComingMovie-title', { 'title-light': !isDark })}>Phim sắp chiếu</h1>
                </div>
                
                <div className={cx('upComingMovie-movieList')}>
                    <MovieSlider color={color} movieSlides = {movieSlides}/>
                </div>
                {/* Chỉ hiện liên kết tìm phim khi trang cần dùng. */}
                {showFindMoviesLink && (
                    <div className={cx('upComingMovie-moreMovie')}>
                        <a href='/'>Tìm phim chiếu rạp</a>
                    </div>
                )}
            </div>
            
            
        </section>

    )
}
export default UpComingMovie
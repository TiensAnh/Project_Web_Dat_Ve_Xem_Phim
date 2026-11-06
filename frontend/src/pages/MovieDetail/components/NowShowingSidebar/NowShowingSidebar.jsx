import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './NowShowingSidebar.module.css';
import { ALL_MOVIES } from '../../../../data/moviesData.js';

const cx = classNames.bind(style);

function NowShowingSidebar({ currentMovieId }) {
    // Lọc ra 5 bộ phim đang chiếu (bỏ qua phim hiện tại đang xem)
    const nowShowingMovies = ALL_MOVIES.filter(
        (m) => String(m.id) !== String(currentMovieId)
    ).slice(0, 5);

    // Chuẩn hóa hiển thị nhãn độ tuổi
    const formatAgeRating = (rating) => {
        if (!rating) return 'P';
        if (rating === 'C13' || rating === '13+') return '13+';
        if (rating === 'C16' || rating === '16+') return '16+';
        if (rating === 'C18' || rating === '18+') return '18+';
        return rating;
    };

    const getAgeClass = (rating) => {
        const r = formatAgeRating(rating);
        if (r === '18+') return 'age-18';
        if (r === '16+') return 'age-16';
        if (r === '13+') return 'age-13';
        return 'age-p';
    };

    if (nowShowingMovies.length === 0) return null;

    return (
        <div className={cx('sidebar-container')}>
            <h2 className={cx('sidebar-title')}>Phim đang chiếu</h2>

            <div className={cx('movies-list')}>
                {nowShowingMovies.map((movie, index) => {
                    const formattedAge = formatAgeRating(movie.ageRating);
                    const ageClass = getAgeClass(movie.ageRating);
                    const genresText = Array.isArray(movie.genres)
                        ? movie.genres.join(', ')
                        : movie.genres || '';

                    // Kiểm tra badge đặc biệt như SNEAKSHOW hoặc ĐẶT TRƯỚC
                    const isSneakshow =
                        movie.badge &&
                        movie.badge.toLowerCase().includes('sneak');
                    const isPreorder =
                        movie.badge &&
                        movie.badge.toLowerCase().includes('đặt trước');

                    return (
                        <Link
                            key={movie.id}
                            to={`/phim/${movie.id}`}
                            className={cx('movie-item')}
                        >
                            {/* Cột trái: Poster kèm số thứ tự (Rank) */}
                            <div className={cx('poster-wrap')}>
                                <img
                                    src={movie.poster}
                                    alt={movie.title}
                                    loading="lazy"
                                />
                                <div className={cx('poster-overlay')}></div>
                                <span className={cx('rank-badge')}>
                                    {index + 1}
                                </span>
                            </div>

                            {/* Cột phải: Thông tin phim */}
                            <div className={cx('movie-info')}>
                                {/* Hàng nhãn: Độ tuổi & Badge phụ */}
                                <div className={cx('badges-row')}>
                                    <span className={cx('age-badge', ageClass)}>
                                        {formattedAge}
                                    </span>
                                    {isSneakshow && (
                                        <span className={cx('special-badge', 'badge-sneakshow')}>
                                            SNEAKSHOW
                                        </span>
                                    )}
                                    {isPreorder && (
                                        <span className={cx('special-badge', 'badge-preorder')}>
                                            ĐẶT TRƯỚC
                                        </span>
                                    )}
                                </div>

                                {/* Tên phim */}
                                <h3 className={cx('movie-title')} title={movie.title}>
                                    {movie.title}
                                </h3>

                                {/* Thể loại */}
                                {genresText && (
                                    <div className={cx('movie-genres')} title={genresText}>
                                        {genresText}
                                    </div>
                                )}

                                {/* Điểm đánh giá */}
                                <div className={cx('movie-rating')}>
                                    <i className="fa-solid fa-star"></i>
                                    <span>{movie.ratingPoint || 9.5}</span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default NowShowingSidebar;

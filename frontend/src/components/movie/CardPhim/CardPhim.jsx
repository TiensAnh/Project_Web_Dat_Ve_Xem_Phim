import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import style from './CardPhim.module.css';

const cx = classNames.bind(style);

function getAgeBadgeInfo(ageRating) {
    if (!ageRating) return null;
    const rating = String(ageRating).trim().toUpperCase();
    if (rating.includes('18')) return { text: '18+', colorClass: 'badge-18' };
    if (rating.includes('16')) return { text: '16+', colorClass: 'badge-16' };
    if (rating.includes('13')) return { text: '13+', colorClass: 'badge-13' };
    if (rating === 'P') return { text: 'P', colorClass: 'badge-p' };
    return { text: ageRating, colorClass: 'badge-default' };
}

function CardPhim({ movie }) {
    if (!movie) return null;

    const {
        id,
        title,
        name,
        poster,
        src,
        genres,
        genre,
        ratingPoint,
        rate,
        ageRating,
        trailerUrl,
        link,
    } = movie;

    const movieTitle = title || name || 'Chưa có tên';
    const moviePoster = poster || src || '';
    const movieLink = link || (id ? `/phim/${id}` : '#');
    const displayGenres = Array.isArray(genres) ? genres.join(', ') : (genre || '');
    const displayRating = ratingPoint ?? rate ?? null;
    const badgeInfo = getAgeBadgeInfo(ageRating);

    return (
        <div className={cx('card-phim-wrapper')}>
            {/* Vùng Poster */}
            <div className={cx('poster-box')}>
                <Link to={movieLink} className={cx('poster-link')} title={movieTitle}>
                    <img
                        src={moviePoster}
                        alt={movieTitle}
                        className={cx('poster-img')}
                        loading="lazy"
                    />
                </Link>

                {/* Huy hiệu độ tuổi (Góc trên bên trái) */}
                {badgeInfo && (
                    <span className={cx('age-badge', badgeInfo.colorClass)}>
                        {badgeInfo.text}
                    </span>
                )}

                {/* Nút Play tròn (Chính giữa poster) */}
                {trailerUrl ? (
                    <a
                        href={trailerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cx('play-btn')}
                        title={`Xem trailer ${movieTitle}`}
                        aria-label={`Xem trailer ${movieTitle}`}
                    >
                        <i className="fa-solid fa-play"></i>
                    </a>
                ) : (
                    <Link
                        to={movieLink}
                        className={cx('play-btn')}
                        title={`Xem chi tiết ${movieTitle}`}
                        aria-label={`Xem chi tiết ${movieTitle}`}
                    >
                        <i className="fa-solid fa-play"></i>
                    </Link>
                )}
            </div>

            {/* Vùng thông tin bên dưới */}
            <div className={cx('info-box')}>
                <Link to={movieLink} className={cx('title-link')} title={movieTitle}>
                    <h3 className={cx('title')}>{movieTitle}</h3>
                </Link>

                {displayGenres && (
                    <p className={cx('genre')} title={displayGenres}>
                        {displayGenres}
                    </p>
                )}

                {displayRating !== null && (
                    <div className={cx('rating')}>
                        <i className="fa-solid fa-star" style={{ color: '#FFC700' }}></i>
                        <span className={cx('rating-point')}>{displayRating}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CardPhim;

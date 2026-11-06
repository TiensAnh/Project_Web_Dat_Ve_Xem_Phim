import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import style from './MovieHero.module.css';

const cx = classNames.bind(style);

function MovieHero({ movie }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const textWrapRef = useRef(null);

    const handleToggleExpand = () => {
        if (isExpanded) {
            if (textWrapRef.current) {
                textWrapRef.current.scrollTop = 0;
            }
            setIsExpanded(false);
        } else {
            setIsExpanded(true);
        }
    };

    const formatAgeBadge = (rating) => {
        if (!rating) return '18+';
        if (rating === 'C18') return '18+';
        if (rating === 'C16') return '16+';
        if (rating === 'C13') return '13+';
        return rating;
    };

    return (
        <section className={cx('hero-section')}>
            {/* Backdrop with gradient overlays */}
            <div className={cx('backdrop-wrapper')}>
                <img src={movie.backdrop} alt={movie.title} className={cx('backdrop-img')} />
                <div className={cx('overlay-left')}></div>
                <div className={cx('overlay-bottom')}></div>

                {/* Play trailer button on backdrop */}
                {movie.trailerUrl && (
                    <a
                        href={movie.trailerUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={cx('play-trailer-btn')}
                        title="Xem Trailer"
                    >
                        <i className="fa-solid fa-play"></i>
                    </a>
                )}
            </div>

            <div className={cx('container')}>
                <div className={cx('content-grid')}>
                    {/* Left: Movie Info */}
                    <div className={cx('info-col')}>
                        {/* Badge */}
                        {movie.badge && (
                            <div className={cx('badge-wrap')}>
                                <span className={cx('badge')}>
                                    <i className="fa-solid fa-heart"></i> {movie.badge}
                                </span>
                            </div>
                        )}

                        <h1 className={cx('movie-title')}>{movie.title}</h1>

                        <div className={cx('meta-row')}>
                            {movie.originalTitle && <span>{movie.originalTitle}</span>}
                            <span>•</span>
                            <span>{movie.year}</span>
                            <span>•</span>
                            <span>{movie.duration} phút</span>
                        </div>

                        {/* Rating & Age */}
                        <div className={cx('rating-age-row')}>
                            <div className={cx('rating-box')}>
                                <div className={cx('rating-score')}>
                                    <i className="fa-solid fa-star"></i>
                                    <span>{movie.ratingPoint}</span>
                                </div>
                                <div className={cx('rating-sub')}>
                                    từ {movie.ratingCount?.toLocaleString()} đánh giá
                                </div>
                            </div>

                            <div className={cx('age-box')}>
                                <span className={cx('age-badge')}>{formatAgeBadge(movie.ageRating)}</span>
                                <span className={cx('age-desc')}>{movie.ageDescription}</span>
                            </div>
                        </div>

                        {/* Tagline */}
                        {movie.tagline && (
                            <p className={cx('tagline')}>"{movie.tagline}"</p>
                        )}

                        {/* Actions: Mua vé & Xem review */}
                        <div className={cx('actions-row')}>
                            <a href="#phimLichChieu" className={cx('btn-buy')}>
                                <i className="fa-solid fa-ticket"></i> Mua vé ngay
                            </a>
                            <a href="#reviewPhim" className={cx('btn-review')}>
                                <i className="fa-regular fa-star"></i> Xem review
                            </a>
                        </div>

                        {/* Synopsis & Quick metadata with Poster */}
                        <div className={cx('synopsis-meta-box')}>
                            <div className={cx('poster-thumbnail')}>
                                <img src={movie.poster} alt={movie.title} />
                            </div>

                            <div className={cx('synopsis-col')}>
                                <div className={cx('synopsis-header')}>
                                    <div className={cx('synopsis-title')}>NỘI DUNG</div>
                                    <button
                                        type="button"
                                        className={cx('toggle-read-btn', 'header-btn')}
                                        onClick={handleToggleExpand}
                                    >
                                        {isExpanded ? (
                                            <>
                                                Thu gọn <i className="fa-solid fa-chevron-up"></i>
                                            </>
                                        ) : (
                                            <>
                                                Xem thêm <i className="fa-solid fa-chevron-down"></i>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div
                                    ref={textWrapRef}
                                    className={cx('synopsis-text-wrap', { 'is-expanded': isExpanded })}
                                >
                                    <p className={cx('synopsis-text', { 'is-clamped': !isExpanded })}>
                                        {movie.synopsis}
                                        {isExpanded && (
                                            <button
                                                type="button"
                                                className={cx('toggle-read-btn')}
                                                onClick={handleToggleExpand}
                                            >
                                                {' '}(Thu gọn)
                                            </button>
                                        )}
                                    </p>
                                </div>

                                <div className={cx('specs-row')}>
                                    <div>
                                        <div className={cx('specs-label')}>NGÀY CHIẾU</div>
                                        <div className={cx('specs-val')}>{movie.releaseDate}</div>
                                    </div>
                                    <div>
                                        <div className={cx('specs-label')}>QUỐC GIA</div>
                                        <div className={cx('specs-val')}>{movie.country}</div>
                                    </div>
                                    <div>
                                        <div className={cx('specs-label')}>THỂ LOẠI</div>
                                        <div className={cx('specs-val')}>
                                            {movie.genres?.join(', ')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MovieHero;

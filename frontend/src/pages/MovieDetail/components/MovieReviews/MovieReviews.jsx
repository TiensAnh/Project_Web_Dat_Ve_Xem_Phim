import { useState } from 'react';
import classNames from 'classnames/bind';
import style from './MovieReviews.module.css';

const cx = classNames.bind(style);

const INITIAL_COUNT = 8;
const STEP_COUNT = 8;

function MovieReviews({ reviews = [], ratingPoint = 9.6, ratingCount = 7621 }) {
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    const visibleReviews = reviews.slice(0, visibleCount);
    const hasMore = reviews.length > visibleCount;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + STEP_COUNT);
    };

    return (
        <section className={cx('reviews-section')}>
            <h2 className={cx('section-title')}>Đánh giá từ người xem</h2>

            {/* Score header */}
            <div className={cx('score-banner')}>
                <div className={cx('score-main')}>
                    <i className="fa-solid fa-star"></i>
                    <span className={cx('point')}>{ratingPoint}</span>
                    <span className={cx('max-point')}>/10</span>
                </div>
                <div className={cx('score-count')}>
                    từ <strong>{ratingCount.toLocaleString()}</strong> đánh giá thực tế từ khán giả
                </div>
            </div>

            {/* Reviews list */}
            {visibleReviews.length > 0 && (
                <div className={cx('reviews-list')}>
                    {visibleReviews.map((rev) => (
                        <div key={rev.id} className={cx('review-card')}>
                            <div className={cx('author-header')}>
                                <div className={cx('author-avatar')}>
                                    <img src={rev.authorAvatar} alt={rev.authorName} />
                                </div>
                                <div className={cx('author-meta')}>
                                    <div className={cx('author-name')}>{rev.authorName}</div>
                                    <div className={cx('author-sub')}>
                                        <span>{rev.date}</span>
                                        <span>•</span>
                                        <span className={cx('rev-score')}>
                                            <i className="fa-solid fa-star"></i> {rev.rating}/10
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            {rev.tags && rev.tags.length > 0 && (
                                <div className={cx('tags-row')}>
                                    {rev.tags.map((tag, i) => (
                                        <span key={i} className={cx('tag')}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Content */}
                            <p className={cx('rev-content')}>{rev.content}</p>

                            {/* Review Images */}
                            {rev.images && rev.images.length > 0 && (
                                <div className={cx('img-gallery')}>
                                    {rev.images.map((imgUrl, idx) => (
                                        <div key={idx} className={cx('img-wrap')}>
                                            <img src={imgUrl} alt={`Review photo ${idx + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Nút Xem thêm */}
            {hasMore && (
                <div className={cx('action-more')}>
                    <button
                        type="button"
                        className={cx('btn-more')}
                        onClick={handleLoadMore}
                    >
                        <span>Xem thêm bình luận</span>
                        <i className="fa-solid fa-chevron-down"></i>
                    </button>
                </div>
            )}
        </section>
    );
}

export default MovieReviews;

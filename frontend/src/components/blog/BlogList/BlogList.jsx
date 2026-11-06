import classNames from 'classnames/bind';
import style from './BlogList.module.css';
import BlogCard from '../BlogCard/BlogCard.jsx';

const cx = classNames.bind(style);

function BlogList({
    posts = [],
    visibleCount = 6,
    onLoadMore,
    hasMore = false,
    onResetCategory,
}) {
    const displayedPosts = posts.slice(0, visibleCount);

    if (posts.length === 0) {
        return (
            <div className={cx('empty-container')}>
                <div className={cx('empty-icon')}>
                    <i className="fa-regular fa-newspaper"></i>
                </div>
                <h3 className={cx('empty-title')}>Chưa có bài viết trong chuyên mục này</h3>
                <p className={cx('empty-desc')}>
                    Vui lòng chọn chuyên mục khác hoặc quay lại chuyên mục "Mới nhất" để đón đọc các bài viết hấp dẫn.
                </p>
                {onResetCategory && (
                    <button
                        type="button"
                        className={cx('empty-btn')}
                        onClick={onResetCategory}
                    >
                        Về bài viết mới nhất
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className={cx('blog-list-wrapper')}>
            {/* Lưới bài viết 3 cột Desktop */}
            <div className={cx('blog-grid')}>
                {displayedPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>

            {/* Nút Xem thêm */}
            {hasMore && (
                <div className={cx('load-more-box')}>
                    <button
                        type="button"
                        className={cx('load-more-btn')}
                        onClick={onLoadMore}
                    >
                        Xem thêm
                    </button>
                </div>
            )}
        </div>
    );
}

export default BlogList;

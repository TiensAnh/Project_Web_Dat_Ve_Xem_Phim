import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import style from './BlogCard.module.css';

const cx = classNames.bind(style);

function BlogCard({ post }) {
    if (!post) return null;

    const {
        id,
        slug,
        title,
        excerpt,
        category,
        readTime,
        thumbnail,
        badge,
        link,
        views,
    } = post;

    const postLink = link || `/blog/${slug || id}`;
    const postMeta = readTime || views;

    return (
        <article className={cx('blog-card')}>
            {/* Vùng Thumbnail 16:9 */}
            <div className={cx('thumbnail-box')}>
                <Link to={postLink} className={cx('thumbnail-link')}>
                    <img
                        src={thumbnail}
                        alt={title}
                        className={cx('thumbnail-img')}
                        loading="lazy"
                    />
                </Link>

                {badge && <span className={cx('badge-overlay')}>{badge}</span>}
            </div>

            {/* Vùng thông tin bài viết */}
            <div className={cx('content-box')}>
                <div className={cx('meta-row')}>
                    {category && (
                        <span className={cx('category-tag')}>{category}</span>
                    )}
                    {postMeta && (
                        <span className={cx('read-time')}>{postMeta}</span>
                    )}
                </div>

                <h3 className={cx('title')}>
                    <Link to={postLink} className={cx('title-link')} title={title}>
                        {title}
                    </Link>
                </h3>

                {excerpt && (
                    <p className={cx('excerpt')} title={excerpt}>
                        {excerpt}
                    </p>
                )}
            </div>
        </article>
    );
}

export default BlogCard;

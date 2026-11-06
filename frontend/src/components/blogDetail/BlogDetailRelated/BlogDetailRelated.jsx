import classNames from 'classnames/bind';
import style from './BlogDetailRelated.module.css';
import BlogCard from '../../blog/BlogCard/BlogCard.jsx';

const cx = classNames.bind(style);

function BlogDetailRelated({ relatedPosts = [] }) {
    if (!relatedPosts || relatedPosts.length === 0) return null;

    return (
        <section className={cx('related-wrapper')}>
            <h3 className={cx('related-title')}>Bài viết liên quan</h3>
            <div className={cx('related-grid')}>
                {relatedPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
}

export default BlogDetailRelated;

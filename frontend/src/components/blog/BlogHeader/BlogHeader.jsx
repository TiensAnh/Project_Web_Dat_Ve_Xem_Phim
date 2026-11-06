import classNames from 'classnames/bind';
import style from './BlogHeader.module.css';

const cx = classNames.bind(style);

function BlogHeader({ title = 'Blog Phim Ảnh', description }) {
    return (
        <div className={cx('blog-header')}>
            <h1 className={cx('title')}>{title}</h1>
            {description && <p className={cx('description')}>{description}</p>}
        </div>
    );
}

export default BlogHeader;

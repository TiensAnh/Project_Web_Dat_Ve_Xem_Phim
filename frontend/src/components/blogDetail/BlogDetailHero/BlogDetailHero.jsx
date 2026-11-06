import classNames from 'classnames/bind';
import style from './BlogDetailHero.module.css';

const cx = classNames.bind(style);

function BlogDetailHero({ image, alt = 'Ảnh bìa bài viết', badge }) {
    if (!image) return null;

    return (
        <div className={cx('hero-wrapper')}>
            <div className={cx('hero-banner')}>
                <img
                    src={image}
                    alt={alt}
                    className={cx('hero-img')}
                    loading="eager"
                />

                {badge && (
                    <div className={cx('badge-overlay')}>
                        <span className={cx('badge-text')}>{badge}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BlogDetailHero;

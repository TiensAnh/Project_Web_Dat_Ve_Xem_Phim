import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './BlogDetailHeader.module.css';

const cx = classNames.bind(style);

function BlogDetailHeader({
    title,
    sapo,
    category,
    categorySlug,
    publishDate,
    readTime,
}) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2500);
            }
        } catch (err) {
            console.error('Không thể sao chép liên kết:', err);
        }
    };

    return (
        <header className={cx('header-wrapper')}>
            {/* Hàng meta: Chuyên mục, Ngày đăng, Thời gian đọc, Nút Chia sẻ */}
            <div className={cx('meta-bar')}>
                <div className={cx('left-meta')}>
                    {category && (
                        <Link to="/blog" className={cx('category-link')}>
                            {category}
                        </Link>
                    )}

                    {(publishDate || readTime) && (
                        <div className={cx('date-time-info')}>
                            {publishDate && <span>{publishDate}</span>}
                            {publishDate && readTime && <span className={cx('dot')}>·</span>}
                            {readTime && <span>{readTime}</span>}
                        </div>
                    )}
                </div>

                {/* Nút chia sẻ */}
                <div className={cx('share-box')}>
                    <button
                        type="button"
                        className={cx('share-btn', { copied })}
                        onClick={handleShare}
                        title="Chia sẻ bài viết"
                        aria-label="Chia sẻ bài viết"
                    >
                        <i className={cx('fa-solid', copied ? 'fa-check' : 'fa-share-nodes')}></i>
                        <span>{copied ? 'Đã sao chép link' : 'Chia sẻ'}</span>
                    </button>
                </div>
            </div>

            {/* Tiêu đề chính H1 của bài viết */}
            <h1 className={cx('article-title')}>{title}</h1>

            {/* Lời mở đầu Sapo */}
            {sapo && <p className={cx('article-sapo')}>{sapo}</p>}
        </header>
    );
}

export default BlogDetailHeader;

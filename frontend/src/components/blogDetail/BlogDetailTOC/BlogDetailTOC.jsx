import classNames from 'classnames/bind';
import style from './BlogDetailTOC.module.css';

const cx = classNames.bind(style);

function BlogDetailTOC({ toc = [] }) {
    if (!toc || toc.length === 0) return null;

    const handleAnchorClick = (e, id) => {
        e.preventDefault();
        const targetElement = document.getElementById(id);
        if (targetElement) {
            const headerOffset = 80; // Trừ hao chiều cao của fixed Header
            const elementPosition =
                targetElement.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - headerOffset,
                behavior: 'smooth',
            });
            window.history.pushState(null, '', `#${id}`);
        }
    };

    return (
        <nav aria-label="Mục lục bài viết" className={cx('toc-wrapper')}>
            <div className={cx('toc-title')}>MỤC LỤC</div>
            <ul className={cx('toc-list')}>
                {toc.map((item, index) => {
                    const isSubItem = item.level === 2;
                    return (
                        <li
                            key={item.id || index}
                            className={cx('toc-item', { 'sub-item': isSubItem })}
                        >
                            <a
                                href={`#${item.id}`}
                                className={cx('toc-link')}
                                onClick={(e) => handleAnchorClick(e, item.id)}
                            >
                                {item.title}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default BlogDetailTOC;

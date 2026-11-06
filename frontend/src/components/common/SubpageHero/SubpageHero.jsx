import classNames from 'classnames/bind';
import style from './SubpageHero.module.css';

const cx = classNames.bind(style);

function SubpageHero({
    title,
    description,
    features = [],
    image,
    themeBg = '#111827',
}) {
    return (
        <section
            className={cx('subpage-hero')}
            style={{ '--hero-theme-bg': themeBg }}
        >
            {/* Cột trái: Nội dung tiêu đề, mô tả và checklist tính năng */}
            <div className={cx('container')}>
                <div className={cx('content-col')}>
                    {/* Tiêu đề trang */}
                    <h1 className={cx('hero-title')}>{title}</h1>

                    {/* Đoạn văn mô tả */}
                    {description && (
                        <p className={cx('hero-desc')}>{description}</p>
                    )}

                    {/* Danh sách các câu cam kết / tiện ích nổi bật */}
                    {features && features.length > 0 && (
                        <ul className={cx('features-list')}>
                            {features.map((item, index) => (
                                <li key={index} className={cx('feature-item')}>
                                    <span className={cx('check-icon')}>
                                        <i className="fa-solid fa-circle-check"></i>
                                    </span>
                                    <span className={cx('feature-text')}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Khối hình ảnh: tràn viền bên phải ở desktop, tự động xuống dòng ở màn hình nhỏ */}
            {image && (
                <div className={cx('backdrop-wrapper')}>
                    <img
                        src={image}
                        alt={title}
                        className={cx('backdrop-img')}
                    />
                    <div className={cx('overlay-left')}></div>
                    <div className={cx('overlay-bottom')}></div>
                </div>
            )}
        </section>
    );
}

export default SubpageHero;

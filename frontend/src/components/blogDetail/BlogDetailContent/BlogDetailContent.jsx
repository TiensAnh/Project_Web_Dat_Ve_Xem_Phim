import classNames from 'classnames/bind';
import style from './BlogDetailContent.module.css';

const cx = classNames.bind(style);

function BlogDetailContent({ movies = [], faqs = [] }) {
    return (
        <div className={cx('content-wrapper')}>
            {/* Tiêu đề phần danh sách phim */}
            <h2 id="danh-sach-phim-tinh-cam" className={cx('section-heading')}>
                30 phim tình cảm xúc động đáng xem cho người trưởng thành
            </h2>

            {/* Danh sách từng phim chi tiết */}
            <div className={cx('movie-list')}>
                {movies.map((movie) => (
                    <section key={movie.id} id={movie.id} className={cx('movie-item')}>
                        <h3 className={cx('movie-title')}>{movie.title}</h3>

                        <ul className={cx('movie-bullets')}>
                            {movie.genre && (
                                <li>
                                    <strong>Thể loại:</strong> {movie.genre}
                                </li>
                            )}
                            {movie.country && (
                                <li>
                                    <strong>Quốc gia:</strong> {movie.country}
                                </li>
                            )}
                            {movie.ageRating && (
                                <li>
                                    <strong>Phân loại độ tuổi:</strong> {movie.ageRating}
                                </li>
                            )}
                            {movie.synopsis && (
                                <li>
                                    <strong>Tóm tắt nội dung:</strong> {movie.synopsis}
                                </li>
                            )}
                        </ul>

                        {/* Hình ảnh phim minh họa có chú thích */}
                        {movie.image && (
                            <figure className={cx('movie-figure')}>
                                <img
                                    src={movie.image}
                                    alt={movie.caption || movie.title}
                                    className={cx('movie-img')}
                                    loading="lazy"
                                />
                                {movie.caption && (
                                    <figcaption className={cx('movie-caption')}>
                                        {movie.caption}
                                    </figcaption>
                                )}
                            </figure>
                        )}
                    </section>
                ))}
            </div>

            {/* Phần câu hỏi thường gặp FAQ */}
            {faqs && faqs.length > 0 && (
                <section className={cx('faq-section')}>
                    <h2 id="cau-hoi-thuong-gap" className={cx('section-heading')}>
                        Câu hỏi thường gặp về phim tình cảm
                    </h2>

                    <div className={cx('faq-list')}>
                        {faqs.map((faq) => (
                            <div key={faq.id} id={faq.id} className={cx('faq-item')}>
                                <h3 className={cx('faq-question')}>{faq.question}</h3>

                                {faq.answer && <p className={cx('faq-answer')}>{faq.answer}</p>}

                                {faq.items && (
                                    <ul className={cx('faq-bullets')}>
                                        {faq.items.map((item, idx) => (
                                            <li key={idx}>
                                                <strong>{item.term}</strong> {item.desc}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default BlogDetailContent;

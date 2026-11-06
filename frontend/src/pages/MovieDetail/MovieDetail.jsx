import classNames from 'classnames/bind';
import style from './MovieDetail.module.css';
import Header from '../../components/layout/Header/Header.jsx';
import Footer from '../../components/layout/Footer/Footer.jsx';
import ShowTime from '../../components/movie/ShowTime/ShowTime.jsx';
import MovieHero from './components/MovieHero/MovieHero.jsx';
import MovieCast from './components/MovieCast/MovieCast.jsx';
import MovieInfo from './components/MovieInfo/MovieInfo.jsx';
import MovieReviews from './components/MovieReviews/MovieReviews.jsx';
import MovieFAQ from './components/MovieFAQ/MovieFAQ.jsx';
import NowShowingSidebar from './components/NowShowingSidebar/NowShowingSidebar.jsx';
import { MOCK_TRAI_BUON_NGUOI } from './mockMovieDetail.js';

const cx = classNames.bind(style);

function MovieDetail({ movieData }) {
    // Nếu có truyền prop movieData thì dùng, ngược lại dùng mock data mặc định
    const movie = movieData || MOCK_TRAI_BUON_NGUOI;
    const themeBg = movie.themeColor || '#111827';

    return (
        <div className={cx('movie-detail-page')} style={{ '--movie-theme-bg': themeBg }}>
            <Header isFixed={false} />

            {/* Khối Hero Banner, Poster, Trailer, Đánh giá, Nút mua vé */}
            <MovieHero movie={movie} />

            <main className={cx('main-content')}>
                {/* Khối Lịch chiếu & Đặt vé có sẵn */}
                <div id="phimLichChieu" className={cx('section-booking')}>
                    <ShowTime movie={movie} isDark={true} />
                </div>

                <div className={cx('container')}>
                    {/* Bố cục 2 cột: Cột trái (Bình luận & Diễn viên), Cột phải (Phim đang chiếu Sticky) */}
                    <div className={cx('content-grid')}>
                        <div className={cx('box-left')}>
                            {/* Đánh giá & Bình luận từ người xem */}
                            <div id="reviewPhim" className={cx('section-review')}>
                                <MovieReviews
                                    reviews={movie.reviews}
                                    ratingPoint={movie.ratingPoint}
                                    ratingCount={movie.ratingCount}
                                />
                            </div>

                            {/* Dàn diễn viên & Đạo diễn */}
                            <MovieCast casts={movie.casts} director={movie.director} />
                        </div>

                        {/* Cột phải: Phim đang chiếu (Sticky) */}
                        <aside className={cx('box-right')}>
                            <NowShowingSidebar currentMovieId={movie.id} />
                        </aside>
                    </div>

                    {/* Hỏi đáp thường gặp FAQ */}
                    <MovieFAQ faqs={movie.faqs} />

                    {/* Bảng thông số chi tiết & Cốt truyện */}
                    <MovieInfo info={movie.info} />
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default MovieDetail;

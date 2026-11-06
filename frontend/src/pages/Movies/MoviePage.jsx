import classNames from 'classnames/bind';
import style from './MoviePage.module.css';
import Header from '../../components/layout/Header/Header.jsx';
import Footer from '../../components/layout/Footer/Footer.jsx';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb.jsx';
import SubpageHero from '../../components/common/SubpageHero/SubpageHero.jsx';
import NowShowing from '../../components/movie/NowShowing/NowShowing.jsx';
import UpComingMovie from '../../components/movie/UpComingMovies/UpComingMovie.jsx';
import AllMovies from '../../components/movie/AllMovies/AllMovies.jsx';
import ScrollToTop from '../../components/common/ScrollToTop.jsx';
import { getMoviePageData } from '../../data/moviePageData.js';

const cx = classNames.bind(style);

function MoviePage() {
    // Lấy toàn bộ dữ liệu trang từ mockdata
    const pageData = getMoviePageData();
    const { breadcrumb, subHero } = pageData;

    return (
        <div className={cx('movie-page')}>
            <ScrollToTop />

            {/* Header cố định trên đầu trang */}
            <Header isFixed={true} />

            <main className={cx('main-container')}>
                {/* Thanh điều hướng phân cấp (Breadcrumb) */}
                <Breadcrumb items={breadcrumb} />

                {/* Khối SubHero giới thiệu phim rạp 2026 */}
                <SubpageHero
                    title={subHero.title}
                    description={subHero.description}
                    features={subHero.features}
                    image={subHero.image}
                    themeBg={subHero.themeBg}
                />

                {/* Khối Phim đang chiếu và Phim sắp chiếu mang nguyên từ Home page */}
                <div className={cx('movie-showcase')}>
                    <NowShowing />
                    <UpComingMovie />
                </div>

                {/* Khối tìm phim chiếu rạp và danh sách toàn bộ phim của dự án */}
                <AllMovies />
            </main>

            {/* Chân trang */}
            <Footer />
        </div>
    );
}

export default MoviePage;

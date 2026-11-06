import classNames from 'classnames/bind';
import style from './ShowtimesPage.module.css';
import Header from '../../components/layout/Header/Header.jsx';
import Footer from '../../components/layout/Footer/Footer.jsx';
import SubpageHero from '../../components/common/SubpageHero/SubpageHero.jsx';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb.jsx';
import ShowTime from '../../components/movie/ShowTime/ShowTime.jsx';
import UpComingMovie from '../../components/movie/UpComingMovies/UpComingMovie.jsx';
import BlogSection from '../../components/blog/BlogSection/BlogSection.jsx';
import ScrollToTop from '../../components/common/ScrollToTop.jsx';
import heroImage from '../../assets/images/subpage-hero-cinema.png';

const cx = classNames.bind(style);

function ShowtimesPage() {
    const breadcrumbItems = [
        { label: 'Trang chủ', path: '/', isHome: true },
        { label: 'Lịch chiếu', path: '/lich-chieu' },
    ];

    const heroFeatures = [
        'Rạp phim đầy đủ từ Bắc tới Nam',
        'Suất chiếu cập nhật liên tục từng phút',
        'Ưu đãi đặc biệt từng cụm rạp chiếu',
        'Chỉ cần một chạm là có ngay vé xem phim',
    ];

    return (
        <div className={cx('showtimes-page')}>
            <ScrollToTop />

            {/* Header luôn cố định (Fixed) trên đầu trang */}
            <Header isFixed={true} />

            <main className={cx('main-container')}>
                {/* Thanh điều hướng phân cấp (Breadcrumb) */}
                <Breadcrumb items={breadcrumbItems} />

                {/* 1. Khối Hero tĩnh với hiệu ứng dải màu gradient mờ phủ lên ảnh (giữ màu tối #111827) */}
                <SubpageHero
                    title="Lịch Chiếu Phim Rạp Mới Nhất"
                    description="Rạp chiếu phim không chỉ mang đến những bộ phim bom tấn mới nhất mà còn trang bị tiện nghi hiện đại, ghế ngồi êm ái cùng hệ thống âm thanh vòm sống động bậc nhất."
                    features={heroFeatures}
                    image={heroImage}
                    themeBg="#111827"
                />

                {/* 2. Khối Chọn rạp, Chọn ngày và Xem danh sách suất chiếu: Nền xanh nhạt êm dịu */}
                <ShowTime isDark={false} bgColor="rgba(70, 129, 255, 0.053)" showMore={false} />

                {/* 3. Khối Phim sắp chiếu: Tăng độ đậm màu xanh rõ nét hơn */}
                <UpComingMovie isDark={false} bgColor="rgba(70, 129, 255, 0.10)" />

                {/* 4. Khối Blog phim ảnh: Nhích đậm hơn một nấc để giữ nhịp điệu đậm dần */}
                <BlogSection isDark={false} bgColor="rgba(70, 129, 255, 0.18)" />
            </main>

            <Footer />
        </div>
    );
}

export default ShowtimesPage;

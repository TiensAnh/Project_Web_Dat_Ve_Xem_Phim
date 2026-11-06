import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './CinemaDetailPage.module.css';
import Header from '../../components/layout/Header/Header.jsx';
import Footer from '../../components/layout/Footer/Footer.jsx';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb.jsx';
import ScrollToTop from '../../components/common/ScrollToTop.jsx';
import CinemaHero from '../../components/cinema/CinemaHero/CinemaHero.jsx';
import CinemaShowtimes from '../../components/cinema/CinemaShowtimes/CinemaShowtimes.jsx';
import NowShowing from '../../components/movie/NowShowing/NowShowing.jsx';
import { getCinemaById, getBrandById } from '../../data/cinemasData.js';

const cx = classNames.bind(style);

function CinemaDetailPage() {
    const { brandId, cinemaId } = useParams();

    // Lấy thông tin cơ sở rạp cụ thể
    const cinema = useMemo(() => {
        return getCinemaById(cinemaId);
    }, [cinemaId]);

    // Lấy thông tin thương hiệu chủ quản của rạp
    const brand = useMemo(() => {
        return getBrandById(cinema?.brandId || brandId);
    }, [cinema?.brandId, brandId]);

    // Breadcrumb 4 cấp chuẩn SEO: Trang chủ -> Rạp chiếu -> Tên thương hiệu -> Tên rạp
    const breadcrumbItems = useMemo(() => {
        return [
            { label: 'Trang chủ', path: '/', isHome: true },
            { label: 'Rạp chiếu', path: '/rap-chieu' },
            { label: brand?.name || 'Thương hiệu', path: `/rap-chieu/${brand?.id}` },
            { label: cinema?.name || 'Rạp chiếu', path: `/rap/${cinema?.id}` },
        ];
    }, [brand, cinema]);

    return (
        <div className={cx('cinema-detail-page')}>
            <ScrollToTop />

            {/* Header cố định trên đầu */}
            <Header isFixed={true} />

            <main className={cx('main-container')}>
                {/* Breadcrumb phân cấp */}
                <Breadcrumb items={breadcrumbItems} />

                {/* Hero của cụm rạp cụ thể */}
                <CinemaHero
                    coverImage={brand?.coverImage}
                    logo={cinema?.logo || brand?.src}
                    cinemaName={cinema?.name}
                    brandName={brand?.name}
                    address={cinema?.address}
                    mapUrl={cinema?.mapUrl}
                />

                {/* Khối lịch chiếu phim tại cụm rạp */}
                <CinemaShowtimes cinema={cinema} isDark={false} />

                {/* Khối Phim đang chiếu với ảnh nền rạp chiếu phim */}
                <div className={cx('movie-showcase')}>
                    <NowShowing isDark={true} />
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default CinemaDetailPage;

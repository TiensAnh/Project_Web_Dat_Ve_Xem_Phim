import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './BrandPage.module.css';
import Header from '../../components/layout/Header/Header.jsx';
import Footer from '../../components/layout/Footer/Footer.jsx';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb.jsx';
import ScrollToTop from '../../components/common/ScrollToTop.jsx';
import BrandHero from '../../components/brand/BrandHero/BrandHero.jsx';
import ShowTime from '../../components/movie/ShowTime/ShowTime.jsx';
import NowShowing from '../../components/movie/NowShowing/NowShowing.jsx';
import BlogSection from '../../components/blog/BlogSection/BlogSection.jsx';
import { getBrandById } from '../../data/cinemasData.js';

const cx = classNames.bind(style);

function BrandPage() {
    const { brandId } = useParams();

    // Lấy thông tin thương hiệu theo brandId (hoặc mặc định CGV)
    const brand = useMemo(() => {
        return getBrandById(brandId || 'cgv');
    }, [brandId]);

    // Breadcrumb 3 cấp: Home -> Rạp chiếu -> Tên brand
    const breadcrumbItems = useMemo(() => {
        return [
            { label: 'Trang chủ', path: '/', isHome: true },
            { label: 'Rạp chiếu', path: '/rap-chieu' },
            { label: brand.name, path: `/rap-chieu/${brand.id}` },
        ];
    }, [brand]);

    return (
        <div className={cx('brand-page')}>
            <ScrollToTop />

            {/* Header cố định trên đầu trang */}
            <Header isFixed={true} />

            <main className={cx('main-container')}>
                {/* Breadcrumb phân cấp */}
                <Breadcrumb items={breadcrumbItems} />

                {/* Hero thương hiệu nhận toàn bộ ảnh nền, avatar, tên, mô tả, sao đánh giá qua props */}
                <BrandHero
                    coverImage={brand.coverImage}
                    logo={brand.src}
                    brandName={brand.name}
                    description={brand.description}
                    rating={brand.rating}
                    ratingCount={brand.ratingCount}
                    storeCount={brand.storeCount}
                />

                {/* Lịch chiếu phim của thương hiệu - Tái sử dụng component ShowTime */}
                <ShowTime 
                    brand={brand} 
                    showMore={false} 
                    numDays={7} 
                    bgColor="transparent" 
                />



                {/* Khối Phim đang chiếu với ảnh nền rạp chiếu phim y hệt trang tất cả rạp chiếu */}
                <div className={cx('movie-showcase')}>
                    <NowShowing isDark={true} />
                </div>

                {/* Khối Blog phim ảnh đồng bộ giao diện sáng và màu nền pastel giống trang tất cả rạp chiếu */}
                <BlogSection isDark={false} bgColor="rgba(70, 129, 255, 0.18)" initialRows={1} />
            </main>

            {/* Chân trang */}
            <Footer />
        </div>
    );
}

export default BrandPage;

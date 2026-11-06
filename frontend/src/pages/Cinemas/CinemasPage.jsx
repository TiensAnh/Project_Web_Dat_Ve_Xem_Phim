import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './CinemasPage.module.css';
import Header from '../../components/layout/Header/Header.jsx';
import Footer from '../../components/layout/Footer/Footer.jsx';
import SubpageHero from '../../components/common/SubpageHero/SubpageHero.jsx';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb.jsx';
import ScrollToTop from '../../components/common/ScrollToTop.jsx';
import CinemaBrands from '../../components/movie/ShowTime/component/CinemaBrands/CinemaBrands.jsx';
import CityModal from '../../components/movie/ShowTime/component/CityModal/CityModal.jsx';
import UpComingMovie from '../../components/movie/UpComingMovies/UpComingMovie.jsx';
import BlogSection from '../../components/blog/BlogSection/BlogSection.jsx';
import CinemaBrandGrid from '../../components/cinema/CinemaBrandGrid/CinemaBrandGrid.jsx';
import { BRAND_ITEMS, CINEMAS_DATA } from '../../data/cinemasData.js';
import heroImage from '../../assets/images/subpage-hero-cinema.png';

const cx = classNames.bind(style);

function removeVietnameseTones(str) {
    if (!str) return '';
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
}

function CinemasPage() {
    const breadcrumbItems = [
        { label: 'Trang chủ', path: '/', isHome: true },
        { label: 'Rạp chiếu', path: '/rap-chieu' },
    ];

    const heroFeatures = [
        'Hệ thống cụm rạp đối tác phong phú trải dài toàn quốc',
        'Trải nghiệm công nghệ chiếu IMAX, 3D, 4DX sống động',
        'Ghế ngồi êm ái, bắp nước đa dạng cùng dịch vụ chuẩn quốc tế',
        'Đặt vé nhanh chóng, nhận vé online không cần xếp hàng',
    ];

    // Ref quản lý vùng danh sách cuộn
    const listRef = useRef(null);

    // State quản lý bộ lọc
    const [selectedCity, setSelectedCity] = useState('Hà Nội');
    const [isCityModalOpen, setIsCityModalOpen] = useState(false);
    const [selectedBrandId, setSelectedBrandId] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isScrollEnabled, setIsScrollEnabled] = useState(false);
    const [containerHeight, setContainerHeight] = useState(null);

    // Lọc danh sách rạp theo City, Brand và Tên tìm kiếm
    const filteredCinemas = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        const rawQuery = removeVietnameseTones(query);

        return CINEMAS_DATA.filter((cinema) => {
            // Lọc theo tỉnh/thành phố
            const matchCity = !selectedCity || cinema.city.toLowerCase() === selectedCity.toLowerCase();

            // Lọc theo Brand rạp
            const matchBrand = selectedBrandId === 'all' || cinema.brandId === selectedBrandId;

            // Lọc theo tên rạp
            let matchSearch = true;
            if (query) {
                const lowerName = cinema.name.toLowerCase();
                const rawName = removeVietnameseTones(lowerName);
                matchSearch = lowerName.includes(query) || rawName.includes(rawQuery);
            }

            return matchCity && matchBrand && matchSearch;
        });
    }, [selectedCity, selectedBrandId, searchTerm]);

    // Danh sách rạp hiển thị: Mặc định 6 rạp, khi bật cuộn (Xem thêm) thì hiển thị toàn bộ để cuộn nội bộ
    const displayedCinemas = useMemo(() => {
        if (isScrollEnabled) return filteredCinemas;
        return filteredCinemas.slice(0, 6);
    }, [filteredCinemas, isScrollEnabled]);

    // Đổi brand -> reset cuộn về đầu và tắt scroll mode, giải phóng chiều cao
    const handleSelectBrand = (brandId) => {
        setSelectedBrandId(brandId);
        setIsScrollEnabled(false);
        setContainerHeight(null);
        if (listRef.current) {
            listRef.current.scrollTop = 0;
        }
    };

    // Đổi thành phố -> reset cuộn về đầu và tắt scroll mode, giải phóng chiều cao
    const handleSelectCity = (city) => {
        setSelectedCity(city);
        setIsScrollEnabled(false);
        setContainerHeight(null);
        if (listRef.current) {
            listRef.current.scrollTop = 0;
        }
    };

    // Đổi từ khóa tìm kiếm -> reset cuộn về đầu và tắt scroll mode, giải phóng chiều cao
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setIsScrollEnabled(false);
        setContainerHeight(null);
        if (listRef.current) {
            listRef.current.scrollTop = 0;
        }
    };

    // Bật thanh cuộn nội bộ (Enable Scroll) và khóa đúng chiều cao thực tế đang có để triệt tiêu hoàn toàn giật hình
    const handleLoadMore = () => {
        if (listRef.current) {
            setContainerHeight(listRef.current.offsetHeight);
        }
        setIsScrollEnabled(true);
    };

    return (
        <div className={cx('cinemas-page')}>
            <ScrollToTop />

            {/* Header luôn cố định (Fixed) trên đầu trang */}
            <Header isFixed={true} />

            <main className={cx('main-container')}>
                {/* Thanh điều hướng phân cấp (Breadcrumb) */}
                <Breadcrumb items={breadcrumbItems} />

                {/* Khối Hero tĩnh với ảnh nền cinema và nội dung giới thiệu */}
                <SubpageHero
                    title="Các rạp chiếu phim có trên TianMovie"
                    description="Rạp chiếu phim này không chỉ cung cấp các bộ phim mới phát hành mà còn có những tiện nghi hiện đại như ghế ngồi thoải mái và hệ thống âm thanh sống động."
                    features={heroFeatures}
                    image={heroImage}
                    themeBg="#111827"
                />

                {/* Khối Tìm rạp chiếu trên TianMovie */}
                <section className={cx('cinemas-search-section')}>
                    <div className={cx('container')}>
                        {/* Tiêu đề căn giữa phong cách ShowTime */}
                        <div className={cx('title-center')}>
                            <h1>Tìm rạp chiếu trên TianMovie</h1>
                        </div>

                        {/* Card bao bọc toàn bộ bộ lọc và kết quả rạp */}
                        <div className={cx('search-card-box')}>
                            {/* Hàng 1: Vị trí (Text Vị trí + Nút chọn Tỉnh thành + Nút Gần bạn) */}
                            <div className={cx('local')}>
                                <div className={cx('left')}>
                                    <h4>Vị trí</h4>
                                </div>
                                <div className={cx('right')}>
                                    <div
                                        className={cx('choose-city')}
                                        onClick={() => setIsCityModalOpen(true)}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <i className="fa-solid fa-location-dot"></i>
                                        <span>{selectedCity}</span>
                                        <i className="fa-solid fa-caret-down"></i>
                                    </div>
                                    <div className={cx('near')}>
                                        <i className="fa-solid fa-crosshairs"></i>
                                        <span>Gần bạn</span>
                                    </div>
                                </div>
                            </div>

                            {/* Hàng 2: Dải thương hiệu rạp (Tất cả + CGV, Lotte, Galaxy, Beta, BHD, Cinestar...) */}
                            <div className={cx('brand-list-wrap')}>
                                <CinemaBrands
                                    brand_items={BRAND_ITEMS}
                                    selectedBrandId={selectedBrandId}
                                    onSelectBrand={handleSelectBrand}
                                    isDark={false}
                                />
                            </div>

                            {/* Hàng 3: Ô tìm kiếm theo tên rạp */}
                            <div className={cx('search-bar-wrap')}>
                                <div className={cx('search-input-box')}>
                                    <i className={cx('search-icon', 'fa-solid', 'fa-magnifying-glass')}></i>
                                    <input
                                        type="text"
                                        placeholder="Tìm theo tên rạp..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className={cx('search-input')}
                                    />
                                    {searchTerm && (
                                        <button
                                            type="button"
                                            className={cx('clear-btn')}
                                            onClick={() => {
                                                setSearchTerm('');
                                                setIsScrollEnabled(false);
                                                setContainerHeight(null);
                                                if (listRef.current) {
                                                    listRef.current.scrollTop = 0;
                                                }
                                            }}
                                            aria-label="Xóa tìm kiếm"
                                        >
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Hàng 4: Danh sách các cụm rạp hàng dọc có thể cuộn */}
                            <div
                                ref={listRef}
                                className={cx('cinemas-content', { 'scroll-enabled': isScrollEnabled })}
                                style={containerHeight ? { height: `${containerHeight}px`, maxHeight: `${containerHeight}px` } : undefined}
                            >
                                {displayedCinemas.length > 0 ? (
                                    <div className={cx('cinemas-grid')}>
                                        {displayedCinemas.map((cinema) => (
                                            <Link
                                                to={`/rap/${cinema.id}`}
                                                key={cinema.id}
                                                className={cx('cinema-card')}
                                                title={`Xem chi tiết rạp ${cinema.name}`}
                                            >
                                                <div className={cx('cinema-logo-wrap')}>
                                                    <img
                                                        src={cinema.logo}
                                                        alt={cinema.name}
                                                        className={cx('cinema-logo')}
                                                    />
                                                </div>
                                                <div className={cx('cinema-info')}>
                                                    <h3 className={cx('cinema-name')}>{cinema.name}</h3>
                                                    <p className={cx('cinema-address')}>
                                                        <i className="fa-solid fa-location-dot"></i>
                                                        <span>{cinema.address}</span>
                                                    </p>
                                                </div>
                                                <div className={cx('cinema-arrow')}>
                                                    <i className="fa-solid fa-chevron-right"></i>
                                                </div>
                                            </Link>
                                        ))}

                                        {/* Thẻ bọc nút Xem thêm: chỉ hiển thị khi có trên 6 rạp và chưa bật cuộn */}
                                        {!isScrollEnabled && filteredCinemas.length > 6 && (
                                            <div className={cx('load-more-card')}>
                                                <button
                                                    type="button"
                                                    className={cx('load-more-btn')}
                                                    onClick={handleLoadMore}
                                                >
                                                    <span>Xem thêm</span>
                                                    <i className="fa-solid fa-chevron-down"></i>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className={cx('empty-cinemas')}>
                                        <i className="fa-solid fa-film"></i>
                                        <p>Không tìm thấy rạp chiếu nào phù hợp với bộ lọc hiện tại.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Khối Phim sắp chiếu với ảnh nền rạp chiếu phim */}
                <div className={cx('upcoming-showcase')}>
                    <UpComingMovie isDark={true} />
                </div>

                {/* Khối Hệ thống rạp chiếu phim (8 thương hiệu lớn nhất chia 2 cột) */}
                <CinemaBrandGrid bgColor="rgba(70, 129, 255, 0.053)" />

                {/* Khối Blog phim ảnh đồng bộ giao diện sáng và màu nền pastel giống trang Lịch chiếu / Trang chủ */}
                <BlogSection isDark={false} bgColor="rgba(70, 129, 255, 0.18)" initialRows={1} />

                {/* Popup chọn địa điểm (CityModal) */}
                <CityModal
                    isOpen={isCityModalOpen}
                    onClose={() => setIsCityModalOpen(false)}
                    selectedCity={selectedCity}
                    onSelectCity={handleSelectCity}
                    isDark={false}
                />
            </main>

            {/* Chân trang */}
            <Footer />
        </div>
    );
}

export default CinemasPage;

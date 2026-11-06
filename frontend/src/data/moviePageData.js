import heroBannerImage from '../assets/images/subpage-hero-cinema.png';

/**
 * Mock data cho trang MoviePage (Phim chiếu rạp)
 * Cấu trúc phân cấp chuẩn, sẵn sàng để sau này ánh xạ sang database schema hoặc CMS API.
 */
export const MOVIE_PAGE_DATA = {
    meta: {
        pageTitle: 'Phim chiếu rạp 2026 | TianMovie',
        slug: 'phim-chieu',
    },
    breadcrumb: [
        { label: 'Trang chủ', path: '/', isHome: true },
        { label: 'Phim chiếu rạp', path: '/phim-chieu' },
    ],
    subHero: {
        title: 'Phim chiếu rạp 2026 trên TianMovie',
        description: 'Danh sách Phim Chiếu Rạp 2026 đặc sắc và đáng mong đợi trên Tian Cinema',
        features: [
            'Đa dạng phim chiếu rạp 2026',
            'Lịch chiếu phim cập nhật đầy đủ nhất',
            'Đánh giá phim rạp chi tiết chân thật',
            'Đặt vé xem phim Online dễ dàng',
        ],
        image: heroBannerImage,
        themeBg: '#111827',
    },
};

/**
 * Lấy dữ liệu cho trang phim chiếu rạp
 * @returns {typeof MOVIE_PAGE_DATA}
 */
export const getMoviePageData = () => {
    return MOVIE_PAGE_DATA;
};

/**
 * Cấu hình tiêu đề, bộ lọc và tìm kiếm cho component AllMovies
 */
export const ALL_MOVIES_FILTER_CONFIG = {
    title: 'Tìm phim chiếu rạp trên TianMovie',
    genres: [
        { label: 'Tất cả thể loại', value: 'all' },
        { label: 'Hành Động', value: 'Hành Động' },
        { label: 'Hài Kịch', value: 'Hài Kịch' },
        { label: 'Kinh Dị', value: 'Kinh Dị' },
        { label: 'Tâm Lý - Xã Hội', value: 'Tâm Lý - Xã Hội' },
        { label: 'Khoa Học Viễn Tưởng', value: 'Khoa Học Viễn Tưởng' },
        { label: 'Phiêu Lưu', value: 'Phiêu Lưu' },
        { label: 'Hoạt Hình', value: 'Hoạt Hình' },
        { label: 'Gia Đình', value: 'Gia Đình' },
        { label: 'Huyền Sử', value: 'Huyền Sử' },
    ],
    countries: [
        { label: 'Tất cả quốc gia', value: 'all' },
        { label: 'Việt Nam', value: 'Việt Nam' },
        { label: 'Mỹ', value: 'Mỹ' },
        { label: 'Hàn Quốc', value: 'Hàn Quốc' },
        { label: 'Anh / Mỹ', value: 'Anh / Mỹ' },
        { label: 'Châu Á', value: 'Châu Á' },
    ],
    years: [
        { label: 'Tất cả năm', value: 'all' },
        { label: '2026', value: '2026' },
        { label: '2025', value: '2025' },
        { label: '2024', value: '2024' },
    ],
};


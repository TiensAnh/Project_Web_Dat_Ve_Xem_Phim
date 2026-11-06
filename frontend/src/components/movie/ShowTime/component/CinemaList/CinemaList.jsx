import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './CinemaList.module.css';

const cx = classNames.bind(style);

// Dữ liệu rạp mẫu mặc định kèm brandId tương ứng
const DEFAULT_MOCK_CINEMAS = [
    { id: 1, brandId: 'cgv', name: "CGV MM Supercenter Đà Nẵng", logo: "https://homepage.momocdn.net/cinema/momo-amazone-s3-api-240829164527-638605467276820522.png" },
    { id: 2, brandId: 'cgv', name: "CGV Vĩnh Trung Plaza", logo: "https://homepage.momocdn.net/cinema/momo-amazone-s3-api-240829164527-638605467276820522.png" },
    { id: 3, brandId: 'cgv', name: "CGV Vincom Đà Nẵng", logo: "https://homepage.momocdn.net/cinema/momo-amazone-s3-api-240829164527-638605467276820522.png" },
    { id: 4, brandId: 'lotte', name: "Lotte Đà Nẵng", logo: "https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170617-637584231772974269.png" },
    { id: 5, brandId: 'galaxy', name: "Galaxy CineX AEON Mall Thanh Khê", logo: "https://homepage.momocdn.net/cinema/momo-upload-api-211123095138-637732578984425272.png" },
    { id: 6, brandId: 'galaxy', name: "Galaxy Cinema Coop Đà Nẵng", logo: "https://homepage.momocdn.net/cinema/momo-upload-api-211123095138-637732578984425272.png" },
    { id: 7, brandId: 'starlight', name: "Starlight Đà Nẵng", logo: "https://cinema.momocdn.net/XS/starlight/image.png" },
    { id: 8, brandId: 'rio', name: "RIO Hoà Khánh - Đà Nẵng", logo: "https://homepage.momocdn.net/img/momo-amazone-s3-api-250505103419-638820380597920724.png" },
    { id: 9, brandId: 'beta', name: "Beta Cinemas Giải Phóng", logo: "https://homepage.momocdn.net/cinema/momo-upload-api-210813104719-637644484394328824.png" },
    { id: 10, brandId: 'cinestar', name: "Cinestar Quốc Thanh", logo: "https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170530-637584231309495829.png" },
    { id: 11, brandId: 'bhd', name: "BHD Star Bitexco", logo: "https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170453-637584230934981809.png" },
    { id: 12, brandId: 'megags', name: "Mega GS Cao Thắng", logo: "https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170511-637584231119272266.png" },
    { id: 13, brandId: 'dcine', name: "DCINE Bến Thành", logo: "https://img.mservice.io/momo_app_v2/new_version/img/THAO.MAI/DcineLogo.png" },
    { id: 14, brandId: 'ncc', name: "Trung Tâm Chiếu Phim Quốc Gia (NCC)", logo: "https://homepage.momocdn.net/cinema/ncclogo-260325100933.png" }
];

function CinemaList({
    cinemas,
    brand_items_time,
    selectedBrandId = 'all',
    selectedCinemaId,
    onSelectCinema,
    onCinemaClick,
    autoSelectOnBrandChange = true,
    isDark = false,
    selectedCity,
}) {
    const rawList = cinemas || (brand_items_time && brand_items_time[0]?.name ? brand_items_time : DEFAULT_MOCK_CINEMAS);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedId, setSelectedId] = useState(selectedCinemaId || rawList[0]?.id || 1);
    
    // Mặc định hiển thị tối đa 6 rạp ban đầu
    const [visibleCount, setVisibleCount] = useState(6);

    // Cập nhật selectedId nếu selectedCinemaId từ bên ngoài thay đổi
    useEffect(() => {
        if (selectedCinemaId) {
            setSelectedId(selectedCinemaId);
        }
    }, [selectedCinemaId]);

    // 1. Lọc theo Brand và Thành phố (nếu có)
    const brandFilteredCinemas = rawList.filter(cinema => {
        const matchBrand = selectedBrandId === 'all' || cinema.brandId === selectedBrandId;
        const matchCity = !selectedCity || !cinema.city || cinema.city.toLowerCase() === selectedCity.toLowerCase();
        return matchBrand && matchCity;
    });

    // 2. Lọc tiếp theo từ khóa tìm kiếm
    const filteredCinemas = brandFilteredCinemas.filter(cinema =>
        cinema.name?.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    // Reset lại số lượng hiển thị và chọn rạp đầu tiên khi đổi Brand hoặc Thành phố
    useEffect(() => {
        setVisibleCount(6);
        if (brandFilteredCinemas.length > 0) {
            if (autoSelectOnBrandChange) {
                setSelectedId(brandFilteredCinemas[0].id);
                if (onSelectCinema) {
                    onSelectCinema(brandFilteredCinemas[0]);
                }
            }
        }
    }, [selectedBrandId, selectedCity, autoSelectOnBrandChange]);

    // Cắt lấy 6 rạp đầu tiên (hoặc nhiều hơn khi ấn Xem thêm)
    const displayedCinemas = filteredCinemas.slice(0, visibleCount);

    const handleCinemaClick = (cinema) => {
        setSelectedId(cinema.id);
        if (onSelectCinema) {
            onSelectCinema(cinema);
        }
        if (onCinemaClick) {
            onCinemaClick(cinema);
        }
    };

    // Hàm tải thêm 6 rạp tiếp theo
    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 6);
    };

    return (
        <div className={cx('cinema-list-wrapper', { 'dark-theme': isDark })}>
            {/* 1. KHUNG TÌM KIẾM */}
            <div className={cx('search-box')}>
                <input
                    type="text"
                    className={cx('search-input')}
                    placeholder="Tìm theo tên rạp ..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setVisibleCount(6);
                    }}
                />
                <i className={cx('fa-solid fa-magnifying-glass', 'search-icon')}></i>
            </div>

            {/* 2. DANH SÁCH RẠP (VÙNG CÓ THỂ SCROLL) */}
            <div className={cx('cinema-list')}>
                {displayedCinemas.length > 0 ? (
                    <>
                        {displayedCinemas.map((cinema) => {
                            const isSelected = cinema.id === selectedId;
                            return (
                                <div
                                    key={cinema.id}
                                    className={cx('cinema-item', { active: isSelected })}
                                    onClick={() => handleCinemaClick(cinema)}
                                >
                                    <div className={cx('logo-container')}>
                                        <img 
                                            src={cinema.logo} 
                                            alt={cinema.name} 
                                            className={cx('logo-img')} 
                                        />
                                    </div>
                                    <span className={cx('cinema-name')}>{cinema.name}</span>
                                    <i className={cx('fa-solid fa-chevron-right', 'arrow-icon')}></i>
                                </div>
                            );
                        })}

                        {/* 3. NÚT XEM THÊM: Tự động ẩn nếu tổng số rạp <= 6 hoặc đã tải hết */}
                        {filteredCinemas.length > visibleCount && (
                            <div className={cx('more-btn-wrapper')}>
                                <button 
                                    className={cx('more-btn')}
                                    onClick={handleLoadMore}
                                >
                                    Xem thêm
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className={cx('empty-list')}>
                        Không tìm thấy rạp chiếu nào phù hợp
                    </div>
                )}
            </div>
        </div>
    );
}

export default CinemaList;
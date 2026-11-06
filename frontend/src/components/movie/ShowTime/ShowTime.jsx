import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './ShowTime.module.css';
import CinemaBrands from './component/CinemaBrands/CinemaBrands.jsx';
import CinemaList from './component/CinemaList/CinemaList.jsx'
import CinemInfo  from './component/CinemaInfo/CinemaInfo.jsx'
import DatePicker from './component/DataPicker/DatePicker.jsx';
import MovieShowTimeList from './component/MovieShowTimeList/MovieShowTimeList.jsx';
import CinemaSelector from './component/CinemaSelector/CinemaSelector.jsx';
import CinemaModal from './component/CinemaModal/CinemaModal.jsx';
import MovieCinemaAccordion from './component/MovieCinemaAccordion/MovieCinemaAccordion.jsx';
import CityModal from './component/CityModal/CityModal.jsx';
import { CINEMAS_DATA } from '../../../data/cinemasData.js';

const cx = classNames.bind(style);
const brand_items = [
  {
    id: 'all',
    name: 'Tất cả',
    src: 'https://homepage.momocdn.net/next-js/_next/static/public/cinema/dexuat-icon.svg',
    badge: null,
  },
  {
    id: 'cgv',
    name: 'CGV',
    src: 'https://homepage.momocdn.net/cinema/momo-amazone-s3-api-240829164527-638605467276820522.png',
    badge: null,
  },
  {
    id: 'lotte',
    name: 'Lotte Cinema',
    src: 'https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170617-637584231772974269.png',
    badge: 'https://cinema.momocdn.net/img/1771017505544178-Lotte89K.png',
  },
  {
    id: 'galaxy',
    name: 'Galaxy Cinema',
    src: 'https://homepage.momocdn.net/cinema/momo-upload-api-211123095138-637732578984425272.png',
    badge: null,
  },
  {
    id: 'bhd',
    name: 'BHD Star',
    src: 'https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170453-637584230934981809.png',
    badge: 'https://cinema.momocdn.net/img/9573824075907633-image (11).png',
  },
  {
    id: 'beta',
    name: 'Beta Cinemas',
    src: 'https://homepage.momocdn.net/cinema/momo-upload-api-210813104719-637644484394328824.png',
    badge: 'https://cinema.momocdn.net/img/4805942176586817-Beta 58K.png',
  },
  {
    id: 'cinestar',
    name: 'Cinestar',
    src: 'https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170530-637584231309495829.png',
    badge: null,
  },
  {
    id: 'megags',
    name: 'Mega GS',
    src: 'https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170511-637584231119272266.png',
    badge: null,
  },
  {
    id: 'dcine',
    name: 'DCINE',
    src: 'https://img.mservice.io/momo_app_v2/new_version/img/THAO.MAI/DcineLogo.png',
    badge: null,
  },
  {
    id: 'cinemax',
    name: 'Cinemax',
    src: 'https://homepage.momocdn.net/cinema/momo-upload-api-221108100132-638034984925107129.png',
    badge: null,
  },
  {
    id: 'starlight',
    name: 'Starlight',
    src: 'https://cinema.momocdn.net/XS/starlight/image.png',
    badge: null,
  },
  {
    id: 'rio',
    name: 'Rio',
    src: 'https://homepage.momocdn.net/img/momo-amazone-s3-api-250505103419-638820380597920724.png',
    badge: null,
  },
  {
    id: 'ncc',
    name: 'Trung Tâm Chiếu Phim Quốc Gia (NCC)',
    src: 'https://homepage.momocdn.net/cinema/ncclogo-260325100933.png',
    badge: null,
  },
  {
    id: 'aeonbeta',
    name: 'AEON BETA',
    src: 'https://homepage.momocdn.net/img/aeonbetalogo-zip-260706160816.jpg',
    badge: null,
  },
];
const brand_items_time = [
    {}
]
const movie_list_items =[
    {}
]
function ShowTime({ 
    movie, 
    movieTitle, 
    brand,
    title,
    hideBrandBar = false, 
    isDark = false, 
    bgColor, 
    textColor, 
    titleColor,
    showMore = true,
    moreLink = '/lich-chieu',
    numDays,
}) {
    // Tự động: MovieDetail = 14 ngày, các trang khác = 7 ngày (hoặc theo numDays truyền vào)
    const effectiveNumDays = numDays || (movie ? 14 : 7);

    const customStyle = {
        ...(bgColor ? { backgroundColor: bgColor } : {}),
        ...(textColor ? { '--showtime-text-color': textColor } : {}),
        ...(titleColor ? { '--showtime-title-color': titleColor } : {}),
    };

    // State lưu brand rạp đang được chọn (mặc định theo brand prop hoặc 'all' - Tất cả)
    const [selectedBrandId, setSelectedBrandId] = useState(brand?.id || 'all');
    // State lưu rạp chiếu đang được chọn trong CinemaList (khởi tạo từ mockdata)
    const [selectedCinema, setSelectedCinema] = useState(() => CINEMAS_DATA[0]);
    // State lưu ngày chiếu đang được chọn trong DatePicker
    const [selectedDate, setSelectedDate] = useState(null);
    // State quản lý đóng/mở popup chọn rạp trên mobile
    const [isCinemaModalOpen, setIsCinemaModalOpen] = useState(false);
    // State lưu thành phố đang chọn (mặc định 'Hà Nội')
    const [selectedCity, setSelectedCity] = useState('Hà Nội');
    // State quản lý đóng/mở popup chọn địa điểm
    const [isCityModalOpen, setIsCityModalOpen] = useState(false);

    // Đồng bộ selectedBrandId khi brand thay đổi
    useEffect(() => {
        if (brand?.id) {
            setSelectedBrandId(brand.id);
        }
    }, [brand?.id]);

    // Tự động chuyển thành phố nếu brand hiện tại không có rạp ở thành phố đang chọn
    useEffect(() => {
        if (brand?.id) {
            const brandCinemas = CINEMAS_DATA.filter((c) => c.brandId === brand.id);
            if (brandCinemas.length > 0) {
                const hasInCurrentCity = brandCinemas.some(
                    (c) => c.city.toLowerCase() === selectedCity.toLowerCase()
                );
                if (!hasInCurrentCity) {
                    setSelectedCity(brandCinemas[0].city);
                }
            }
        }
    }, [brand?.id]);

    // Chế độ dành cho trang chi tiết từng phim (MovieDetail)
    if (movie) {
        return (
            <div className={cx('ShowTime', 'ShowTime-detail-mode', { 'dark-theme': isDark })} style={customStyle}>
                <div className={cx('ShowTime-container', 'detail-container')}>
                    {/* Hàng 1: Tiêu đề bên trái, Địa điểm & Gần bạn bên phải */}
                    <div className={cx('detail-header-row')}>
                        <h2 className={cx('detail-title', { 'title-dark': isDark })}>
                            Lịch chiếu {movie.title}
                        </h2>
                        <div className={cx('detail-location-controls')}>
                            <div 
                                className={cx('detail-city-pill', { 'pill-dark': isDark })}
                                onClick={() => setIsCityModalOpen(true)}
                                role="button"
                                tabIndex={0}
                            >
                                <i className="fa-solid fa-location-dot"></i>
                                <span>{selectedCity}</span>
                                <i className="fa-solid fa-chevron-down"></i>
                            </div>
                            <button type="button" className={cx('detail-near-pill', { 'pill-dark': isDark })}>
                                <i className="fa-solid fa-crosshairs"></i>
                                <span>Gần bạn</span>
                            </button>
                        </div>
                    </div>

                    {/* Cụm dính (Sticky): Chọn ngày & Chọn brand rạp */}
                    <div className={cx('sticky-filter-bar', { 'sticky-filter-bar-dark': isDark })}>
                        <div className={cx('detail-datepicker-wrap')}>
                            <DatePicker 
                                selectedDate={selectedDate} 
                                onSelectDate={setSelectedDate} 
                                isDark={isDark} 
                                numDays={effectiveNumDays}
                            />
                        </div>

                        <div className={cx('detail-brands-wrap')}>
                            <CinemaBrands 
                                brand_items={brand_items} 
                                selectedBrandId={selectedBrandId} 
                                onSelectBrand={setSelectedBrandId} 
                                isDark={isDark} 
                            />
                        </div>
                    </div>

                    {/* Hàng 4: Danh sách rạp dạng Accordion cho bộ phim này */}
                    <div className={cx('detail-accordion-wrap')}>
                        <MovieCinemaAccordion 
                            selectedBrandId={selectedBrandId} 
                            selectedDate={selectedDate} 
                            movie={movie} 
                            isDark={isDark} 
                        />
                    </div>

                    {/* Popup chọn địa điểm */}
                    <CityModal
                        isOpen={isCityModalOpen}
                        onClose={() => setIsCityModalOpen(false)}
                        selectedCity={selectedCity}
                        onSelectCity={setSelectedCity}
                        isDark={isDark}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={cx('ShowTime', { 'dark-theme': isDark })} style={customStyle}>
            <div className={cx('ShowTime-container', { 'no-more': !showMore })}>
                <div className={cx('title-center', { 'title-dark': isDark })}>
                    <h1>
                        {title || (brand ? `Lịch chiếu phim ${brand.name}` : movieTitle ? `Lịch chiếu ${movieTitle}` : 'Lịch chiếu phim')}
                    </h1>
                </div>
                {/* start box lịch chiếu */}
                <div className={cx('box', { 'box-dark': isDark })}>
                    <div className={cx('cinemas-brands-container')}>
                        <div className={cx('local', { 'local-dark': isDark })}>
                            <div className={cx('left')}>
                                <h4>Vị trí</h4>
                            </div>
                            <div className={cx('right')}>
                                <div 
                                    className={cx('choose-city', { 'city-dark': isDark })}
                                    onClick={() => setIsCityModalOpen(true)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <i className="fa-solid fa-location-dot"></i>
                                    <span>{selectedCity}</span>
                                    <i className="fa-solid fa-caret-down"></i>
                                </div>
                                <div className={cx('near', { 'near-dark': isDark })}>
                                    <i className="fa-solid fa-crosshairs"></i>
                                    <span>Gần bạn</span>
                                </div>
                            </div>
                          </div>
                        {!brand && !hideBrandBar && (
                            <div className={cx('brand-list')}>
                                <CinemaBrands 
                                    brand_items={brand_items}
                                    selectedBrandId={selectedBrandId}
                                    onSelectBrand={setSelectedBrandId}
                                    isDark={isDark}
                                />
                            </div>
                        )}
                        
                        <div className={cx('main-cinemas-brand')}>
                            <div className={cx('main-cinemas-brand-left', { 'border-dark': isDark })}>
                                <CinemaList 
                                    cinemas={CINEMAS_DATA}
                                    brand_items_time={brand_items_time}
                                    selectedBrandId={selectedBrandId}
                                    selectedCity={selectedCity}
                                    onSelectCinema={setSelectedCinema}
                                    isDark={isDark}
                                />
                            </div>
                            <div className={cx('main-cinemas-brand-right')}>
                                <div className={cx('cinema-info-desktop')}>
                                    <CinemInfo cinema={selectedCinema} isDark={isDark} />
                                </div>
                                <div className={cx('cinema-selector-mobile')}>
                                    <CinemaSelector 
                                        cinema={selectedCinema} 
                                        onClick={() => setIsCinemaModalOpen(true)}
                                        isOpen={isCinemaModalOpen}
                                        isDark={isDark}
                                    />
                                </div>
                                <DatePicker 
                                    selectedDate={selectedDate}
                                    onSelectDate={setSelectedDate}
                                    isDark={isDark}
                                    numDays={effectiveNumDays}
                                />
                                <MovieShowTimeList 
                                    movie_list_items={movie_list_items}
                                    isDark={isDark}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* end box lịch chiếu */}

                {/* Popup chọn rạp cho Mobile */}
                <CinemaModal 
                    isOpen={isCinemaModalOpen}
                    onClose={() => setIsCinemaModalOpen(false)}
                    brand_items={brand_items}
                    selectedBrandId={selectedBrandId}
                    onSelectBrand={setSelectedBrandId}
                    brand_items_time={brand_items_time}
                    cinemas={CINEMAS_DATA}
                    selectedCity={selectedCity}
                    hideBrandBar={Boolean(brand || hideBrandBar)}
                    selectedCinema={selectedCinema}
                    onSelectCinema={(cinema) => {
                        setSelectedCinema(cinema);
                        setIsCinemaModalOpen(false);
                    }}
                />
                {/* Popup chọn địa điểm */}
                <CityModal 
                    isOpen={isCityModalOpen}
                    onClose={() => setIsCityModalOpen(false)}
                    selectedCity={selectedCity}
                    onSelectCity={setSelectedCity}
                    isDark={isDark}
                />
                {showMore && (
                    <div className={cx('more')}>
                        <div className={cx('wrapper-more', { 'wrapper-more-dark': isDark })}>
                            <Link to={moreLink}>
                                <h2>Xem tất cả</h2>
                            </Link> 
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default ShowTime;
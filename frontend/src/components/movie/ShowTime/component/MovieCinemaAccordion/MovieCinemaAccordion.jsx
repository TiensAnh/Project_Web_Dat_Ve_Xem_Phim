import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './MovieCinemaAccordion.module.css';
import SeatSelectionModal from '../../../SeatSelectionModal/SeatSelectionModal.jsx';

const cx = classNames.bind(style);

const DEFAULT_CINEMAS_DATA = [
    {
        id: 'beta_gp',
        brandId: 'beta',
        name: 'Beta Giải Phóng',
        logo: 'https://homepage.momocdn.net/cinema/momo-upload-api-210813104719-637644484394328824.png',
        address: 'Tầng 3, tòa IP2, Chung cư Imperial, số 360 Giải Phóng, Phương Liệt, Thanh Xuân, Hà Nội',
        mapUrl: 'https://maps.google.com',
        formats: [
            {
                formatName: '2D Phụ đề',
                showtimes: [
                    { start: '19:15', end: '21:15' },
                    { start: '20:30', end: '22:30' },
                    { start: '21:45', end: '23:45' },
                ],
            },
        ],
    },
    {
        id: 'beta_md',
        brandId: 'beta',
        name: 'Beta Mỹ Đình',
        logo: 'https://homepage.momocdn.net/cinema/momo-upload-api-210813104719-637644484394328824.png',
        address: 'Tầng hầm B1, tòa nhà Golden Palace, Đường Mễ Trì, Phường Mễ Trì, Quận Nam Từ Liêm, Hà Nội',
        mapUrl: 'https://maps.google.com',
        formats: [
            {
                formatName: '2D Phụ đề',
                showtimes: [
                    { start: '18:30', end: '20:30' },
                    { start: '20:00', end: '22:00' },
                    { start: '22:15', end: '00:15' },
                ],
            },
        ],
    },
    {
        id: 'cgv_td',
        brandId: 'cgv',
        name: 'CGV Trương Định Plaza',
        logo: 'https://homepage.momocdn.net/cinema/momo-amazone-s3-api-240829164527-638605467276820522.png',
        address: 'Tầng 5, 461 Trương Định, Hoàng Mai, Hà Nội',
        mapUrl: 'https://maps.google.com',
        formats: [
            {
                formatName: '2D Phụ đề',
                showtimes: [
                    { start: '17:45', end: '19:45' },
                    { start: '19:30', end: '21:30' },
                    { start: '21:15', end: '23:15' },
                ],
            },
            {
                formatName: '2D Lồng tiếng',
                showtimes: [
                    { start: '18:15', end: '20:15' },
                    { start: '20:45', end: '22:45' },
                ],
            },
        ],
    },
    {
        id: 'cgv_royal',
        brandId: 'cgv',
        name: 'CGV Vincom Royal City',
        logo: 'https://homepage.momocdn.net/cinema/momo-amazone-s3-api-240829164527-638605467276820522.png',
        address: 'Tầng B2 - Khu R4 | Vincom Mega Mall Royal City, số 72A đường Nguyễn Trãi, quận Thanh Xuân, thành phố Hà Nội',
        mapUrl: 'https://maps.google.com',
        formats: [
            {
                formatName: '2D Phụ đề',
                showtimes: [
                    { start: '18:00', end: '20:00' },
                    { start: '19:00', end: '21:00' },
                    { start: '20:15', end: '22:15' },
                    { start: '21:30', end: '23:30' },
                    { start: '22:45', end: '00:45' },
                ],
            },
            {
                formatName: 'IMAX 2D',
                showtimes: [
                    { start: '19:45', end: '22:00' },
                    { start: '22:30', end: '00:45' },
                ],
            },
        ],
    },
    {
        id: 'lotte_hd',
        brandId: 'lotte',
        name: 'Lotte Hà Đông',
        logo: 'https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170617-637584231772974269.png',
        address: 'Tầng 4, Mê Linh Plaza Hà Đông, Đường Tô Hiệu, P.Hà Cầu, Q.Hà Đông',
        mapUrl: 'https://maps.google.com',
        formats: [
            {
                formatName: '2D Phụ đề',
                showtimes: [
                    { start: '18:45', end: '20:45' },
                    { start: '20:15', end: '22:15' },
                    { start: '21:50', end: '23:50' },
                ],
            },
        ],
    },
    {
        id: 'lotte_westlake',
        brandId: 'lotte',
        name: 'Lotte West Lake',
        logo: 'https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170617-637584231772974269.png',
        address: 'Tầng 4 Lotte Mall West Lake Hanoi, 683 Lạc Long Quân, Tây Hồ, Hà Nội',
        mapUrl: 'https://maps.google.com',
        formats: [
            {
                formatName: '2D Phụ đề',
                showtimes: [
                    { start: '19:00', end: '21:00' },
                    { start: '20:30', end: '22:30' },
                    { start: '22:00', end: '00:00' },
                ],
            },
        ],
    },
    {
        id: 'ncc_lh',
        brandId: 'ncc',
        name: 'Trung tâm Chiếu phim Quốc gia (NCC)',
        logo: 'https://homepage.momocdn.net/cinema/ncclogo-260325100933.png',
        address: 'Số 87 Láng Hạ, Phường Thành Công, Quận Ba Đình, Hà Nội',
        mapUrl: 'https://maps.google.com',
        formats: [
            {
                formatName: '2D Phụ đề',
                showtimes: [
                    { start: '18:30', end: '20:30' },
                    { start: '19:40', end: '21:40' },
                    { start: '20:50', end: '22:50' },
                    { start: '21:30', end: '23:30' },
                ],
            },
        ],
    },
    {
        id: 'galaxy_ad',
        brandId: 'galaxy',
        name: 'Galaxy CineX AEON Mall Hà Đông',
        logo: 'https://homepage.momocdn.net/cinema/momo-upload-api-211123095138-637732578984425272.png',
        address: 'Tầng 3 TTTM AEON Mall Hà Đông, Phường Dương Nội, Quận Hà Đông, Hà Nội',
        mapUrl: 'https://maps.google.com',
        formats: [
            {
                formatName: '2D Phụ đề',
                showtimes: [
                    { start: '19:15', end: '21:15' },
                    { start: '21:00', end: '23:00' },
                ],
            },
        ],
    },
    {
        id: 'bhd_pnt',
        brandId: 'bhd',
        name: 'BHD Star Phạm Ngọc Thạch',
        logo: 'https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170453-637584230934981809.png',
        address: 'Tầng 8, Vincom Center, số 2 Phạm Ngọc Thạch, Đống Đa, Hà Nội',
        mapUrl: 'https://maps.google.com',
        formats: [
            {
                formatName: '2D Phụ đề',
                showtimes: [
                    { start: '19:30', end: '21:30' },
                    { start: '21:15', end: '23:15' },
                ],
            },
        ],
    },
];

function MovieCinemaAccordion({
    selectedBrandId = 'all',
    selectedDate,
    onSelectShowtime,
    isDark = true,
}) {
    // Mặc định đóng tất cả các rạp (chỉ mở khi người dùng chủ động chọn rạp)
    const [expandedIds, setExpandedIds] = useState([]);
    const [selectedSlotKey, setSelectedSlotKey] = useState(null);
    const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);

    // Tự động đóng rạp đang mở và reset suất chiếu khi thay đổi Brand hoặc Ngày
    useEffect(() => {
        setExpandedIds([]);
        setSelectedSlotKey(null);
    }, [selectedBrandId, selectedDate]);

    // Lọc theo Brand được chọn từ CinemaBrands
    const filteredCinemas = selectedBrandId === 'all'
        ? DEFAULT_CINEMAS_DATA
        : DEFAULT_CINEMAS_DATA.filter((cinema) => cinema.brandId === selectedBrandId);

    const toggleCinema = (cinemaId) => {
        setExpandedIds((prev) =>
            prev.includes(cinemaId) ? [] : [cinemaId]
        );
    };

    const handleSlotClick = (cinema, format, slot) => {
        const slotKey = `${cinema.id}-${format.formatName}-${slot.start}`;
        setSelectedSlotKey(slotKey);
        setIsSeatModalOpen(true);
        if (onSelectShowtime) {
            onSelectShowtime({ cinema, format, slot });
        }
    };
    const handleCloseSeatModal = () =>{
        setIsSeatModalOpen (false);
        setSelectedSlotKey(null);
    }
    return (
        <div className={cx('accordion-list', { 'dark-theme': isDark })}>
            <SeatSelectionModal isOpen={isSeatModalOpen} onClose={handleCloseSeatModal} />
            {filteredCinemas.length > 0 ? (
                filteredCinemas.map((cinema) => {
                    const isExpanded = expandedIds.includes(cinema.id);

                    return (
                        <div key={cinema.id} className={cx('cinema-item', { expanded: isExpanded })}>
                            {/* Hàng tiêu đề rạp (Click để mở/đóng) */}
                            <div className={cx('cinema-header')} onClick={() => toggleCinema(cinema.id)}>
                                <div className={cx('cinema-logo')}>
                                    <img src={cinema.logo} alt={cinema.name} />
                                </div>

                                <div className={cx('cinema-info')}>
                                    <div className={cx('cinema-name')}>{cinema.name}</div>
                                    <div className={cx('cinema-address-line')}>
                                        <span className={cx('cinema-address')} title={cinema.address}>
                                            {cinema.address}
                                        </span>
                                        <a
                                            href={cinema.mapUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={cx('map-link')}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            [ Bản đồ ]
                                        </a>
                                    </div>
                                </div>

                                <div className={cx('arrow-icon', { rotated: isExpanded })}>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </div>
                            </div>

                            {/* Khối suất chiếu mở rộng */}
                            {isExpanded && (
                                <div className={cx('cinema-body')}>
                                    {cinema.formats.map((format, fIdx) => (
                                        <div key={fIdx} className={cx('format-group')}>
                                            <div className={cx('format-title')}>{format.formatName}</div>
                                            <div className={cx('showtimes-grid')}>
                                                {format.showtimes.map((slot, sIdx) => {
                                                    const slotKey = `${cinema.id}-${format.formatName}-${slot.start}`;
                                                    const isActive = selectedSlotKey === slotKey;

                                                    return (
                                                        <button
                                                            key={sIdx}
                                                            type="button"
                                                            className={cx('showtime-btn', { active: isActive })}
                                                            onClick={() => handleSlotClick(cinema, format, slot)}
                                                        >
                                                            <span className={cx('time-start')}>{slot.start}</span>
                                                            <span className={cx('time-arrow')}>→</span>
                                                            <span className={cx('time-end')}>{slot.end}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })
            ) : (
                <div className={cx('empty-state')}>
                    Không có rạp nào thuộc thương hiệu này có suất chiếu trong ngày đã chọn.
                </div>
            )}
        </div>
    );
}

export default MovieCinemaAccordion;

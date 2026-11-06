import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './MovieShowTimeList.module.css';
import SeatSelectionModal from '../../../SeatSelectionModal/SeatSelectionModal.jsx';

const cx = classNames.bind(style);

// Dữ liệu mẫu chuẩn kèm poster thật từ hệ thống (khớp ID và slug với ALL_MOVIES)
const DEFAULT_MOVIE_SHOWTIMES = [
    {
        id: 3,
        slug: 'ho-linh-trang-si',
        title: "Hồ Linh Tráng Sĩ: Bí Ẩn Mộ Vua Đinh",
        ageLimit: "13+",
        genre: "Hài kịch, Hành động, Phiêu lưu",
        format: "2D Phụ đề",
        poster: "https://image-worker.momocdn.net/convert-webp/img/136510314202221683-hltsfn.jpg?size=SM&referer=cinema.momocdn.net",
        showtimes: [
            { start: "18:00", end: "20:30" },
            { start: "18:40", end: "21:10" },
            { start: "19:20", end: "21:50" },
            { start: "20:00", end: "22:30" },
            { start: "20:45", end: "23:15" },
            { start: "21:10", end: "23:40" },
            { start: "22:10", end: "00:40" },
            { start: "22:50", end: "01:20" },
            { start: "23:35", end: "02:05" }
        ]
    },
    {
        id: 2,
        slug: 'nguoi-nhen-khoi-dau-moi',
        title: "Người Nhện: Khởi Đầu Mới",
        ageLimit: "13+",
        genre: "Khoa Học Viễn Tưởng, Phiêu Lưu, Hành Động",
        format: "2D Phụ đề",
        poster: "https://image-fworker.momocdn.net/momo-external/80e991a3fd9003c6afc835f8775bd667a14ed0d7b604338b3b2c170d7c161ddc?size=M",
        showtimes: [
            { start: "10:00", end: "11:57" },
            { start: "12:15", end: "14:12" },
            { start: "14:25", end: "16:22" },
            { start: "16:45", end: "18:42" },
            { start: "21:30", end: "23:27" },
            { start: "23:40", end: "01:37" }
        ]
    },
    {
        id: 1,
        slug: 'nghi-he-so-nghi-huu',
        title: "Nghỉ Hè Sợ Nghỉ Hưu",
        ageLimit: "18+",
        genre: "Hài, Gia Đình, Tâm Linh",
        format: "2D Phụ đề",
        poster: "https://image-worker.momocdn.net/convert-webp/img/65754658919213731-posterNHSNH.png?size=SM&referer=cinema.momocdn.net",
        showtimes: [
            { start: "14:40", end: "17:40" },
            { start: "19:00", end: "22:00" },
            { start: "22:30", end: "01:30" }
        ]
    }
];

function getMovieLink(movie) {
    if (movie.link) return movie.link;
    if (movie.slug) return `/phim/${movie.slug}`;
    if (movie.id) return `/phim/${movie.id}`;
    return '#';
}

function MovieShowTimeList({ movie_list_items, onSelectShowtime, isDark = false }) {
    const movies = (movie_list_items && movie_list_items[0]?.title) 
        ? movie_list_items 
        : DEFAULT_MOVIE_SHOWTIMES;

    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);

    const handleShowtimeClick = (movieId, showtime) => {
        const slotKey = `${movieId}-${showtime.start}`;
        setSelectedSlot(slotKey);
        setIsSeatModalOpen(true);
        if (onSelectShowtime) {
            onSelectShowtime(movieId, showtime);
        }
    };
    const handleCloseSeatModal = ()=>{
        setIsSeatModalOpen(false);
        setSelectedSlot(null);
    }

    return (
        <div className={cx('movie-showtime-container', { 'dark-theme': isDark })}>
            <SeatSelectionModal isOpen={isSeatModalOpen} onClose={handleCloseSeatModal} />
            {movies.map((movie) => {
                const movieLink = getMovieLink(movie);

                return (
                    <div key={movie.id} className={cx('movie-item')}>
                        {/* 1. Cột trái: Poster phim (Click chuyển đến trang Movie Detail) */}
                        <div className={cx('poster-wrapper')}>
                            <Link 
                                to={movieLink} 
                                className={cx('poster-link')} 
                                title={`Xem chi tiết phim ${movie.title}`}
                            >
                                <div className={cx('poster-inner')}>
                                    <img 
                                        src={movie.poster} 
                                        alt={movie.title} 
                                        className={cx('poster-img')}
                                        draggable="false"
                                    />
                                </div>
                            </Link>
                        </div>

                        {/* 2. Cột phải: Thông tin phim & Suất chiếu */}
                        <div className={cx('movie-info')}>
                            {/* Nhãn độ tuổi (Badge) */}
                            {movie.ageLimit && (
                                <span className={cx('age-badge', {
                                    'badge-18': movie.ageLimit.includes('18'),
                                    'badge-13': movie.ageLimit.includes('13') || movie.ageLimit.includes('16'),
                                    'badge-p': movie.ageLimit.toLowerCase().includes('p'),
                                })}>
                                    {movie.ageLimit}
                                </span>
                            )}

                            {/* Tên phim (Click chuyển đến trang Movie Detail) */}
                            <Link 
                                to={movieLink} 
                                className={cx('title-link')} 
                                title={`Xem chi tiết phim ${movie.title}`}
                            >
                                <h3 className={cx('movie-title')}>{movie.title}</h3>
                            </Link>

                            {/* Thể loại */}
                            {movie.genre && (
                                <p className={cx('movie-genre')}>{movie.genre}</p>
                            )}

                            {/* Định dạng chiếu */}
                            <div className={cx('format-title')}>{movie.format}</div>

                            {/* Lưới danh sách suất chiếu */}
                            <div className={cx('showtimes-grid')}>
                                {movie.showtimes.map((st, idx) => {
                                    const slotKey = `${movie.id}-${st.start}`;
                                    const isSelected = selectedSlot === slotKey;
                                    return (
                                        <button
                                            key={idx}
                                            className={cx('showtime-btn', { active: isSelected })}
                                            onClick={() => handleShowtimeClick(movie.id, st)}
                                        >
                                            <span className={cx('start-time')}>{st.start}</span>
                                            <span className={cx('separator')}>~</span>
                                            <span className={cx('end-time')}>{st.end}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default MovieShowTimeList;

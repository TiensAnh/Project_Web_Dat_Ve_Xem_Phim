import { useState } from 'react';
import classNames from 'classnames/bind';
import style from './CinemaShowtimes.module.css';
import DatePicker from '../../movie/ShowTime/component/DataPicker/DatePicker.jsx';
import MovieShowTimeList from '../../movie/ShowTime/component/MovieShowTimeList/MovieShowTimeList.jsx';

const cx = classNames.bind(style);

function CinemaShowtimes({ cinema, isDark = true }) {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleSelectShowtime = (movieId, showtime) => {
        console.log('Đã chọn suất chiếu:', movieId, showtime);
    };

    const cinemaName = cinema?.name || 'rạp chiếu';

    return (
        <section className={cx('cinema-showtimes-section')}>
            <div className={cx('container')}>
                {/* Tiêu đề: Lịch chiếu phim ở + tên rạp */}
                <div className={cx('header-wrapper')}>
                    <h2 className={cx('title', { 'title-dark': isDark })}>
                        Lịch chiếu phim ở {cinemaName}
                    </h2>
                </div>

                {/* Khung Card chứa Bộ chọn ngày & Danh sách phim */}
                <div className={cx('showtimes-card', { 'card-dark': isDark })}>
                    {/* Thanh chọn ngày */}
                    <div className={cx('datepicker-wrap', { 'border-dark': isDark })}>
                        <DatePicker 
                            selectedDate={selectedDate} 
                            onSelectDate={setSelectedDate} 
                            isDark={isDark} 
                            numDays={7}
                        />
                    </div>

                    {/* Danh sách phim & chọn giờ chiếu */}
                    <div className={cx('movie-list-wrap')}>
                        <MovieShowTimeList 
                            onSelectShowtime={handleSelectShowtime}
                            isDark={isDark}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CinemaShowtimes;

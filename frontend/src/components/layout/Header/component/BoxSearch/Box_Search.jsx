import classNames from 'classnames/bind';
import style from './BoxSearch.module.css';
import MovieSearchCard from '../MovieSearchCard/MovieSearchCard.jsx';
import { useState } from 'react';
import { getSearchMovies } from '../../../../../data/moviesData.js';

const cx = classNames.bind(style);

function Box_Search({ onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const allMovies = getSearchMovies();

    const filterMovie = allMovies.filter((film) =>
        film.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

    const handleClear = () => {
        setSearchTerm('');
    };

    return (
        <div className={cx('modal-search-relative')}>
            <span className={cx('arrow-indicator')}></span>
            <div className={cx('search-box')}>
                <div className={cx('wrapper-search-text')}>
                    <div className={cx('search-text')}>
                        <span className={cx('icon-search')}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={cx('search-input-movie')}
                            placeholder="Nhập tên phim"
                            autoFocus
                        />
                        {searchTerm && (
                            <button
                                className={cx('clear-btn')}
                                onClick={handleClear}
                                type="button"
                                title="Xóa từ khóa"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        )}
                    </div>
                </div>

                <div className={cx('section-title')}>
                    {searchTerm.trim()
                        ? `KẾT QUẢ TÌM KIẾM (${filterMovie.length})`
                        : 'PHIM ĐANG CHIẾU'}
                </div>

                <div className={cx('list-movie')}>
                    {filterMovie.length > 0 ? (
                        filterMovie.map((movie) => (
                            <MovieSearchCard key={movie.id} data={movie} onClick={onClose} />
                        ))
                    ) : (
                        <div className={cx('empty-result')}>
                            <i className="fa-regular fa-face-frown"></i>
                            <p>Không tìm thấy phim phù hợp với từ khóa</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Box_Search;

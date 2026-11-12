import { useState,useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import style from './AllMovies.module.css';
import { ALL_MOVIES_FILTER_CONFIG } from '../../../data/moviePageData.js';
import { ALL_MOVIES } from '../../../data/moviesData.js';
import CardPhim from '../CardPhim/CardPhim.jsx';
import {getMovies,getGenres} from '../../../services/movieService.js'
import MovieInfo from '../../../pages/MovieDetail/components/MovieInfo/MovieInfo.jsx';

const cx = classNames.bind(style);
const ITEMS_PER_PAGE = 10;

// Tách năm từ ngày phát hành 
function getReleaseYear(releaseDateMovie){
    if(!releaseDateMovie){
        return null;
    }
    return releaseDateMovie.slice(0,4);
}

function AllMovies({ onFilterChange }) {
    // Hàm lấy dữ liệu movies từ api
    const [movies, setMovies] = useState([]);
    useEffect(function loadMovieOnMount(){
        async function loadMovies() {
            try{
                const moviesList = await getMovies();
                // chuẩn hoá lại conutry có thể sửa lại sau khi web đủ lớn 
                for(const movie of moviesList){
                    if(typeof movie.country !== 'string'){
                        movie.country = null;
                    }
                }
                setMovies(moviesList);
            }
            catch(err){
                console.error('Không tải được danh sách phim ', err);
            }
        }
        loadMovies();
    },[])

    // function lấy danh sách genres từ api
    const [genres,setGenres] = useState([]);
    useEffect (function loadGenresOnMount(){
            async function loadGenres() {
                try{
                const genresList = await getGenres();
                setGenres(genresList)
                }
                catch(err){
                console.error("Không thể lấy danh sách genres từ API ",err)
            }
        }
        loadGenres();
    },[])
    // logic lấy data country từ movies và gom thành 1 list
    const uniqueCountries = new Set;
    const uniqueYear = new Set;
    for (const movie of movies ){
        if(movie.country)
            uniqueCountries.add(movie.country)
        if(movie.releaseDateMovie){
            uniqueYear.add(getReleaseYear(movie.releaseDateMovie))
        }
    }
    const countries = Array.from(uniqueCountries); 
    const releaseYear = Array.from(uniqueYear); 

    // lấy data từ genres
    const genreData = genres;

    // State lưu giá trị 3 bộ lọc
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [selectedCountry, setSelectedCountry] = useState('all');
    const [selectedYear, setSelectedYear] = useState('all');

    // State lưu giá trị ô tìm kiếm
    const [inputValue, setInputValue] = useState('');
    const [activeSearch, setActiveSearch] = useState('');

    // State phân trang
    const [currentPage, setCurrentPage] = useState(1);

    // Lọc danh sách phim từ ALL_MOVIES có sẵn
    const filteredMovies = useMemo(() => {
        return movies.filter((movie) => {
            // 1. Thể loại
            if (selectedGenre !== 'all') {
                const target = selectedGenre.toLowerCase();
                const movieGenres = Array.isArray(movie.genres)
                    ? movie.genres
                    : (movie.genre ? movie.genre.split(',').map((g) => g.trim()) : []);

                const isGenreMatched = movieGenres.some((g) => {
                    const lowerG = g.toLowerCase();
                    return lowerG.includes(target) || target.includes(lowerG);
                }) || (movie.badge && movie.badge.toLowerCase().includes(target));

                if (!isGenreMatched) return false;
            }

            // 2. Quốc gia 
            if (selectedCountry !== 'all') {
                const targetCountry = selectedCountry.toLowerCase();
                const movieCountry = (movie.country || '').toLowerCase();
                if (targetCountry !== movieCountry ) {
                    return false;
                }
            }

            // 3. Năm phát hành
            if (selectedYear !== 'all') {
                if (String(getReleaseYear(movie.releaseDateMovie)) !== String(selectedYear)) {
                    return false;
                }
            }

            // 4. Từ khóa tìm kiếm (chỉ lọc khi kích hoạt Enter hoặc bấm kính lúp)
            if (activeSearch.trim()) {
                const q = activeSearch.trim().toLowerCase();
                const titleMatch = movie.title && movie.title.toLowerCase().includes(q);
                const originalTitleMatch = movie.originalTitle && movie.originalTitle.toLowerCase().includes(q);
                if (!titleMatch && !originalTitleMatch) return false;
            }

            return true;
        });
    }, [movies,selectedGenre, selectedCountry, selectedYear, activeSearch]);

    // Tính toán phân trang
    const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE) || 1;
    const currentMovies = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredMovies, currentPage]);

    // Hàm kích hoạt tìm kiếm
    const handleTriggerSearch = () => {
        const query = inputValue.trim();
        setActiveSearch(query);
        setCurrentPage(1);
        if (onFilterChange) {
            onFilterChange({
                genre: selectedGenre,
                country: selectedCountry,
                year: selectedYear,
                search: query,
            });
        }
    };

    // Bắt sự kiện phím Enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleTriggerSearch();
        }
    };

    // Khi thay đổi dropdown bộ lọc
    const handleGenreChange = (e) => {
        const val = e.target.value;
        setSelectedGenre(val);
        setCurrentPage(1);
        if (onFilterChange) {
            onFilterChange({
                genre: val,
                country: selectedCountry,
                year: selectedYear,
                search: activeSearch,
            });
        }
    };

    const handleCountryChange = (e) => {
        const val = e.target.value;
        setSelectedCountry(val);
        setCurrentPage(1);
        if (onFilterChange) {
            onFilterChange({
                genre: selectedGenre,
                country: val,
                year: selectedYear,
                search: activeSearch,
            });
        }
    };

    const handleYearChange = (e) => {
        const val = e.target.value;
        setSelectedYear(val);
        setCurrentPage(1);
        if (onFilterChange) {
            onFilterChange({
                genre: selectedGenre,
                country: selectedCountry,
                year: val,
                search: activeSearch,
            });
        }
    };

    // Đổi trang
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
        setCurrentPage(newPage);
        const contentElem = document.getElementById('all-movies-content');
        if (contentElem) {
            contentElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Kiểm tra có bộ lọc hoặc từ khóa đang áp dụng.
    const hasActiveFilters =
        selectedGenre !== 'all' ||
        selectedCountry !== 'all' ||
        selectedYear !== 'all' ||
        activeSearch !== '';

    // Đặt lại toàn bộ bộ lọc
    const handleResetFilters = () => {
        setSelectedGenre('all');
        setSelectedCountry('all');
        setSelectedYear('all');
        setInputValue('');
        setActiveSearch('');
        setCurrentPage(1);
        if (onFilterChange) {
            onFilterChange({
                genre: 'all',
                country: 'all',
                year: 'all',
                search: '',
            });
        }
    };

    return (
        <section className={cx('all-movies-section')} id="all-movies-content">
            <div className={cx('container')}>
                {/* Khối Header điều khiển & bộ lọc */}
                <div className={cx('header-bar')}>
                    {/* Tiêu đề căn lề sang bên trái */}
                    <div className={cx('title-wrapper')}>
                        <h2 className={cx('title')}>Tất cả phim</h2>
                    </div>

                    {/* Cụm bộ lọc 3 tiêu chí và thanh tìm kiếm bên phải */}
                    <div className={cx('controls-wrapper')}>
                        {/* 1. Bộ lọc Thể loại */}
                        <div className={cx('select-box')}>
                            <select
                                value={selectedGenre}
                                onChange={handleGenreChange}
                                className={cx('filter-select')}
                                aria-label="Lọc theo thể loại"
                            >
                                <option value = 'all'>Chọn thể loại</option>
                                {genreData.map((g) => (
                                    <option key={g.id} value={g.name}>
                                        {g.name}
                                    </option>
                                ))}
                            </select>
                            <i className={cx('fa-solid fa-chevron-down', 'select-arrow')}></i>
                        </div>

                        {/* 2. Bộ lọc Quốc gia */}
                        <div className={cx('select-box')}>  
                            <select
                                value={selectedCountry}
                                onChange={handleCountryChange}
                                className={cx('filter-select')}
                                aria-label="Lọc theo quốc gia"
                            >
                                <option value={'all'}>Chọn quốc gia</option>
                                {countries.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                            <i className={cx('fa-solid fa-chevron-down', 'select-arrow')}></i>
                        </div>

                        {/* 3. Bộ lọc Năm */}
                        <div className={cx('select-box')}>
                            <select
                                value={selectedYear}
                                onChange={handleYearChange}
                                className={cx('filter-select')}
                                aria-label="Lọc theo năm phát hành"
                            >
                                <option value={'all'}>Chọn năm phát hành</option>
                                {releaseYear.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                            <i className={cx('fa-solid fa-chevron-down', 'select-arrow')}></i>
                        </div>

                        {/* 4. Thanh tìm kiếm */}
                        <div className={cx('search-wrap')}>
                            <input
                                type="text"
                                className={cx('search-input')}
                                placeholder="Nhập tên phim..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                aria-label="Tìm kiếm phim"
                            />
                            <button
                                type="button"
                                className={cx('search-btn')}
                                onClick={handleTriggerSearch}
                                title="Tìm kiếm"
                                aria-label="Nút tìm kiếm"
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Vùng hiển thị số lượng kết quả (nếu đang lọc hoặc tìm kiếm) */}
                {(selectedGenre !== 'all' || selectedCountry !== 'all' || selectedYear !== 'all' || activeSearch) && (
                    <div className={cx('filter-feedback')}>
                        <span className={cx('feedback-text')}>
                            Tìm thấy <strong>{filteredMovies.length}</strong> bộ phim phù hợp
                        </span>
                        <button
                            type="button"
                            className={cx('reset-btn-inline')}
                            onClick={handleResetFilters}
                        >
                            <i className="fa-solid fa-rotate-left"></i> Xóa bộ lọc
                        </button>
                    </div>
                )}

                {/* Vùng Lưới phim (Movie Grid) hoặc Empty State */}
                {filteredMovies.length > 0 ? (
                    <>
                        <div className={cx('movies-grid')}>
                            {currentMovies.map((movie) => (
                                <CardPhim key={movie.id} movie={movie} />
                            ))}
                        </div>

                        {/* Thanh phân trang Pagination nếu có nhiều hơn 1 trang */}
                        {totalPages > 1 && (
                            <div className={cx('pagination')}>
                                <button
                                    type="button"
                                    className={cx('page-arrow', { disabled: currentPage === 1 })}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    aria-label="Trang trước"
                                >
                                    <i className="fa-solid fa-chevron-left"></i>
                                </button>

                                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                                    <button
                                        key={pageNum}
                                        type="button"
                                        className={cx('page-num', { active: pageNum === currentPage })}
                                        onClick={() => handlePageChange(pageNum)}
                                    >
                                        {pageNum}
                                    </button>
                                ))}

                                <button
                                    type="button"
                                    className={cx('page-arrow', { disabled: currentPage === totalPages })}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    aria-label="Trang tiếp"
                                >
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    /* Trạng thái Empty State khi không tìm thấy kết quả */
                    <div className={cx('empty-state')}>
                        <div className={cx('empty-icon-wrap')}>
                            <i className="fa-solid fa-film"></i>
                        </div>
                        <h3 className={cx('empty-title')}>Không tìm thấy bộ phim phù hợp</h3>
                        <p className={cx('empty-desc')}>
                            Vui lòng thử lại với từ khóa khác hoặc xóa bớt tiêu chí lọc thể loại, quốc gia, năm.
                        </p>
                        {hasActiveFilters &&(
                            <button
                            type="button"
                            className={cx(`empty-reset-btn`)}
                            onClick={handleResetFilters}
                            >
                            Đặt lại bộ lọc
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

export default AllMovies;

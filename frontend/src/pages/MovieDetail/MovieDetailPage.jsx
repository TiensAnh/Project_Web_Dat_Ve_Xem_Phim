// Tải phim theo ID trên URL.
import { useParams } from 'react-router-dom';
import MovieDetail from './MovieDetail.jsx';
import NotFoundPage from '../NotFound/NotFoundPage.jsx';
import { getMovieById } from '../../services/movieService.js';
import { useEffect, useState } from 'react';

// Hiển thị phim hoặc trạng thái của yêu cầu tải phim.
function MovieDetailPage() {
    const { id } = useParams();
    const [loadResult, setLoadResult] = useState(null);

    useEffect(function () {
        let isCurrentRequest = true;

        // Lưu kết quả của yêu cầu còn hiệu lực.
        async function loadMovie() {
            try {
                const movie = await getMovieById(id);
                if (isCurrentRequest) {
                    setLoadResult({ id, movie, error: null });
                } 
            } catch (error) {
                // Lưu lỗi để chọn giao diện phù hợp.
                if (isCurrentRequest) {
                    setLoadResult({ id, movie: null, error });
                }
            }
        }

        loadMovie();

        // Bỏ qua phản hồi khi đổi phim hoặc rời trang.
        return function ignoreOldResponse() {
            isCurrentRequest = false;
        };
    }, [id]);

    // Chờ kết quả của phim đang mở.
    if (loadResult === null || loadResult.id !== id) {
        return <p role="status">Đang tải phim…</p>;
    }

    // Hiển thị trang 404 khi API báo không tìm thấy phim.
    const error = loadResult.error 
    if(error!== null && error !== undefined){
        if(error.status === 404){
            return <NotFoundPage/>;
        }
    }

    // Thông báo khi yêu cầu tải phim thất bại.
    if (loadResult.error) {
        return <p role="alert">Không thể tải phim. Vui lòng thử lại sau.</p>;
    }

    const apiMovie = loadResult.movie
    const movieDetail = {
        ...apiMovie,
        duration: apiMovie.durationMinutes,
        releaseDate: apiMovie.releaseDateMovie,
        originalTitle: apiMovie.subTitle,
        poster: apiMovie.posterUrl,
        backdrop: apiMovie.backdropUrl,
    };
    return <MovieDetail key={id} movieData={movieDetail} />;
}

export default MovieDetailPage;

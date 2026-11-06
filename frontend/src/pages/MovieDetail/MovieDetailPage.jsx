import { useParams } from 'react-router-dom';
import MovieDetail from './MovieDetail.jsx';
import { getMovieById } from '../../data/moviesData.js';

function MovieDetailPage() {
    const { id } = useParams();
    const movie = getMovieById(id);

    return <MovieDetail key={id} movieData={movie} />;
}

export default MovieDetailPage;

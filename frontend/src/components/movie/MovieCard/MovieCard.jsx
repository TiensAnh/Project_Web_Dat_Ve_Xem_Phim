import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import style from './MovieCard.module.css';

const cx = classNames.bind(style);

function MovieCard({ movie }) {
    if (!movie) return null;

    const targetLink = movie.link || (movie.id ? `/phim/${movie.id}` : '/');

    return (
        <div className={cx('wrapper-movie-card')}>
            <div className={cx('movie-card')}>
                <div className={cx('movie-poster')}>
                    <Link to={targetLink}>
                        <img src={movie.src} alt={movie.name} />
                    </Link>
                </div>
                <div className={cx('movie-name')}>
                    <Link to={targetLink}>
                        <h5 className={cx('title')}>{movie.name}</h5>
                        <h6 className={cx('genre')}>{movie.genre}</h6>
                    </Link>
                </div>
                <div className={cx('movie-rate')}>
                    <h5>
                        {typeof movie.rate === 'number' ? (
                            <>
                                {movie.rate}{' '}
                                <i className="fa-solid fa-star" style={{ color: '#FFC700' }}></i>
                            </>
                        ) : (
                            movie.rate
                        )}
                    </h5>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;

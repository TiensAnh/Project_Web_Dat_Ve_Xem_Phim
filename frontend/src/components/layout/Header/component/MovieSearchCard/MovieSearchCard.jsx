import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import style from './MovieSearchCard.module.css';

const cx = classNames.bind(style);

function MovieSearchCard({ data, onClick }) {
    if (!data) return null;

    const targetLink = data.link || (data.id ? `/phim/${data.id}` : '/');

    return (
        <Link to={targetLink} className={cx('card')} onClick={onClick}>
            <div className={cx('poster')}>
                <img src={data.poster} alt={data.title} />
            </div>
            <div className={cx('info')}>
                <h4 className={cx('title')} title={data.title}>
                    {data.title}
                </h4>
                <p className={cx('genre')}>{data.genre}</p>
                <div className={cx('meta')}>
                    <span className={cx('rating')}>
                        <i className="fa-solid fa-star"></i> {data.rating}
                    </span>
                    <span className={cx('status-badge')}>
                        <i className="fa-solid fa-tower-broadcast"></i> {data.status || 'ĐANG CHIẾU'}
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default MovieSearchCard;
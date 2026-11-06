import classNames from 'classnames/bind';
import style from './BlogDetailAuthor.module.css';

const cx = classNames.bind(style);

function BlogDetailAuthor({ tags = [], author }) {
    return (
        <div className={cx('author-wrapper')}>
            {/* Hàng hashtags chủ đề */}
            {tags && tags.length > 0 && (
                <div className={cx('tags-row')}>
                    <span className={cx('tags-label')}>CHỦ ĐỀ:</span>
                    <div className={cx('tags-list')}>
                        {tags.map((tag, idx) => (
                            <span key={idx} className={cx('tag-badge')}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Box tác giả */}
            {author && (
                <div className={cx('author-card')}>
                    <div className={cx('author-avatar-wrap')}>
                        <img
                            src={author.avatar}
                            alt={author.name}
                            className={cx('author-avatar')}
                        />
                    </div>
                    <div className={cx('author-info')}>
                        <span className={cx('author-role')}>{author.role || 'VỀ TÁC GIẢ'}</span>
                        <h4 className={cx('author-name')}>{author.name}</h4>
                        <p className={cx('author-bio')}>{author.bio}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BlogDetailAuthor;

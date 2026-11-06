import classNames from 'classnames/bind';
import style from './BlogTabs.module.css';

const cx = classNames.bind(style);

function BlogTabs({ categories = [], activeTab = 'all', onSelectTab }) {
    if (!categories || categories.length === 0) return null;

    return (
        <div className={cx('blog-tabs-container')}>
            <div className={cx('tabs-scroll')}>
                <div className={cx('tabs-list')} role="tablist">
                    {categories.map((cat) => {
                        const isActive = (cat.slug || cat.id) === activeTab;
                        return (
                            <button
                                key={cat.id || cat.slug}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                className={cx('tab-item', { active: isActive })}
                                onClick={() => onSelectTab && onSelectTab(cat.slug || cat.id)}
                            >
                                <span className={cx('tab-label')}>{cat.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default BlogTabs;

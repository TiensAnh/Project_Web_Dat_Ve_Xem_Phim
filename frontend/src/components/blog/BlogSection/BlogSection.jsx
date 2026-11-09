import { useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import style from './BlogSection.module.css';
import BlogCard from '../BlogCard/BlogCard.jsx';

const cx = classNames.bind(style);

const ITEMS_PER_ROW = 4;

const BLOG_DATA = [
    {
        id: 1,
        title: 'Phim Bộ Hàn Quốc 2026 - 2027: Những câu chuyện sẽ khiến bạn “thấp thỏm” chờ từng tập',
        thumbnail: 'https://image-worker.momocdn.net/convert-webp/img/65754658919213731-posterNHSNH.png?size=SM&referer=cinema.momocdn.net',
        views: '2.5K lượt xem',
        link: '/',
    },
    {
        id: 2,
        title: 'Chi tiết nhân vật Hộ Linh Tráng Sĩ và diễn viên',
        thumbnail: 'https://image-worker.momocdn.net/convert-webp/img/136510314202221683-hltsfn.jpg?size=SM&referer=cinema.momocdn.net',
        views: '1.7K lượt xem',
        link: '/',
    },
    {
        id: 3,
        title: 'Phim huyền sử vua Đinh Tiên Hoàng công bố trailer',
        thumbnail: 'https://image-worker.momocdn.net/convert-webp/img/65827527909973938-qtvgfinal.png?size=SM&referer=cinema.momocdn.net',
        views: '890 lượt xem',
        link: '/',
    },
    {
        id: 4,
        title: 'Đạo diễn Huỳnh Lập tặng nhà cho diễn viên đóng phim mới',
        thumbnail: 'https://image-worker.momocdn.net/convert-webp/img/65296582880233029-thutinhgui.png?size=SM&referer=cinema.momocdn.net',
        views: '1.2K lượt xem',
        link: '/',
    },
    {
        id: 5,
        title: 'Review phim mới của Huỳnh Lập: Lời tri ân các anh hùng dân tộc',
        thumbnail: 'https://image-worker.momocdn.net/convert-webp/img/113067762088949468-insidious.jpg?size=L&referer=cinema.momocdn.net',
        views: '244 lượt xem',
        link: '/',
    },
    {
        id: 6,
        title: 'Chi tiết nhân vật Nghỉ Hè Sợ Nghỉ Hưu và diễn viên',
        thumbnail: 'https://image-worker.momocdn.net/convert-webp/img/65754658919213731-posterNHSNH.png?size=SM&referer=cinema.momocdn.net',
        views: '342 lượt xem',
        link: '/',
    },
    {
        id: 7,
        title: 'Minions: “Đế Chế Chuối Vàng” Tại Phòng Vé Việt Nam',
        thumbnail: 'https://image-fworker.momocdn.net/momo-external/80e991a3fd9003c6afc835f8775bd667a14ed0d7b604338b3b2c170d7c161ddc?size=M',
        views: '3.1K lượt xem',
        link: '/',
    },
    {
        id: 8,
        title: 'Bom Tấn Tái Định Hình Phase 6 - Spider-Man: Khởi Đầu Mới',
        thumbnail: 'https://image-fworker.momocdn.net/momo-external/4f52ea0e6bcceec623c7076d27d8547f840be28c44b7465ba9b9c4b0d8a3c867?size=M',
        views: '4.8K lượt xem',
        link: '/',
    },
    {
        id: 9,
        title: 'Khám phá công nghệ chiếu IMAX Laser thế hệ mới tại các rạp chiếu phim',
        thumbnail: 'https://image-worker.momocdn.net/convert-webp/img/113060960657171110-diemmu.jpg?size=SM&referer=cinema.momocdn.net',
        views: '950 lượt xem',
        link: '/',
    },
    {
        id: 10,
        title: 'Top 10 phim bom tấn chiếu rạp đáng mong chờ nhất nửa cuối năm 2026',
        thumbnail: 'https://image-fworker.momocdn.net/momo-external/ec329bf163e553eb4fdb49ba74ad80d532fc0537241bae9497003fdf93dcf417?size=M',
        views: '5.2K lượt xem',
        link: '/',
    },
    {
        id: 11,
        title: 'Bí quyết săn combo vé xem phim và bắp nước ưu đãi độc quyền trên TianMovie',
        thumbnail: 'https://image-worker.momocdn.net/convert-webp/img/65296582880233029-thutinhgui.png?size=SM&referer=cinema.momocdn.net',
        views: '1.5K lượt xem',
        link: '/',
    },
    {
        id: 12,
        title: 'Đánh giá siêu phẩm kinh dị mới: Cơn ác mộng vượt ngoài sức tưởng tượng',
        thumbnail: 'https://image-worker.momocdn.net/convert-webp/img/113067762088949468-insidious.jpg?size=L&referer=cinema.momocdn.net',
        views: '2.1K lượt xem',
        link: '/',
    },
];

function BlogSection({ isDark = false, bgColor, textColor, titleColor, initialRows = 2 }) {
    const [activeTab, setActiveTab] = useState('latest');
    const [visibleCount, setVisibleCount] = useState(initialRows * ITEMS_PER_ROW);

    // Lọc danh sách bài viết theo Tab
    const sortedPosts = useMemo(() => {
        let list = [...BLOG_DATA];
        if (activeTab === 'most-viewed') {
            list.sort((a, b) => {
                const parseViews = (str) => {
                    if (!str) return 0;
                    if (str.includes('K')) return parseFloat(str) * 1000;
                    return parseInt(str, 10) || 0;
                };
                return parseViews(b.views) - parseViews(a.views);
            });
        }
        return list;
    }, [activeTab]);

    // Danh sách bài viết được hiển thị theo phân trang visibleCount
    const displayedPosts = useMemo(() => {
        return sortedPosts.slice(0, visibleCount);
    }, [sortedPosts, visibleCount]);

    // Kiểm tra xem đã hiển thị hết danh sách chưa
    const isExpandedAll = visibleCount >= sortedPosts.length;

    // Chuyển tab: reset số lượng bài về số hàng ban đầu
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setVisibleCount(initialRows * ITEMS_PER_ROW);
    };

    // Bấm nút Xem thêm: sổ ra thêm đúng 1 hàng (4 bài)
    const handleLoadMore = () => {
        setVisibleCount((prev) => Math.min(prev + ITEMS_PER_ROW, sortedPosts.length));
    };

    const customStyle = {
        ...(bgColor ? { backgroundColor: bgColor, borderTop: 'none' } : {}),
        ...(textColor ? { '--blog-text-color': textColor } : {}),
        ...(titleColor ? { '--blog-title-color': titleColor } : {}),
    };

    return (
        <section
            className={cx('blog-section', { 'dark-theme': isDark })}
            style={customStyle}
        >
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h2 className={cx('title')}>Blog phim ảnh</h2>
                    <p className={cx('subtitle')}>
                        Tổng hợp và Review các bộ phim hot, bom tấn, phim chiếu rạp hay mỗi ngày
                    </p>

                    <div className={cx('tabs')}>
                        <button
                            type="button"
                            className={cx('tab-btn', { active: activeTab === 'latest' })}
                            onClick={() => handleTabChange('latest')}
                        >
                            Mới nhất
                        </button>
                        <button
                            type="button"
                            className={cx('tab-btn', { active: activeTab === 'most-viewed' })}
                            onClick={() => handleTabChange('most-viewed')}
                        >
                            Xem nhiều nhất
                        </button>
                    </div>
                </div>

                <div className={cx('grid')}>
                    {displayedPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

                {!isExpandedAll && (
                    <div className={cx('action-more')}>
                        <button
                            type="button"
                            className={cx('btn-more')}
                            onClick={handleLoadMore}
                        >
                            <i className="fa-solid fa-chevron-down"></i> Xem thêm
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default BlogSection;

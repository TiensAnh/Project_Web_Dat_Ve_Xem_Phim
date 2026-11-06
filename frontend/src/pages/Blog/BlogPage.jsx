import { useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import style from './BlogPage.module.css';

import Header from '../../components/layout/Header/Header.jsx';
import Footer from '../../components/layout/Footer/Footer.jsx';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb.jsx';
import ScrollToTop from '../../components/common/ScrollToTop.jsx';

import BlogHeader from '../../components/blog/BlogHeader/BlogHeader.jsx';
import BlogTabs from '../../components/blog/BlogTabs/BlogTabs.jsx';
import BlogList from '../../components/blog/BlogList/BlogList.jsx';

import {
    getBlogPageMeta,
    getBlogCategories,
    getBlogPostsByCategory,
} from '../../data/blogData.js';

const cx = classNames.bind(style);
const INITIAL_COUNT = 9;
const INCREMENT_COUNT = 6;

function BlogPage() {
    const meta = getBlogPageMeta();
    const categories = getBlogCategories();

    // State danh mục đang chọn
    const [activeTab, setActiveTab] = useState('all');

    // State số lượng bài viết đang hiển thị (Load more)
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    // Lọc bài viết theo danh mục từ mockdata
    const currentPosts = useMemo(() => {
        return getBlogPostsByCategory(activeTab);
    }, [activeTab]);

    const hasMore = visibleCount < currentPosts.length;

    // Khi đổi tab danh mục
    const handleTabChange = (newTab) => {
        setActiveTab(newTab);
        setVisibleCount(INITIAL_COUNT);
    };

    // Khi bấm nút Xem thêm
    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + INCREMENT_COUNT);
    };

    // Khi bấm về bài viết mới nhất (từ Empty state)
    const handleResetCategory = () => {
        setActiveTab('all');
        setVisibleCount(INITIAL_COUNT);
    };

    return (
        <div className={cx('blog-page')}>
            <ScrollToTop />

            {/* Header cố định trên cùng */}
            <Header isFixed={true} />

            <main className={cx('main-container')}>
                {/* Breadcrumb điều hướng phân cấp */}
                <Breadcrumb items={meta.breadcrumb} />

                <div className={cx('container')}>
                    {/* Tiêu đề & Giới thiệu Blog */}
                    <BlogHeader
                        title={meta.title}
                        description={meta.description}
                    />

                    {/* Thanh tab lọc danh mục đề tài */}
                    <BlogTabs
                        categories={categories}
                        activeTab={activeTab}
                        onSelectTab={handleTabChange}
                    />

                    {/* Lưới bài viết & nút Xem thêm */}
                    <BlogList
                        posts={currentPosts}
                        visibleCount={visibleCount}
                        onLoadMore={handleLoadMore}
                        hasMore={hasMore}
                        onResetCategory={handleResetCategory}
                    />
                </div>
            </main>

            {/* Footer chân trang */}
            <Footer />
        </div>
    );
}

export default BlogPage;

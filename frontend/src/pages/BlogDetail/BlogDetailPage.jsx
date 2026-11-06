import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './BlogDetailPage.module.css';

import Header from '../../components/layout/Header/Header.jsx';
import Footer from '../../components/layout/Footer/Footer.jsx';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb.jsx';
import ScrollToTop from '../../components/common/ScrollToTop.jsx';

import BlogDetailHero from '../../components/blogDetail/BlogDetailHero/BlogDetailHero.jsx';
import BlogDetailHeader from '../../components/blogDetail/BlogDetailHeader/BlogDetailHeader.jsx';
import BlogDetailTOC from '../../components/blogDetail/BlogDetailTOC/BlogDetailTOC.jsx';
import BlogDetailContent from '../../components/blogDetail/BlogDetailContent/BlogDetailContent.jsx';
import BlogDetailAuthor from '../../components/blogDetail/BlogDetailAuthor/BlogDetailAuthor.jsx';
import BlogDetailRelated from '../../components/blogDetail/BlogDetailRelated/BlogDetailRelated.jsx';

import { getBlogDetailBySlug, getRelatedPosts } from '../../data/blogData.js';

const cx = classNames.bind(style);

function BlogDetailPage() {
    const { slug } = useParams();
    const location = useLocation();

    // Lấy dữ liệu chi tiết bài viết từ mockdata
    const article = getBlogDetailBySlug(slug);

    // Lấy danh sách 3 bài viết liên quan
    const relatedPosts = getRelatedPosts(article.slug, 3);

    // Dữ liệu breadcrumb phân cấp
    const breadcrumbItems = [
        { label: 'Trang chủ', path: '/', isHome: true },
        { label: 'Blog', path: '/blog' },
        { label: article.title, path: `/blog/${article.slug}` },
    ];

    // Xử lý cuộn mượt đến anchor (#hash) khi vào trang hoặc hash thay đổi
    useEffect(() => {
        const hash = window.location.hash || location.hash;
        if (hash) {
            const elementId = decodeURIComponent(hash.replace('#', ''));
            const scrollToElement = () => {
                const targetElement = document.getElementById(elementId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            };

            // Gọi cuộn sau các khoảng thời gian để đón đầu layout khi load ảnh
            const timer1 = setTimeout(scrollToElement, 150);
            const timer2 = setTimeout(scrollToElement, 600);
            const timer3 = setTimeout(scrollToElement, 1200);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
            };
        }
    }, [slug, location.hash]);

    return (
        <div className={cx('blog-detail-page')}>
            <ScrollToTop />

            {/* Header cố định */}
            <Header isFixed={true} />

            <main className={cx('main-container')}>
                {/* Breadcrumb điều hướng */}
                <Breadcrumb items={breadcrumbItems} />

                {/* Khung nội dung bài viết tối ưu đọc */}
                <div className={cx('article-container')}>
                    {/* 1. Ảnh bìa Banner lớn kèm badge */}
                    <BlogDetailHero
                        image={article.heroBanner}
                        alt={article.title}
                        badge={article.badge}
                    />

                    {/* 2. Header bài viết: Meta, Share button, H1, Sapo */}
                    <BlogDetailHeader
                        title={article.title}
                        sapo={article.sapo}
                        category={article.category}
                        categorySlug={article.categorySlug}
                        publishDate={article.publishDate}
                        readTime={article.readTime}
                    />

                    {/* 3. Bảng Mục lục Table of Contents có anchor link */}
                    <BlogDetailTOC toc={article.toc} />

                    {/* 4. Nội dung bài viết từng phim và câu hỏi FAQ */}
                    <BlogDetailContent
                        movies={article.movies}
                        faqs={article.faqs}
                    />

                    {/* 5. Hashtags chủ đề và thông tin Tác giả */}
                    <BlogDetailAuthor
                        tags={article.tags}
                        author={article.author}
                    />

                    {/* 6. Danh sách bài viết liên quan (Tái sử dụng BlogCard) */}
                    <BlogDetailRelated relatedPosts={relatedPosts} />
                </div>
            </main>

            {/* Footer chân trang */}
            <Footer />
        </div>
    );
}

export default BlogDetailPage;

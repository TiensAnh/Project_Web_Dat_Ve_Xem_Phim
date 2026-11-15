// Khai báo các tuyến đường của ứng dụng.
import { Routes, Route } from 'react-router-dom';
import AdminApp from '../admin/AdminApp.jsx';
import Home from '../pages/Home/Home.jsx';
import MovieDetailPage from '../pages/MovieDetail/MovieDetailPage.jsx';
import ShowtimesPage from '../pages/Showtimes/ShowtimesPage.jsx';
import CinemasPage from '../pages/Cinemas/CinemasPage.jsx';
import BrandPage from '../pages/Brand/BrandPage.jsx';
import CinemaDetailPage from '../pages/CinemaDetail/CinemaDetailPage.jsx';
import MoviePage from '../pages/Movies/MoviePage.jsx';
import BlogPage from '../pages/Blog/BlogPage.jsx';
import BlogDetailPage from '../pages/BlogDetail/BlogDetailPage.jsx';
import NotFoundPage from '../pages/NotFound/NotFoundPage.jsx';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/*" element={<AdminApp />} />
            <Route path="/lich-chieu" element={<ShowtimesPage />} />
            <Route path="/rap-chieu" element={<CinemasPage />} />
            <Route path="/rap-chieu/:brandId" element={<BrandPage />} />
            <Route path="/rap-chieu/:brandId/:cinemaId" element={<CinemaDetailPage />} />
            <Route path="/rap/:cinemaId" element={<CinemaDetailPage />} />
            <Route path="/brand/:brandId" element={<BrandPage />} />
            <Route path="/brand" element={<BrandPage />} />
            <Route path="/phim-chieu" element={<MoviePage />} />
            <Route path="/phim" element={<MoviePage />} />
            <Route path="/phim/:id" element={<MovieDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />   
            {/* Hiển thị trang 404 cho URL không khớp tuyến đường. */}
            <Route path="*" element={<NotFoundPage />} />
            
        </Routes>
    );
}

export default AppRoutes;

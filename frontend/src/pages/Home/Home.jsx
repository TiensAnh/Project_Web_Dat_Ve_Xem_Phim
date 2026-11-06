import Header from "../../components/layout/Header/Header";
import Hero from "../../components/layout/Hero/Hero.jsx"
import style from './Home.module.css';
import NowShowing from'../../components/movie/NowShowing/NowShowing.jsx'
import UpComingMovie from "../../components/movie/UpComingMovies/UpComingMovie.jsx";
import ShowTime from "../../components/movie/ShowTime/ShowTime.jsx";
import BlogSection from "../../components/blog/BlogSection/BlogSection.jsx";
import Footer from "../../components/layout/Footer/Footer.jsx";
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Home(){
    return(
        <>
            <Header/>
            <main className={cx ('main')}>
                <Hero/>
                <div className={cx('movie-showcase')}>
                    <NowShowing/>
                    <UpComingMovie/>
                </div>
                <ShowTime isDark={false} bgColor="rgba(70, 129, 255, 0.06)" />
                <BlogSection isDark={false} bgColor="rgba(70, 129, 255, 0.16)" />
            </main>
            <Footer/>
            
        </>
        
    )
}
export default Home
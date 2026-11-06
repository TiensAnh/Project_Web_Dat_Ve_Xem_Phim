import classNames from 'classnames/bind';
import style from './Hero.module.css';
import ImageSlider from './ImageSlider.jsx';
import { HERO_SLIDES_DESKTOP, HERO_SLIDES_MOBILE } from '../../../data/heroBannersData.js';

const cx = classNames.bind(style);

function Hero() {
    return (
        <div className={cx('container')}>
            {/* Slider dành riêng cho Desktop Web */}
            <div className={cx('desktop-slider')}>
                <ImageSlider slides={HERO_SLIDES_DESKTOP} isMobile={false} />
            </div>

            {/* Slider dành riêng cho Mobile Web */}
            <div className={cx('mobile-slider')}>
                <ImageSlider slides={HERO_SLIDES_MOBILE} isMobile={true} />
            </div>
        </div>
    );
}

export default Hero;
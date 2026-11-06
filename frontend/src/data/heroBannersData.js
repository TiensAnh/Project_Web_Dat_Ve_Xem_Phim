// Desktop Banners (Tỉ lệ 3:1 - 2048x682)
import dDigital from '../assets/banners/desktop/digital-2048x682_1790934068494.jpg';
import dGalaxy from '../assets/banners/desktop/2048x682-galaxy_1787801173380.jpg';
import dBannerWeb from '../assets/banners/desktop/banner-web-2048x682_1788769694243.jpg';
import dBts from '../assets/banners/desktop/bts-world-tour-arirang-in-sao-paulo-live-viewing-4_1790859137898.jpg';
import dGoAnLac from '../assets/banners/desktop/galaxy-cineo-go-an-lac--1_1790313334520.jpg';
import dQuangTrung from '../assets/banners/desktop/galaxy-cineo-quang-trung-mua-1-tang-1-5_1790831267766.jpg';
import dHenry from '../assets/banners/desktop/henrys-first-date-2_1790237508119.jpg';
import dMomo from '../assets/banners/desktop/momo-2_1778484333050.jpg';
import dRapDacBiet from '../assets/banners/desktop/rap-dac-biet-2_1777019478895.jpg';
import dShopee from '../assets/banners/desktop/shopee-x-galaxy-cinema-1_1788065621383.jpg';
import dTraiBuonNguoi from '../assets/banners/desktop/trai-buon-nguoi-2048_1790067347205.jpg';

// Mobile Banners (Tỉ lệ 3:2 / 1.5:1)
import mDigital from '../assets/banners/mobile/1350_1790934074810.jpg';
import mGalaxy from '../assets/banners/mobile/galaxy-1800x1200_1787801179860.jpg';
import mBannerApp from '../assets/banners/mobile/banner-app-1800x1200_1788769702417.jpg';
import mBts from '../assets/banners/mobile/bts-world-tour-arirang-in-sao-paulo-live-viewing-3_1790859142975.jpg';
import mGoAnLac from '../assets/banners/mobile/galaxy-cineo-go-an-lac--5_1790313346474.jpg';
import mQuangTrung from '../assets/banners/mobile/galaxy-cineo-quang-trung-mua-1-tang-1-4_1790831274345.jpg';
import mHenry from '../assets/banners/mobile/henrys-first-date-1_1790237521853.jpg';
import mMomo from '../assets/banners/mobile/momo-3_1778484342028.jpg';
import mRapDacBiet from '../assets/banners/mobile/rap-dac-biet_1777019484903.jpg';
import mShopee from '../assets/banners/mobile/shopee-x-galaxy-cinema-6_1788065628219.jpg';
import mTraiBuonNguoi from '../assets/banners/mobile/trai-buon-nguoi-750_1790067348251.jpg';

/**
 * Danh sách Banner cho Desktop Web (màn hình rộng)
 */
export const HERO_SLIDES_DESKTOP = [
    { id: 1, title: 'Trại Buôn Người', src: dTraiBuonNguoi },
    { id: 2, title: 'Digital Galaxy', src: dDigital },
    { id: 3, title: 'Galaxy Cineo Membership', src: dGalaxy },
    { id: 4, title: 'Galaxy Banner Web', src: dBannerWeb },
    { id: 5, title: 'BTS World Tour Arirang', src: dBts },
    { id: 6, title: 'Galaxy Cineo Go An Lạc', src: dGoAnLac },
    { id: 7, title: 'Galaxy Cineo Quang Trung Mua 1 Tặng 1', src: dQuangTrung },
    { id: 8, title: "Henry's First Date", src: dHenry },
    { id: 9, title: 'Ưu đãi MoMo', src: dMomo },
    { id: 10, title: 'Rạp đặc biệt Galaxy Cinema', src: dRapDacBiet },
    { id: 11, title: 'Shopee x Galaxy Cinema', src: dShopee },
];

/**
 * Danh sách Banner cho Mobile Web (màn hình di động tỉ lệ 3:2)
 */
export const HERO_SLIDES_MOBILE = [
    { id: 1, title: 'Trại Buôn Người', src: mTraiBuonNguoi },
    { id: 2, title: 'Digital Galaxy', src: mDigital },
    { id: 3, title: 'Galaxy Cineo Membership', src: mGalaxy },
    { id: 4, title: 'Galaxy Banner App', src: mBannerApp },
    { id: 5, title: 'BTS World Tour Arirang', src: mBts },
    { id: 6, title: 'Galaxy Cineo Go An Lạc', src: mGoAnLac },
    { id: 7, title: 'Galaxy Cineo Quang Trung Mua 1 Tặng 1', src: mQuangTrung },
    { id: 8, title: "Henry's First Date", src: mHenry },
    { id: 9, title: 'Ưu đãi MoMo', src: mMomo },
    { id: 10, title: 'Rạp đặc biệt Galaxy Cinema', src: mRapDacBiet },
    { id: 11, title: 'Shopee x Galaxy Cinema', src: mShopee },
];

export const getHeroSlides = () => ({
    desktop: HERO_SLIDES_DESKTOP,
    mobile: HERO_SLIDES_MOBILE,
});

// Desktop Banners (Tỉ lệ 3:1 - 2048x682)
const dDigital = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500920/digital-2048x682_1790934068494.jpg';
const dGalaxy = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500920/2048x682-galaxy_1787801173380.jpg';
const dBannerWeb = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500920/banner-web-2048x682_1788769694243.jpg';
const dBts = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500920/bts-world-tour-arirang-in-sao-paulo-live-viewing-4_1790859137898.jpg';
const dGoAnLac = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500920/galaxy-cineo-go-an-lac--1_1790313334520.jpg';
const dQuangTrung = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500920/galaxy-cineo-quang-trung-mua-1-tang-1-5_1790831267766.jpg';
const dHenry = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500921/henrys-first-date-2_1790237508119.jpg';
const dMomo = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500921/momo-2_1778484333050.jpg';
const dRapDacBiet = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500921/rap-dac-biet-2_1777019478895.jpg';
const dShopee = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500921/shopee-x-galaxy-cinema-1_1788065621383.jpg';
const dTraiBuonNguoi = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500921/trai-buon-nguoi-2048_1790067347205.jpg';

// Mobile Banners (Tỉ lệ 3:2 / 1.5:1)
const mDigital = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500901/1350_1790934074810.jpg';
const mGalaxy = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500903/galaxy-1800x1200_1787801179860.jpg';
const mBannerApp = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500902/banner-app-1800x1200_1788769702417.jpg';
const mBts = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500902/bts-world-tour-arirang-in-sao-paulo-live-viewing-3_1790859142975.jpg';
const mGoAnLac = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500903/galaxy-cineo-go-an-lac--5_1790313346474.jpg';
const mQuangTrung = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500903/galaxy-cineo-quang-trung-mua-1-tang-1-4_1790831274345.jpg';
const mHenry = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500902/henrys-first-date-1_1790237521853.jpg';
const mMomo = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500903/momo-3_1778484342028.jpg';
const mRapDacBiet = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500905/rap-dac-biet_1777019484903.jpg';
const mShopee = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500904/shopee-x-galaxy-cinema-6_1788065628219.jpg';
const mTraiBuonNguoi = 'https://res.cloudinary.com/uhqycyi3/image/upload/v1794500904/trai-buon-nguoi-750_1790067348251.jpg';

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

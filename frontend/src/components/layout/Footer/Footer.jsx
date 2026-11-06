import classNames from 'classnames/bind';
import style from './Footer.module.css';
import Logo_darkTheme from '../../../assets/Logo/Logo_darkTheme.png';

const cx = classNames.bind(style);

function Footer() {
  return (
    <footer className={cx('footer-container')}>
      <div className={cx('footer')}>
        {/* 1. KHU VỰC NỘI DUNG CHÍNH (4 CỘT) */}
        <div className={cx('footer-main')}>
          {/* Cột 1: Thương hiệu */}
          <div className={cx('footer-col')}>
            <div className={cx('brand-logo')}>
              <img src={Logo_darkTheme} alt="TianMovie Logo" className={cx('logo-img')} />
              <span className={cx('brand-name')}>TianMovie</span>
            </div>
            <p className={cx('brand-desc')}>
              Nền tảng đặt vé xem phim trực tuyến hàng đầu, kết nối nhanh chóng đến tất cả cụm rạp trên toàn quốc. Trải nghiệm điện ảnh đỉnh cao chỉ với vài cú chạm.
            </p>
            <div className={cx('social-list')}>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className={cx('social-link')} 
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className={cx('social-link')} 
                aria-label="YouTube"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer" 
                className={cx('social-link')} 
                aria-label="TikTok"
              >
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </div>
          </div>

          {/* Cột 2: Phim & Lịch chiếu */}
          <div className={cx('footer-col')}>
            <h4 className={cx('col-title')}>Phim & Lịch chiếu</h4>
            <ul className={cx('link-list')}>
              <li><a href="/" className={cx('footer-link')}>Phim đang chiếu</a></li>
              <li><a href="/" className={cx('footer-link')}>Phim sắp chiếu</a></li>
              <li><a href="/" className={cx('footer-link')}>Suất chiếu đặc biệt</a></li>
              <li><a href="/" className={cx('footer-link')}>Top phim thịnh hành</a></li>
            </ul>
          </div>

          {/* Cột 3: Cụm rạp đối tác */}
          <div className={cx('footer-col')}>
            <h4 className={cx('col-title')}>Cụm rạp đối tác</h4>
            <ul className={cx('link-list')}>
              <li><a href="/" className={cx('footer-link')}>CGV Cinemas</a></li>
              <li><a href="/" className={cx('footer-link')}>Lotte Cinema</a></li>
              <li><a href="/" className={cx('footer-link')}>Galaxy Cinema</a></li>
              <li><a href="/" className={cx('footer-link')}>BHD Star</a></li>
              <li><a href="/" className={cx('footer-link')}>Beta Cinemas</a></li>
            </ul>
          </div>

          {/* Cột 4: Chăm sóc khách hàng & Thanh toán */}
          <div className={cx('footer-col')}>
            <h4 className={cx('col-title')}>Chăm sóc khách hàng</h4>
            <div className={cx('contact-info')}>
              <p className={cx('contact-item')}>
                <i className="fa-solid fa-phone"></i>
                <span>Hotline: <a href="tel:19001234" className={cx('footer-link')}>1900 1234</a></span>
              </p>
              <p className={cx('contact-item')}>
                <i className="fa-solid fa-envelope"></i>
                <span>Email: <a href="mailto:support@tianmovie.vn" className={cx('footer-link')}>support@tianmovie.vn</a></span>
              </p>
            </div>

            <h5 className={cx('payment-title')}>Phương thức thanh toán</h5>
            <div className={cx('payment-tags')}>
              <span className={cx('payment-badge')}>MoMo</span>
              <span className={cx('payment-badge')}>VNPay</span>
              <span className={cx('payment-badge')}>Visa</span>
              <span className={cx('payment-badge')}>Mastercard</span>
            </div>
          </div>
        </div>

        {/* 2. BOTTOM BAR (BẢN QUYỀN) */}
        <div className={cx('footer-bottom')}>
          <p className={cx('copyright')}>
            &copy; 2026 TianMovie. All rights reserved.
          </p>
          <div className={cx('bottom-links')}>
            <a href="/" className={cx('bottom-link')}>Điều khoản sử dụng</a>
            <span className={cx('divider')}>|</span>
            <a href="/" className={cx('bottom-link')}>Chính sách bảo mật</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
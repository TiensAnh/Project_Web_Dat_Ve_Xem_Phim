import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './AuthModal.module.css';

const cx = classNames.bind(style);

function AuthModal({ isOpen, onClose, mode = 'login', setMode }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        remember: false,
    });

    // Reset password visibility when switching modes or opening/closing
    useEffect(() => {
        setShowPassword(false);
        setShowConfirmPassword(false);
    }, [mode, isOpen]);

    // Lock body scroll when modal is open and handle ESC key
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý gửi form (user có thể tự phát triển thêm kết nối API sau)
        console.log(`Submitting ${mode}:`, formData);
    };

    return (
        <div className={cx('modal-overlay')} onClick={onClose}>
            <div className={cx('modal-dialog')} onClick={(e) => e.stopPropagation()}>
                {/* Nút đóng X */}
                <button className={cx('close-btn')} onClick={onClose} aria-label="Đóng">
                    <i className="fa-solid fa-xmark"></i>
                </button>

                {/* Header modal */}
                <div className={cx('modal-header')}>
                    <h3 className={cx('modal-title')}>
                        {mode === 'login' ? 'Đăng nhập TianMovie' : 'Tạo tài khoản mới'}
                    </h3>
                    <p className={cx('modal-subtitle')}>
                        {mode === 'login'
                            ? 'Cùng thưởng thức hàng ngàn bộ phim đặc sắc'
                            : 'Đăng ký để nhận thông tin ưu đãi và đặt vé tiện lợi'}
                    </p>
                </div>

                {/* Thẻ thân modal bên trong chứa thanh cuộn */}
                <div className={cx('modal-body')}>
                    <form className={cx('modal-form')} onSubmit={handleSubmit}>
                        {mode === 'register' && (
                            /* 1. Họ và tên */
                            <div className={cx('form-group')}>
                                <label className={cx('input-label')}>Họ và tên</label>
                                <div className={cx('input-wrapper')}>
                                    <span className={cx('input-icon')}>
                                        <i className="fa-regular fa-user"></i>
                                    </span>
                                    <input
                                        type="text"
                                        name="fullName"
                                        className={cx('input-field')}
                                        placeholder="Nhập họ và tên của bạn"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email hoặc SĐT */}
                        <div className={cx('form-group')}>
                            <label className={cx('input-label')}>
                                {mode === 'login' ? 'Email hoặc Số điện thoại' : 'Địa chỉ Email'}
                            </label>
                            <div className={cx('input-wrapper')}>
                                <span className={cx('input-icon')}>
                                    <i className="fa-regular fa-envelope"></i>
                                </span>
                                <input
                                    type={mode === 'login' ? 'text' : 'email'}
                                    name="email"
                                    className={cx('input-field')}
                                    placeholder={
                                        mode === 'login'
                                            ? 'Nhập email hoặc số điện thoại'
                                            : 'name@example.com'
                                    }
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {mode === 'register' && (
                            /* 3. Số điện thoại */
                            <div className={cx('form-group')}>
                                <label className={cx('input-label')}>Số điện thoại</label>
                                <div className={cx('input-wrapper')}>
                                    <span className={cx('input-icon')}>
                                        <i className="fa-solid fa-phone"></i>
                                    </span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className={cx('input-field')}
                                        placeholder="Nhập số điện thoại của bạn"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* Mật khẩu */}
                        <div className={cx('form-group')}>
                            <label className={cx('input-label')}>Mật khẩu</label>
                            <div className={cx('input-wrapper')}>
                                <span className={cx('input-icon')}>
                                    <i className="fa-solid fa-lock"></i>
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    className={cx('input-field')}
                                    placeholder={
                                        mode === 'login' ? 'Nhập mật khẩu' : 'Mật khẩu (tối thiểu 6 ký tự)'
                                    }
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className={cx('eye-btn')}
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                >
                                    <i className={showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'}></i>
                                </button>
                            </div>
                        </div>

                        {mode === 'register' && (
                            /* 5. Nhập lại mật khẩu */
                            <div className={cx('form-group')}>
                                <label className={cx('input-label')}>Xác nhận mật khẩu</label>
                                <div className={cx('input-wrapper')}>
                                    <span className={cx('input-icon')}>
                                        <i className="fa-solid fa-shield-halved"></i>
                                    </span>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        className={cx('input-field')}
                                        placeholder="Nhập lại mật khẩu vừa đặt"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className={cx('eye-btn')}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        tabIndex={-1}
                                    >
                                        <i
                                            className={
                                                showConfirmPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'
                                            }
                                        ></i>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Hàng phụ của form Đăng nhập */}
                        {mode === 'login' && (
                            <div className={cx('form-options')}>
                                <label className={cx('checkbox-label')}>
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={formData.remember}
                                        onChange={handleChange}
                                    />
                                    <span>Ghi nhớ đăng nhập</span>
                                </label>
                                <a href="#forgot" className={cx('forgot-link')} onClick={(e) => e.preventDefault()}>
                                    Quên mật khẩu?
                                </a>
                            </div>
                        )}

                        {/* Nút submit */}
                        <button type="submit" className={cx('submit-btn')}>
                            {mode === 'login' ? 'Đăng nhập' : 'Đăng ký tài khoản'}
                        </button>
                    </form>
                </div>

                {/* Footer chuyển đổi giữa Login và Register */}
                <div className={cx('modal-footer')}>
                    {mode === 'login' ? (
                        <p className={cx('switch-text')}>
                            Bạn chưa có tài khoản?{' '}
                            <button
                                type="button"
                                className={cx('switch-link')}
                                onClick={() => setMode('register')}
                            >
                                Đăng ký ngay
                            </button>
                        </p>
                    ) : (
                        <p className={cx('switch-text')}>
                            Đã có tài khoản?{' '}
                            <button
                                type="button"
                                className={cx('switch-link')}
                                onClick={() => setMode('login')}
                            >
                                Đăng nhập ngay
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthModal;

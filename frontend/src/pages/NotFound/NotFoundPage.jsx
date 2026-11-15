// Hiển thị trang không tìm thấy.
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

// Cho phép người dùng quay lại trang chủ.
function NotFoundPage() {
    return (
        <main className={styles.page}>
            <div className={styles.content}>
                <p className={styles.code}>404</p>
                <h1>Rất tiếc trang bạn không được tìm thấy</h1>
                <p className={styles.description}>
                    Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa. Vui lòng quay lại trang chủ hoặc tìm kiếm trên TianMovie.
                </p>
                <Link className={styles.homeLink} to="/">Quay lại trang chủ</Link>
            </div>
        </main>
    );
}

export default NotFoundPage;

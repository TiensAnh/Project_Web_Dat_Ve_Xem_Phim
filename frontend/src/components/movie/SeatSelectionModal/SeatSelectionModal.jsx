import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './SeatSelectionModal.module.css';

const ROWS = 'ABCDEFGHI'.split('');
const SOLD_SEATS = new Set(['G11', 'G10']);
const MAP_WIDTH = 690;
const MAP_HEIGHT = 430;
const INITIAL_VIEW = { scale: 1, x: 0, y: 0 };
const SEAT_PRICES = { standard: 80000, vip: 100000, sweetbox: 220000 };
const SEATS = [
    ...ROWS.flatMap((row, rowIndex) => Array.from({ length: 20 }, (_, index) => ({
        id: `${row}${20 - index}`,
        label: `${row}${20 - index}`,
        type: rowIndex < 3 ? 'standard' : 'vip',
        row,
        column: index + 1,
    }))),
    ...['L', 'M'].flatMap((row) => Array.from({ length: 9 }, (_, index) => ({
        id: `${row}${18 - index * 2}-${17 - index * 2}`,
        label: `${row}${18 - index * 2} ${row}${17 - index * 2}`,
        type: 'sweetbox',
        row,
        column: index + 1,
    }))),
];
const formatMoney = (amount) => `${amount.toLocaleString('vi-VN')}đ`;

function clampView(view, viewport) {
    if (!viewport) return view;
    // Keep at least 80px of the map visible along each axis.
    const limitX = Math.max(0, (MAP_WIDTH * view.scale + viewport.clientWidth) / 2 - 80);
    const limitY = Math.max(0, (MAP_HEIGHT * view.scale + viewport.clientHeight) / 2 - 80);
    return {
        ...view,
        x: Math.max(-limitX, Math.min(limitX, view.x)),
        y: Math.max(-limitY, Math.min(limitY, view.y)),
    };
}

function SeatSelectionDialog({ onClose }) {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [view, setView] = useState(INITIAL_VIEW);
    const [isDragging, setIsDragging] = useState(false);
    const dialogRef = useRef(null);
    const viewportRef = useRef(null);
    const closeRef = useRef(null);
    const gestureRef = useRef(null);
    const suppressClickRef = useRef(false);
    const hasFittedRef = useRef(false);
    const selectedSeatItems = SEATS.filter((seat) => selectedSeats.includes(seat.id));
    const total = selectedSeatItems.reduce((sum, seat) => sum + SEAT_PRICES[seat.type], 0);

    useEffect(() => {
        const dialog = dialogRef.current;
        const previousFocus = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        dialog.showModal();
        closeRef.current.focus();
        return () => {
            dialog.close();
            document.body.style.overflow = previousOverflow;
            if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
                previousFocus.focus();
            }
        };
    }, []);

    const zoom = (direction, clientX, clientY) => {
        const viewport = viewportRef.current;
        const bounds = viewport.getBoundingClientRect();
        const pointX = clientX === undefined ? 0 : clientX - bounds.left - bounds.width / 2;
        const pointY = clientY === undefined ? 0 : clientY - bounds.top - bounds.height / 2;
        setView((previous) => {
            const scale = Math.max(0.5, Math.min(2, Math.round((previous.scale + direction * 0.1) * 10) / 10));
            const ratio = scale / previous.scale;
            return clampView({
                scale,
                x: pointX - (pointX - previous.x) * ratio,
                y: pointY - (pointY - previous.y) * ratio,
            }, viewport);
        });
    };

    useEffect(() => {
        const viewport = viewportRef.current;
        // A non-passive listener prevents page scrolling while zooming the map.
        const handleWheel = (event) => {
            event.preventDefault();
            if (event.deltaY !== 0) {
                zoom(event.deltaY < 0 ? 1 : -1, event.clientX, event.clientY);
            }
        };
        viewport.addEventListener('wheel', handleWheel, { passive: false });
        const observer = new ResizeObserver(() => {
            if (!hasFittedRef.current) {
                const scale = Math.max(0.5, Math.min(1, (viewport.clientWidth - 16) / MAP_WIDTH, (viewport.clientHeight - 8) / MAP_HEIGHT));
                setView({ scale, x: 0, y: 0 });
                hasFittedRef.current = true;
            } else {
                setView((previous) => clampView(previous, viewport));
            }
        });
        observer.observe(viewport);
        return () => {
            viewport.removeEventListener('wheel', handleWheel);
            observer.disconnect();
        };
    }, []);

    const startDrag = (event) => {
        if (!event.isPrimary || event.button !== 0) return;
        suppressClickRef.current = false;
        gestureRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            x: view.x,
            y: view.y,
            moved: false,
        };
    };

    const moveDrag = (event) => {
        const gesture = gestureRef.current;
        if (!gesture || gesture.pointerId !== event.pointerId) return;
        const dx = event.clientX - gesture.startX;
        const dy = event.clientY - gesture.startY;
        if (!gesture.moved && Math.hypot(dx, dy) < 5) return;
        gesture.moved = true;
        suppressClickRef.current = true;
        viewportRef.current.setPointerCapture(event.pointerId);
        setIsDragging(true);
        setView((previous) => clampView({ ...previous, x: gesture.x + dx, y: gesture.y + dy }, viewportRef.current));
    };

    const endDrag = (event) => {
        if (gestureRef.current?.pointerId !== event.pointerId) return;
        gestureRef.current = null;
        setIsDragging(false);
        if (viewportRef.current.hasPointerCapture(event.pointerId)) {
            viewportRef.current.releasePointerCapture(event.pointerId);
        }
    };

    const toggleSeat = (seat) => {
        setSelectedSeats((previous) => previous.includes(seat)
            ? previous.filter((item) => item !== seat)
            : [...previous, seat]);
    };

    return createPortal(
        <dialog
            ref={dialogRef}
            className={styles.dialog}
            aria-labelledby="seat-selection-title"
            onCancel={(event) => { event.preventDefault(); onClose(); }}
            onClick={(event) => {
                if (event.target !== event.currentTarget) return;
                const bounds = event.currentTarget.getBoundingClientRect();
                if (event.clientX < bounds.left || event.clientX > bounds.right
                    || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
            }}
        >
            <header className={styles.header}>
                <button ref={closeRef} type="button" className={styles.backButton} onClick={onClose} aria-label="Đóng chọn ghế">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="m15 5-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <h2 id="seat-selection-title">Mua vé xem phim</h2>
            </header>

            <section className={styles.middle} aria-label="Chọn ghế trong rạp">
                <div
                    ref={viewportRef}
                    className={`${styles.viewport} ${isDragging ? styles.dragging : ''}`}
                    onPointerDown={startDrag}
                    onPointerMove={moveDrag}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                    onLostPointerCapture={endDrag}
                    onPointerLeave={(event) => { if (!gestureRef.current?.moved) endDrag(event); }}
                    onClickCapture={(event) => {
                        if (suppressClickRef.current && event.detail !== 0) {
                            event.preventDefault();
                            event.stopPropagation();
                            suppressClickRef.current = false;
                        }
                    }}
                    onFocusCapture={(event) => {
                        // Keyboard navigation brings the focused seat back into view.
                        if (event.target.matches('button:focus-visible')) setView(INITIAL_VIEW);
                    }}
                >
                    <div className={styles.map} style={{ transform: `translate(-50%, -50%) translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}>
                        <div className={styles.screen}>MÀN HÌNH</div>
                        <div className={styles.seatGrid}>
                            {[...ROWS, 'L', 'M'].map((row) => (
                                <div key={row} className={`${styles.seatRow} ${row === 'L' || row === 'M' ? styles.coupleRow : ''}`}>
                                    {SEATS.filter((seat) => seat.row === row).map((seat) => {
                                        const sold = SOLD_SEATS.has(seat.id);
                                        const selected = selectedSeats.includes(seat.id);
                                        return (
                                            <button
                                                key={seat.id}
                                                type="button"
                                                className={`${styles.seat} ${styles[seat.type]} ${selected ? styles.selected : ''}`}
                                                style={{ gridColumn: seat.column }}
                                                aria-label={`Ghế ${seat.label}${sold ? ', đã đặt' : ''}`}
                                                aria-pressed={selected}
                                                aria-disabled={sold}
                                                tabIndex={sold ? -1 : 0}
                                                onClick={() => { if (!sold) toggleSeat(seat.id); }}
                                            >
                                                {seat.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.legend}>
                    <span><i className={styles.soldKey} aria-hidden="true" />Đã đặt</span>
                    <span><i className={styles.selectedKey} aria-hidden="true" />Ghế bạn chọn</span>
                    <span><i className={styles.standard} aria-hidden="true" />Ghế thường</span>
                    <span><i className={styles.vip} aria-hidden="true" />Ghế VIP</span>
                    <span><i className={styles.sweetbox} aria-hidden="true" />Ghế Sweetbox</span>
                    <span><i className={styles.centralKey} aria-hidden="true" />Vùng trung tâm</span>
                </div>
                <details className={styles.seatDetails}>
                    <summary><u>Xem chi tiết</u> hình ảnh và thông tin ghế</summary>
                    <p>Giá mẫu: Ghế thường {formatMoney(SEAT_PRICES.standard)} · VIP {formatMoney(SEAT_PRICES.vip)} · Sweetbox {formatMoney(SEAT_PRICES.sweetbox)}/đôi. Kéo sơ đồ để di chuyển, cuộn chuột để zoom.</p>
                </details>
            </section>

            <footer className={styles.footer}>
                <div className={styles.movieTitle}>
                    <span className={styles.ageBadge}>C18</span>
                    <h3>Trại Buôn Người</h3>
                </div>
                <p className={styles.sessionInfo}>17:00 ~ 19:15 · Hôm nay · Phòng chiếu Cinema 7 · 2D Phụ đề</p>
                <div className={styles.chosenSeats} aria-live="polite">
                    <span>Chỗ ngồi</span>
                    <strong>{selectedSeatItems.map((seat) => seat.label).join(', ') || '—'}</strong>
                </div>
                <div className={styles.checkout}>
                    <div aria-live="polite"><span>Tạm tính</span><strong>{formatMoney(total)}</strong></div>
                    <button type="button" className={styles.buyButton} disabled aria-label="Mua vé, chức năng đang được phát triển">Mua vé</button>
                </div>
            </footer>
        </dialog>,
        document.body,
    );
}

export default function SeatSelectionModal({ isOpen, onClose }) {
    return isOpen ? <SeatSelectionDialog onClose={onClose} /> : null;
}

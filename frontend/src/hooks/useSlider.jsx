import { useRef, useState } from "react";

function useSlider(slides) {
    if (!slides || slides.length === 0) {
        return {
            goToPrevious: () => {},
            goToNext: () => {},
            handleTransitionEnd: () => {},
            goToSlide: () => {},
            activeDot: 0,
            currentIndex: 0,
            setCurrentIndex: () => {},
            isTransition: false,
            extendSlide: [],
            handleTouchStart: () => {},
            handleTouchMove: () => {},
            handleTouchEnd: () => {},
            handleMouseDown: () => {},
            handleMouseMove: () => {},
            handleMouseUp: () => {},
            handleMouseLeave: () => {},
        };
    }

    const extendSlide = [
        slides[slides.length - 1],
        ...slides,
        slides[0]
    ];
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransition, setIsTransition] = useState(true);
    const isMovingRef = useRef(false);

    const goToPrevious = () => {
        if (isMovingRef.current) return;
        isMovingRef.current = true;
        setIsTransition(true);
        setCurrentIndex((prev) => prev - 1);
    };

    const goToNext = () => {
        if (isMovingRef.current) return;
        isMovingRef.current = true;
        setIsTransition(true);
        setCurrentIndex((prev) => prev + 1);
    };

    const handleTransitionEnd = () => {
        isMovingRef.current = false;
        if (currentIndex === 0) {
            setIsTransition(false);
            setCurrentIndex(slides.length);
        } else if (currentIndex === extendSlide.length - 1) {
            setIsTransition(false);
            setCurrentIndex(1);
        }
    };

    const goToSlide = (index) => {
        if (isMovingRef.current) return;
        if (index + 1 === currentIndex) return;
        isMovingRef.current = true;
        setIsTransition(true);
        setCurrentIndex(index + 1);
    };

    // Touch & Mouse Gesture Support
    const minSwipeDistance = 45; // Khoảng cách vuốt tối thiểu (px)
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const touchEndX = useRef(0);
    const touchEndY = useRef(0);

    const isDragging = useRef(false);
    const mouseStartX = useRef(0);

    // Cử chỉ Touch trên màn hình cảm ứng (Mobile / Tablet)
    const handleTouchStart = (e) => {
        if (e.targetTouches.length === 1) {
            touchStartX.current = e.targetTouches[0].clientX;
            touchStartY.current = e.targetTouches[0].clientY;
            touchEndX.current = e.targetTouches[0].clientX;
            touchEndY.current = e.targetTouches[0].clientY;
        }
    };

    const handleTouchMove = (e) => {
        if (e.targetTouches.length === 1) {
            touchEndX.current = e.targetTouches[0].clientX;
            touchEndY.current = e.targetTouches[0].clientY;
        }
    };

    const handleTouchEnd = () => {
        const diffX = touchStartX.current - touchEndX.current;
        const diffY = touchStartY.current - touchEndY.current;

        // Chỉ xử lý chuyển slide khi vuốt ngang nhiều hơn vuốt dọc (tránh cản trở cuộn trang)
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
            if (diffX > 0) {
                goToNext(); // Vuốt sang trái -> Xem slide tiếp theo
            } else {
                goToPrevious(); // Vuốt sang phải -> Quay lại slide trước
            }
        }
    };

    // Cử chỉ kéo thả chuột Drag trên máy tính (Desktop)
    const handleMouseDown = (e) => {
        if (e.button !== 0) return; // Chỉ nhận chuột trái
        isDragging.current = true;
        mouseStartX.current = e.clientX;
    };

    const handleMouseMove = () => {};

    const handleMouseUp = (e) => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const diffX = mouseStartX.current - e.clientX;
        if (Math.abs(diffX) > minSwipeDistance) {
            if (diffX > 0) {
                goToNext();
            } else {
                goToPrevious();
            }
        }
    };

    const handleMouseLeave = () => {
        isDragging.current = false;
    };

    const activeDot = (currentIndex - 1 + slides.length) % slides.length;

    return {
        goToPrevious,
        goToNext,
        handleTransitionEnd,
        goToSlide,
        activeDot,
        currentIndex,
        setCurrentIndex,
        isTransition,
        extendSlide,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleMouseLeave,
    };
}

export default useSlider;
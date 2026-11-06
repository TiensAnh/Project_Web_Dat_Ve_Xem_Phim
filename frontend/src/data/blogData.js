/**
 * Mock data cho trang Blog Phim Ảnh (BlogPage & BlogDetailPage) của TianMovie
 * Tham khảo cấu trúc từ MoMo Cinema Blog
 */

export const BLOG_PAGE_META = {
    title: 'Blog Phim Ảnh',
    description:
        'Cập nhật các Blog về phim ảnh hay nhất trên thị trường với đầy đủ thể loại, quốc gia. Giải mã những nội dung phim gây tò mò và hấp dẫn.',
    breadcrumb: [
        { label: 'Trang chủ', path: '/', isHome: true },
        { label: 'Blog', path: '/blog' },
    ],
};

export const BLOG_CATEGORIES = [
    { id: 'all', label: 'Mới nhất', slug: 'all' },
    { id: 'phim-chieu-rap', label: 'Phim chiếu rạp', slug: 'phim-chieu-rap' },
    { id: 'review-phim', label: 'Review phim', slug: 'review-phim' },
    { id: 'tong-hop-phim', label: 'Tổng hợp phim', slug: 'tong-hop-phim' },
    { id: 'netflix', label: 'Netflix', slug: 'netflix' },
    { id: 'insights', label: 'Insights khán giả', slug: 'insights' },
    { id: 'tin-tuc', label: 'Tin tức', slug: 'tin-tuc' },
];

export const BLOG_POSTS = [
    {
        id: 1,
        slug: '20-phim-the-thao-hay-nhat',
        title: '20+ phim thể thao hay nhất mà bạn không thể không xem',
        excerpt:
            'Phim thể thao luôn mang đến cho khán giả những giây phút nghẹt thở cùng tinh thần quật cường vượt qua mọi giới hạn. Dưới đây là danh sách hơn 20 bộ phim thể thao xuất sắc nhất mọi thời đại.',
        category: 'Tổng hợp phim',
        categorySlug: 'tong-hop-phim',
        readTime: '10 phút đọc',
        publishDate: '07/10/2026',
        thumbnail:
            'https://homepage.momocdn.net/img/blog-phim-the-thao-1920x600-1791365819255-261007163659.jpg',
        badge: 'Top phim hay thể loại thể thao',
    },
    {
        id: 2,
        slug: 'top-30-tuyet-tac-phim-tinh-cam-hay',
        title: 'Top 30 tuyệt tác phim tình cảm hay bạn nhất định phải xem',
        excerpt:
            'Phim tình cảm hay nhất, cảm động nhất từ Mỹ, Hàn Quốc, Nhật Bản... Xem ngay danh sách tuyển chọn của TianMovie để không bỏ lỡ những tuyệt tác điện ảnh rung động trái tim.',
        category: 'Tổng hợp phim',
        categorySlug: 'tong-hop-phim',
        readTime: '14 phút đọc',
        publishDate: '06/10/2026',
        thumbnail:
            'https://homepage.momocdn.net/img/blog-phim-tinh-cam-1920x600-1791277825838-261006161026.jpg',
        badge: 'Phim tình cảm hay nhất',
    },
    {
        id: 3,
        slug: 'spider-man-wiki-lich-su-suc-manh',
        title: 'Spider Man Wiki: Lịch sử, sức mạnh và trọn bộ 22 phim Người Nhện',
        excerpt:
            'Spider-Man (Người Nhện) là biểu tượng văn hóa đại chúng toàn cầu. Tìm hiểu nguồn gốc, sức mạnh, bí mật của Người Nhện và thứ tự thưởng thức toàn bộ các phim chuẩn Marvel.',
        category: 'Phim chiếu rạp',
        categorySlug: 'phim-chieu-rap',
        readTime: '12 phút đọc',
        publishDate: '05/10/2026',
        thumbnail: 'https://homepage.momocdn.net/img/spider-man-261001113328.jpg',
        badge: 'Vũ trụ Siêu anh hùng',
    },
    {
        id: 4,
        slug: 'top-20-phim-hai-cuoi-quen-sau',
        title: 'Top 20 phim hài cười quên sầu đáng xem nhất thế giới',
        excerpt:
            'Tổng hợp top 20 phim hài hay nhất mọi thời đại từ Việt Nam, Hàn Quốc đến Âu Mỹ. Đừng bỏ lỡ danh sách phim này để có những phút giây xả stress sảng khoái cuối tuần!',
        category: 'Tổng hợp phim',
        categorySlug: 'tong-hop-phim',
        readTime: '13 phút đọc',
        publishDate: '04/10/2026',
        thumbnail: 'https://homepage.momocdn.net/img/phim-hai-260930175236.jpg',
    },
    {
        id: 5,
        slug: 'review-trai-buon-nguoi-2026',
        title: 'Review Trại Buôn Người: Hành trình sinh tồn nghẹt thở và thông điệp cảnh tỉnh gai góc',
        excerpt:
            'Bom tấn hành động hình sự Việt Nam năm 2026 mang đến những pha cận chiến tàn bạo, dàn dựng công phu cùng câu chuyện giải cứu đầy xúc động nơi hang ổ tội phạm.',
        category: 'Review phim',
        categorySlug: 'review-phim',
        readTime: '8 phút đọc',
        publishDate: '03/10/2026',
        thumbnail: 'https://cinema.momocdn.net/img/74805855983673840-tbn1.jpg?size=M',
        badge: 'Điểm 9.6/10',
    },
    {
        id: 6,
        slug: 'top-25-phim-cung-dau-dang-xem-nhat',
        title: 'Top 25 Phim Cung Đấu Đáng Xem Nhất Mọi Thời Đại',
        excerpt:
            'Phim cung đấu hấp dẫn nhờ những mưu lược chốn hậu cung thâm hiểm, tranh quyền đoạt vị và số phận bi kịch của các phi tần. Danh sách quy tụ các tác phẩm kinh điển Trung - Hàn.',
        category: 'Tổng hợp phim',
        categorySlug: 'tong-hop-phim',
        readTime: '15 phút đọc',
        publishDate: '02/10/2026',
        thumbnail: 'https://homepage.momocdn.net/img/top-phim-cung-dau-dang-xem-nhat1-260930133250.jpg',
        badge: 'Cung Đấu Đỉnh Cao',
    },
    {
        id: 7,
        slug: 'top-phim-netflix-thang-10-2026',
        title: 'Top 10 phim Netflix thịnh hành nhất tháng 10/2026 không thể bỏ qua',
        excerpt:
            'Cập nhật danh sách các bộ phim điện ảnh và series dài tập đang càn quét bảng xếp hạng Netflix toàn cầu với kịch bản giật gân, bất ngờ tới phút chót.',
        category: 'Netflix',
        categorySlug: 'netflix',
        readTime: '9 phút đọc',
        publishDate: '01/10/2026',
        thumbnail: 'https://homepage.momocdn.net/img/top-anime-hay-4-260907175929.jpg',
        badge: 'Netflix Trending',
    },
    {
        id: 8,
        slug: 'insights-xu-huong-khan-gia-viet-2026',
        title: 'Insights Khán Giả: Phim kinh dị và hài hước thống trị phòng vé Việt ra sao?',
        excerpt:
            'Phân tích hành vi xem phim của người trẻ Việt năm 2026: Tại sao các tác phẩm khai thác chất liệu văn hóa bản địa và tâm linh lại luôn phá vỡ kỷ lục doanh thu phòng vé?',
        category: 'Insights khán giả',
        categorySlug: 'insights',
        readTime: '11 phút đọc',
        publishDate: '30/09/2026',
        thumbnail: 'https://homepage.momocdn.net/img/phim-trung-quoc-260930151127.jpg',
    },
    {
        id: 9,
        slug: 'tin-tuc-dien-anh-phim-chieu-rap-cuoi-nam',
        title: 'Tin tức điện ảnh: Lịch khởi chiếu các bom tấn quốc tế nửa cuối năm 2026',
        excerpt:
            'Tổng hợp các tựa phim chiếu rạp đình đám dự kiến đổ bộ các cụm rạp CGV, Lotte Cinema, Galaxy Cinema trong quý 4 với định dạng IMAX và 4DX đỉnh cao.',
        category: 'Tin tức',
        categorySlug: 'tin-tuc',
        readTime: '7 phút đọc',
        publishDate: '29/09/2026',
        thumbnail: 'https://homepage.momocdn.net/img/phim-ngon-tinh-1-260907153846.jpg',
    },
    {
        id: 10,
        slug: 'review-nghi-he-so-nghi-huu-huynh-lap',
        title: 'Review Nghỉ Hè Sợ Nghỉ Hưu: Tiếng cười duyên dáng và giọt nước mắt tình thân',
        excerpt:
            'Tác phẩm mới của Huỳnh Lập ghi điểm nhờ góc nhìn hài hước nhưng thấu cảm về sự chông chênh của người lớn tuổi khi bước vào tuổi xế chiều.',
        category: 'Review phim',
        categorySlug: 'review-phim',
        readTime: '8 phút đọc',
        publishDate: '28/09/2026',
        thumbnail: 'https://image-worker.momocdn.net/convert-webp/img/65754658919213731-posterNHSNH.png?size=SM&referer=cinema.momocdn.net',
    },
    {
        id: 11,
        slug: 'top-25-anime-nhat-ban-hay-nhat',
        title: 'Top 25 phim hoạt hình anime Nhật Bản hay nhất mọi thời đại',
        excerpt:
            'Anime Nhật Bản thu hút hàng triệu khán giả nhờ chiều sâu cốt truyện và đồ họa tuyệt mỹ. Tổng hợp 25 kiệt tác anime từ Ghibli, Shinkai Makoto đến các hiện tượng phòng vé mới nhất.',
        category: 'Tổng hợp phim',
        categorySlug: 'tong-hop-phim',
        readTime: '16 phút đọc',
        publishDate: '27/09/2026',
        thumbnail: 'https://homepage.momocdn.net/img/phim-hoat-hinh-trung-quoc-260929161857.jpg',
    },
    {
        id: 12,
        slug: 'netflix-series-kinh-di-dang-xem-nhat',
        title: 'Cày ngay 8 series kinh dị đen tối trên Netflix khiến bạn lạnh gáy trong đêm',
        excerpt:
            'Những câu chuyện quỷ dị, nghi thức tà giáo và các vụ án mất tích bí ẩn đưa người xem vào những trải nghiệm giật gân, hồi hộp đến nghẹt thở.',
        category: 'Netflix',
        categorySlug: 'netflix',
        readTime: '10 phút đọc',
        publishDate: '26/09/2026',
        thumbnail: 'https://image-worker.momocdn.net/convert-webp/img/113067762088949468-insidious.jpg?size=L&referer=cinema.momocdn.net',
    },
    {
        id: 13,
        slug: 'hoi-ngo-phong-ve-di-dong-tai-rap-chieu',
        title: 'Phim chiếu rạp tháng 10: Cuộc chiến phòng vé nảy lửa giữa phim Việt và bom tấn Hollywood',
        excerpt:
            'Hàng loạt tác phẩm điện ảnh được đầu tư hàng chục triệu USD chuẩn bị ra mắt, hứa hẹn tạo nên cơn sốt bùng nổ doanh thu vé rạp trong tháng 10.',
        category: 'Phim chiếu rạp',
        categorySlug: 'phim-chieu-rap',
        readTime: '6 phút đọc',
        publishDate: '25/09/2026',
        thumbnail: 'https://image-fworker.momocdn.net/momo-external/80e991a3fd9003c6afc835f8775bd667a14ed0d7b604338b3b2c170d7c161ddc?size=M',
    },
    {
        id: 14,
        slug: 'insights-thoi-quen-dat-ve-online-rap-chieu',
        title: 'Xu hướng đặt vé xem phim online: Tiện lợi, chọn chỗ ưng ý và săn ưu đãi hấp dẫn',
        excerpt:
            'Khảo sát chỉ ra hơn 85% mọt phim hiện nay ưu tiên đặt vé qua ứng dụng để tránh xếp hàng đông đúc và chọn được ghế đẹp tại các rạp lớn.',
        category: 'Insights khán giả',
        categorySlug: 'insights',
        readTime: '7 phút đọc',
        publishDate: '24/09/2026',
        thumbnail: 'https://homepage.momocdn.net/img/top-anime-hay-4-260907175929.jpg',
    },
    {
        id: 15,
        slug: 'tin-tuc-su-kien-dien-anh-quoc-te-2026',
        title: 'Liên hoan phim Quốc tế 2026: Điểm mặt các ứng cử viên sáng giá cho giải Oscar',
        excerpt:
            'Những tác phẩm nghệ thuật xuất sắc vừa được giới thiệu tại các liên hoan phim Venice và Toronto, mở đường cho cuộc đua tượng vàng danh giá.',
        category: 'Tin tức',
        categorySlug: 'tin-tuc',
        readTime: '9 phút đọc',
        publishDate: '23/09/2026',
        thumbnail: 'https://homepage.momocdn.net/img/spider-man-261001113328.jpg',
    },
];

/**
 * Dữ liệu chi tiết chuẩn cho bài viết Blog Phim Tình Cảm
 * Khớp chính xác với cấu trúc trang MoMo: https://www.momo.vn/cinema/blog/phim-tinh-cam-5145
 */
export const BLOG_DETAIL_PHIM_TINH_CAM = {
    id: 2,
    slug: 'top-30-tuyet-tac-phim-tinh-cam-hay',
    aliases: ['phim-tinh-cam-5145', 'phim-tinh-cam'],
    title: 'Top 30 tuyệt tác phim tình cảm hay bạn nhất định phải xem',
    sapo: 'Phim tình cảm hay nhất, cảm động nhất từ Mỹ, Hàn Quốc, Nhật Bản... Xem ngay danh sách của TianMovie để không bỏ lỡ những tuyệt tác điện ảnh này!',
    category: 'Tổng hợp phim',
    categorySlug: 'tong-hop-phim',
    publishDate: '06/10/2026',
    readTime: '14 phút đọc',
    heroBanner: 'https://homepage.momocdn.net/img/blog-phim-tinh-cam-1920x600-1791277825838-261006161026.jpg',
    badge: 'Phim tình cảm hay nhất',

    // Bảng mục lục (Table of Contents)
    toc: [
        {
            id: 'danh-sach-phim-tinh-cam',
            title: '30 phim tình cảm xúc động đáng xem cho người trưởng thành',
            level: 1,
        },
        {
            id: 'in-the-mood-for-love',
            title: '1. In the Mood for Love - Tâm Trạng Khi Yêu (2000)',
            level: 2,
        },
        {
            id: 'columbus',
            title: '2. Phim tình cảm lãng mạn - Columbus (2017)',
            level: 2,
        },
        {
            id: 'portrait-of-a-lady-on-fire',
            title: '3. Portrait of a Lady on Fire - Chân Dung Bức Họa Tình Yêu (2019)',
            level: 2,
        },
        {
            id: 'submarine',
            title: '6. Submarine - Tình Yêu Tuổi Trẻ (2010)',
            level: 2,
        },
        {
            id: 'raincoat',
            title: '7. Raincoat - Chiếc Áo Mưa (2004)',
            level: 2,
        },
        {
            id: 'a-special-day',
            title: '8. A Special Day - Một Ngày Đặc Biệt (1977)',
            level: 2,
        },
        {
            id: 'the-notebook',
            title: '27. Phim tình cảm hay nhất - The Notebook - Nhật Ký Tình Yêu (2004)',
            level: 2,
        },
        {
            id: 'love-rosie',
            title: '28. Love, Rosie - Bồng Bềnh Tình Yêu (2014)',
            level: 2,
        },
        {
            id: 'you-are-the-apple-of-my-eye',
            title: '29. You Are the Apple of My Eye - Cô Gái Năm Ấy Chúng Ta Cùng Theo Đuổi (2011)',
            level: 2,
        },
        {
            id: 'titanic',
            title: '30. Phim tình cảm nổi tiếng nhất - Titanic (1997)',
            level: 2,
        },
        {
            id: 'cau-hoi-thuong-gap',
            title: 'Câu hỏi thường gặp về phim tình cảm',
            level: 1,
        },
        {
            id: 'lich-su-dien-anh-tinh-cam',
            title: 'Phim tình cảm xuất hiện từ năm nào trong lịch sử điện ảnh?',
            level: 2,
        },
        {
            id: 'the-loai-nho-sub-genre',
            title: 'Dòng phim tình cảm gồm những thể loại nhỏ (sub-genre) phổ biến nào?',
            level: 2,
        },
        {
            id: 'nhung-quoc-gia-nao-noi-tieng-nhat-voi-dong-phim-tinh-cam',
            title: 'Những quốc gia nào nổi tiếng nhất với dòng phim tình cảm?',
            level: 2,
        },
    ],

    // Nội dung chi tiết các phim
    movies: [
        {
            id: 'in-the-mood-for-love',
            title: '1. In the Mood for Love - Tâm Trạng Khi Yêu (2000)',
            genre: 'Tình cảm, Tâm lý',
            country: 'Hồng Kông',
            ageRating: '16+',
            synopsis:
                'Lấy bối cảnh Hồng Kông thập niên 1960, Chu Mộ Văn và Tô Lệ Trân phát hiện người bạn đời của mình ngoại tình với nhau. Cùng chia sẻ nỗi đau và sự cô đơn, giữa họ dần nảy sinh một thứ tình cảm âm thầm, day dứt nhưng bị kìm nén bởi định kiến xã hội.',
            image: 'https://homepage.momocdn.net/img/blog-phim-tinh-cam-1920x600-1791277825838-261006161026.jpg',
            caption: 'Tuyệt tác của đạo diễn Vương Gia Vệ với những khung hình đậm chất thơ và hoài niệm',
        },
        {
            id: 'columbus',
            title: '2. Phim tình cảm lãng mạn - Columbus (2017)',
            genre: 'Tình cảm, Chính kịch',
            country: 'Mỹ',
            ageRating: '13+',
            synopsis:
                'Một người đàn ông gốc Hàn bị kẹt lại thành phố Columbus khi cha anh bị hôn mê, tình cờ gặp một cô gái trẻ đam mê kiến trúc nhưng mang gánh nặng gia đình. Cuộc trò chuyện giữa hai tâm hồn cô đơn mở ra những chữa lành kỳ diệu.',
            image: 'https://homepage.momocdn.net/img/phim-trung-quoc-260930151127.jpg',
            caption: 'Columbus: Sự hòa quyện tinh tế giữa kiến trúc hiện đại và những rung động sâu lắng',
        },
        {
            id: 'portrait-of-a-lady-on-fire',
            title: '3. Portrait of a Lady on Fire - Chân Dung Bức Họa Tình Yêu (2019)',
            genre: 'Tình cảm, Lịch sử, Chính kịch',
            country: 'Pháp',
            ageRating: '16+',
            synopsis:
                'Tại hòn đảo biệt lập ở Brittany thế kỷ 18, một nữ họa sĩ được thuê bí mật vẽ chân dung một quý cô sắp kết hôn. Những ngày tháng quan sát và trò chuyện làm bùng cháy một tình yêu mãnh liệt nhưng ngắn ngủi.',
            image: 'https://homepage.momocdn.net/img/top-phim-cung-dau-dang-xem-nhat1-260930133250.jpg',
            caption: 'Tác phẩm điện ảnh Pháp từng đoạt giải Kịch bản xuất sắc tại LHP Cannes',
        },
        {
            id: 'submarine',
            title: '6. Submarine - Tình Yêu Tuổi Trẻ (2010)',
            genre: 'Hài hước, Tình cảm, Tuổi mới lớn',
            country: 'Anh',
            ageRating: '16+',
            synopsis:
                'Oliver Tate, một thiếu niên 15 tuổi lập dị với hai mục tiêu lớn: cứu vãn cuộc hôn nhân đang bên bờ vực của bố mẹ và gìn giữ mối tình đầu với cô bạn cùng lớp Jordana trước khi một học sinh mới xuất hiện.',
            image: 'https://homepage.momocdn.net/img/blog-phim-the-thao-1920x600-1791365819255-261007163659.jpg',
            caption: 'Submarine mang đến câu chuyện "mới lạ", thú vị về tình yêu độ tuổi trưởng thành',
        },
        {
            id: 'raincoat',
            title: '7. Raincoat - Chiếc Áo Mưa (2004)',
            genre: 'Chính kịch, Tình cảm',
            country: 'Ấn Độ',
            ageRating: 'P',
            synopsis:
                'Manu, người đàn ông sa cơ đến Calcutta tìm gặp Neeru, người yêu cũ đã đi lấy chồng. Trú mưa cùng nhau trong một căn nhà cũ, cả hai cố vờ như mình đang sống hạnh phúc để che giấu thực cảnh khó khăn của bản thân.',
            image: 'https://homepage.momocdn.net/img/phim-ngon-tinh-1-260907153846.jpg',
            caption: 'Câu chuyện tình cảm giản dị mà xúc động lòng người của điện ảnh Ấn Độ',
        },
        {
            id: 'a-special-day',
            title: '8. A Special Day - Một Ngày Đặc Biệt (1977)',
            genre: 'Chính kịch, Tình cảm',
            country: 'Ý',
            ageRating: '13+',
            synopsis:
                'Vào ngày thành phố Roma rộn rã diễu hành năm 1938, Antonietta, người nội trợ kiệt sức vì gia đình gặp gỡ Gabriele, người dẫn chương trình cô đơn bị gạt ra bên lề xã hội. Giữa họ phát triển một mối tình cảm đặc biệt sưởi ấm trái tim.',
            image: 'https://homepage.momocdn.net/img/top-anime-hay-4-260907175929.jpg',
            caption: 'Kiệt tác kinh điển của điện ảnh Ý với diễn xuất đỉnh cao của Sophia Loren và Marcello Mastroianni',
        },
        {
            id: 'the-notebook',
            title: '27. Phim tình cảm hay nhất - The Notebook - Nhật Ký Tình Yêu (2004)',
            genre: 'Tình cảm, Tâm lý',
            country: 'Mỹ',
            ageRating: '16+',
            synopsis:
                'Câu chuyện tình mãnh liệt nhưng nhiều biến cố giữa Noah, một anh thợ mộc nghèo, và Allie, cô tiểu thư nhà giàu miền Nam vào thập niên 1940. Dù bị chia cắt bởi khoảng cách địa vị và chiến tranh, tình yêu của họ vẫn sống mãi qua từng trang nhật ký.',
            image: 'https://homepage.momocdn.net/img/phim-hai-260930175236.jpg',
            caption: 'Tượng đài phim tình cảm lãng mạn Hollywood khiến bao thế hệ khán giả rơi nước mắt',
        },
        {
            id: 'love-rosie',
            title: '28. Love, Rosie - Bồng Bềnh Tình Yêu (2014)',
            genre: 'Tình cảm, Tâm lý, Hài hước',
            country: 'Anh, Đức',
            ageRating: '16+',
            synopsis:
                'Rosie và Alex là đôi bạn thân từ nhỏ cùng chia sẻ mọi ước mơ. Những hiểu lầm, biến cố tuổi trẻ và khoảng cách địa lý liên tục đẩy họ ra xa nhau trong suốt nhiều năm, khiến cả hai liên tục lỡ hẹn với tình cảm thực sự dành cho nhau.',
            image: 'https://homepage.momocdn.net/img/spider-man-261001113328.jpg',
            caption: 'Mối tình "đúng người nhưng sai thời điểm" được chuyển thể từ tiểu thuyết Where Rainbows End',
        },
        {
            id: 'you-are-the-apple-of-my-eye',
            title: '29. You Are the Apple of My Eye - Cô Gái Năm Ấy Chúng Ta Cùng Theo Đuổi (2011)',
            genre: 'Tình cảm, Thanh xuân, Tâm lý',
            country: 'Đài Loan',
            ageRating: '16+',
            synopsis:
                'Kha Cảnh Đằng, cậu học sinh ngỗ ngược, cùng nhóm bạn thân ngây ngô đều đem lòng thầm yêu Thẩm Giai Nghi – cô nữ sinh xinh đẹp và học giỏi nhất lớp. Những kỷ niệm ngốc nghếch nhưng chân thành tuổi học trò đã trở thành ký ức thanh xuân đẹp nhất của họ.',
            image: 'https://homepage.momocdn.net/img/phim-trung-quoc-260930151127.jpg',
            caption: 'You Are The Apple Of My Eye chuyển thể từ tiểu thuyết cùng tên của tác giả Cửu Bả Đao',
        },
        {
            id: 'titanic',
            title: '30. Phim tình cảm nổi tiếng nhất - Titanic (1997)',
            genre: 'Tình cảm, Tâm lý, Lịch sử',
            country: 'Mỹ',
            ageRating: '16+',
            synopsis:
                'Chuyến hải trình định mệnh trên con tàu Titanic đã tác hợp cho Jack, chàng họa sĩ nghèo tự do, và Rose, cô tiểu thư thuộc giới quý tộc đang bị ép buộc kết hôn. Tình yêu chớp nở mãnh liệt của họ phải đối mặt với thảm họa chìm tàu thảm khốc.',
            image: 'https://homepage.momocdn.net/img/top-phim-cung-dau-dang-xem-nhat1-260930133250.jpg',
            caption: 'Tuyệt tác của James Cameron giữ kỷ lục 11 giải Oscar và doanh thu phòng vé huyền thoại',
        },
    ],

    // Câu hỏi thường gặp FAQ
    faqs: [
        {
            id: 'lich-su-dien-anh-tinh-cam',
            question: 'Phim tình cảm xuất hiện từ năm nào trong lịch sử điện ảnh?',
            answer:
                'Phim tình cảm đã xuất hiện từ những ngày đầu của điện ảnh câm cuối thế kỷ 19. Tác phẩm The Kiss (1896) dài vỏn vẹn 18 giây được coi là thước phim tình cảm đầu tiên trên màn ảnh. Đến thập niên 1920–1930, các bộ phim tình cảm câm và phim nói đời đầu bắt đầu phát triển mạnh mẽ, đặt nền móng cho thể loại lãng mạn kinh điển về sau.',
        },
        {
            id: 'the-loai-nho-sub-genre',
            question: 'Dòng phim tình cảm gồm những thể loại nhỏ (sub-genre) phổ biến nào?',
            items: [
                {
                    term: 'Romantic Comedy (Rom-Com):',
                    desc: 'Phim tình cảm hài hước, nhẹ nhàng, mang lại cảm giác dễ chịu và tích cực.',
                },
                {
                    term: 'Romantic Drama:',
                    desc: 'Phim tình cảm tâm lý/chính kịch, tập trung vào mâu thuẫn, thử thách và cảm xúc sâu sắc.',
                },
                {
                    term: 'Teen Romance:',
                    desc: 'Phim tình cảm tuổi mới lớn / thanh xuân vườn trường giàu nhiệt huyết và hoài niệm.',
                },
                {
                    term: 'Historical / Period Romance:',
                    desc: 'Phim tình cảm lãng mạn lấy bối cảnh lịch sử hoặc cổ điển trang nhã.',
                },
                {
                    term: 'Sci-Fi / Fantasy Romance:',
                    desc: 'Phim tình cảm có yếu tố viễn tưởng hoặc xuyên không, du hành thời gian.',
                },
            ],
        },
        {
            id: 'nhung-quoc-gia-nao-noi-tieng-nhat-voi-dong-phim-tinh-cam',
            question: 'Những quốc gia nào nổi tiếng nhất với dòng phim tình cảm?',
            items: [
                {
                    term: 'Mỹ (Hollywood):',
                    desc: 'Nổi tiếng với các tượng đài lãng mạn kinh điển (Titanic, The Notebook, La La Land) và các phim Rom-Com hiện đại duyên dáng.',
                },
                {
                    term: 'Hàn Quốc:',
                    desc: 'Bậc thầy trong việc khai thác tâm lý lãng mạn, nhân duyên, cảm xúc dịu dàng và hoài niệm (Past Lives, A Man and a Woman, Be With You).',
                },
                {
                    term: 'Pháp:',
                    desc: 'Nổi tiếng với phong cách điện ảnh lãng mạn triết lý, tự do, giàu chất thơ và đậm tính nghệ thuật (Portrait of a Lady on Fire, The Green Ray).',
                },
                {
                    term: 'Đài Loan & Nhật Bản:',
                    desc: 'Đứng đầu về dòng phim tình cảm thanh xuân, mang màu sắc trong trẻo, hoài niệm và nhiều cảm xúc đắng ngọt (Cô Gái Năm Ấy Chúng Ta Cùng Theo Đuổi, 18x2 Beyond Youthful Days).',
                },
                {
                    term: 'Hồng Kông:',
                    desc: 'Nổi tiếng với dòng phim lãng mạn đô thị mang màu sắc hoài cổ, cô đơn và chất thơ riêng biệt qua bàn tay đạo diễn Vương Gia Vệ (In the Mood for Love, Chungking Express).',
                },
            ],
        },
    ],

    tags: ['#Tổng hợp phim', '#Phim tình cảm', '#Điện ảnh lãng mạn', '#Top phim hay'],

    author: {
        name: 'Ban Biên Tập TianMovie',
        role: 'VỀ TÁC GIẢ',
        avatar: 'https://homepage.momocdn.net/fileuploads/svg/momo-file-240411162904.svg',
        bio: 'Đội Ngũ TianMovie quy tụ các chuyên gia điện ảnh, biên tập viên và nhà nghiên cứu nội dung giàu kinh nghiệm, tận tâm mang đến những thông tin, tin tức và hướng dẫn toàn diện, dễ hiểu về thế giới điện ảnh.',
    },
};

export const getBlogPageMeta = () => BLOG_PAGE_META;
export const getBlogCategories = () => BLOG_CATEGORIES;
export const getAllBlogPosts = () => BLOG_POSTS;

export const getBlogPostsByCategory = (categorySlug) => {
    if (!categorySlug || categorySlug === 'all') {
        return BLOG_POSTS;
    }
    return BLOG_POSTS.filter((post) => post.categorySlug === categorySlug);
};

/**
 * Lấy chi tiết bài viết theo slug hoặc ID
 * Nếu là bài phim tình cảm: trả về bài viết chi tiết đầy đủ 30 phim & FAQ anchor
 * Nếu là bài khác: tự động tạo cấu trúc chi tiết chuẩn từ bài viết đó
 */
export const getBlogDetailBySlug = (slug) => {
    if (!slug) return BLOG_DETAIL_PHIM_TINH_CAM;

    const normalizedSlug = String(slug).toLowerCase().trim();

    // Khớp bài viết Phim Tình Cảm
    if (
        normalizedSlug === BLOG_DETAIL_PHIM_TINH_CAM.slug ||
        BLOG_DETAIL_PHIM_TINH_CAM.aliases.includes(normalizedSlug) ||
        normalizedSlug === '2'
    ) {
        return BLOG_DETAIL_PHIM_TINH_CAM;
    }

    // Tìm bài viết trong danh sách BLOG_POSTS
    const foundPost = BLOG_POSTS.find(
        (p) => p.slug === normalizedSlug || String(p.id) === normalizedSlug
    );

    if (foundPost) {
        return {
            ...foundPost,
            heroBanner: foundPost.thumbnail,
            sapo: foundPost.excerpt,
            toc: [
                { id: 'gioi-thieu', title: '1. Giới thiệu tổng quan', level: 1 },
                { id: 'noi-dung-noi-bat', title: '2. Các nội dung nổi bật', level: 1 },
                { id: 'cau-hoi-thuong-gap', title: '3. Câu hỏi thường gặp', level: 1 },
            ],
            movies: [
                {
                    id: 'gioi-thieu',
                    title: '1. Giới thiệu tổng quan',
                    genre: foundPost.category,
                    country: 'Quốc tế',
                    ageRating: 'P',
                    synopsis: foundPost.excerpt,
                    image: foundPost.thumbnail,
                    caption: foundPost.title,
                },
                {
                    id: 'noi-dung-noi-bat',
                    title: '2. Các nội dung nổi bật',
                    genre: foundPost.category,
                    country: 'Toàn cầu',
                    ageRating: '13+',
                    synopsis:
                        'Bài viết phân tích chuyên sâu về các khía cạnh nghệ thuật, kỹ xảo, diễn xuất và thông điệp mà tác phẩm muốn gửi gắm tới đông đảo khán giả.',
                    image: foundPost.thumbnail,
                    caption: 'Hình ảnh trích đoạn nổi bật từ tác phẩm',
                },
            ],
            faqs: [
                {
                    id: 'cau-hoi-thuong-gap',
                    question: 'Làm thế nào để đón xem tác phẩm này với chất lượng tốt nhất?',
                    answer:
                        'Bạn có thể dễ dàng kiểm tra lịch chiếu và đặt vé trực tiếp tại các cụm rạp CGV, Lotte Cinema, Galaxy Cinema, BHD Star ngay trên nền tảng TianMovie.',
                },
            ],
            tags: [`#${foundPost.category}`, '#TianMovie', '#Điện ảnh 2026'],
            author: BLOG_DETAIL_PHIM_TINH_CAM.author,
        };
    }

    // Mặc định trả về bài phim tình cảm nếu không tìm thấy
    return BLOG_DETAIL_PHIM_TINH_CAM;
};

/**
 * Lấy danh sách các bài viết liên quan (loại trừ bài hiện tại)
 */
export const getRelatedPosts = (currentSlug, limit = 3) => {
    return BLOG_POSTS.filter((post) => post.slug !== currentSlug).slice(0, limit);
};

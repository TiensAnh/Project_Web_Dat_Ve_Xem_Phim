
// hàm lấy danh sách phim từ api 
export async function getMovies() {
    // 3 ngoại lệ lỗi mạng, 404 505 , dữ liệu không phải json
        const response = await fetch("/api/movies")
        if(!response.ok){   
            throw new Error(`Sever báo lỗi: ${response.status}`)
        }
        const data = await response.json()
        return data;
}

// Api lấy danh sách thể loại từ api 

export async function getGenres() {
    const response = await fetch("/api/genres")
    if(!response.ok){
        throw new Error(`Server báo lỗi: ${response.status}`)
    }
    const data = await response.json();
    return data
}
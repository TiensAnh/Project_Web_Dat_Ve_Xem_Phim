import { CINEMAS_DATA } from '../../data/cinemasData.js'

const cinemaNames = new Map(CINEMAS_DATA.map(({ id, name }) => [id, name]))

// Phòng mẫu dùng chung cho danh sách phòng, sơ đồ ghế và lịch chiếu.
const MOCK_ROOMS = [
  { id: 'P01', cinemaId: 1, name: 'Phòng 1', rowCount: 8, seatCount: 96 },
  { id: 'P02', cinemaId: 1, name: 'Phòng 2', rowCount: 10, seatCount: 120 },
  { id: 'P03', cinemaId: 1, name: 'Phòng 3', rowCount: 6, seatCount: 48 },
  { id: 'P04', cinemaId: 2, name: 'Phòng 1', rowCount: 9, seatCount: 108 },
  { id: 'P05', cinemaId: 2, name: 'Phòng 2', rowCount: 8, seatCount: 80 },
  { id: 'P06', cinemaId: 2, name: 'Phòng 3', rowCount: 6, seatCount: 60 },
  { id: 'P07', cinemaId: 3, name: 'Phòng 1', rowCount: 10, seatCount: 140 },
  { id: 'P08', cinemaId: 3, name: 'Phòng 2', rowCount: 7, seatCount: 70 },
  { id: 'P09', cinemaId: 3, name: 'Phòng 3', rowCount: 8, seatCount: 88 },
]

export const ROOMS = MOCK_ROOMS.map(room => ({ ...room, cinemaName: cinemaNames.get(room.cinemaId) }))

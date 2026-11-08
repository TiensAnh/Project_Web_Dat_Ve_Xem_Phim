import AdminList from '../../components/common/AdminList/AdminList.jsx'

const USER_COLUMNS = [
  { key: 'id', label: 'Mã người dùng', rowHeader: true },
  { key: 'name', label: 'Họ và tên' },
  { key: 'email', label: 'Email', truncate: true },
  { key: 'role', label: 'Vai trò' },
  { key: 'status', label: 'Trạng thái' },
]

// Dữ liệu mẫu dùng để xem bố cục trang Người dùng.
const MOCK_USERS = [
  {
    id: 'ND-001', name: 'Nguyễn Thu Hà', email: 'thuha@example.com',
    role: 'Quản trị viên', status: 'Hoạt động',
  },
  {
    id: 'ND-002', name: 'Trần Minh Anh', email: 'minhanh@example.com',
    role: 'Khách hàng', status: 'Hoạt động',
  },
  {
    id: 'ND-003', name: 'Lê Gia Bảo', email: 'giabao@example.com',
    role: 'Khách hàng', status: 'Đã khóa',
  },
  {
    id: 'ND-004', name: 'Vũ Ngọc Linh', email: 'ngoclinh@example.com',
    role: 'Khách hàng', status: 'Hoạt động',
  },
  {
    id: 'ND-005', name: 'Vũ Ngọc Linh', email: 'ngoclinh@example.com',
    role: 'Khách hàng', status: 'Hoạt động',
  },
  {
    id: 'ND-006', name: 'Vũ Ngọc Linh', email: 'ngoclinh@example.com',
    role: 'Khách hàng', status: 'Hoạt động',
  },
  {
    id: 'ND-007', name: 'Vũ Ngọc Linh', email: 'ngoclinh@example.com',
    role: 'Khách hàng', status: 'Hoạt động',
  },
]

export default function Users() {
  return <AdminList title="Danh sách người dùng" columns={USER_COLUMNS} rows={MOCK_USERS} />
}

import { BLOG_POSTS } from '../../../data/blogData.js'
import AdminList from '../../components/common/AdminList/AdminList.jsx'

const BLOG_COLUMNS = [
  { key: 'id', label: 'Mã bài', rowHeader: true },
  { key: 'title', label: 'Tiêu đề', truncate: true },
  { key: 'category', label: 'Chuyên mục' },
  { key: 'publishDate', label: 'Ngày đăng' },
]

export default function Blog() {
  return <AdminList title="Danh sách bài viết" columns={BLOG_COLUMNS} rows={BLOG_POSTS} />
}

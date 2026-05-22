import { Layout } from "antd"
import AdminSidebar from "@/components/layout/admin.sidebar"
import AdminHeader from "@/components/layout/admin.header"
import AdminContent from "@/components/layout/admin.content"
import AdminFooter from "@/components/layout/admin.footer"

// tham số { children }: Readonly<{ children: React.ReactNode }> có thể hiểu đơn giản là một đối tượng có một thuộc tính duy nhất là children, và thuộc tính này có kiểu dữ liệu là React.ReactNode. Readonly được sử dụng để đảm bảo rằng đối tượng này không thể bị thay đổi sau khi được tạo ra. Điều này giúp tăng tính an toàn và tránh lỗi khi làm việc với các thành phần React.
const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <Layout>
            <AdminSidebar />
            <Layout>
                <AdminHeader />
                <AdminContent>{children}</AdminContent>
                <AdminFooter />
            </Layout>
        </Layout>
    )
}

export default AdminLayout

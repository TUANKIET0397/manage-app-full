import AdminContent from "@/components/layout/admin.content"
import AdminFooter from "@/components/layout/admin.footer"
import AdminHeader from "@/components/layout/admin.header"
import AdminSideBar from "@/components/layout/admin.sidebar"
import { AdminContextProvider } from "@/library/admin.context"
import { auth } from "@/auth"

const AdminLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    // phía server mình có thể gọi trực tiếp auth để lấy session mà không cần phải thông qua proxy
    // , vì proxy chỉ dùng để xử lý các request đến server từ phía client thôi
    // chỉ cần bọc
    const session = await auth()
    return (
        <AdminContextProvider>
            <div style={{ display: "flex" }}>
                <div className="left-side" style={{ minWidth: 80 }}>
                    <AdminSideBar />
                </div>
                <div className="right-side" style={{ flex: 1 }}>
                    <AdminHeader session={session} />
                    <AdminContent>{children}</AdminContent>
                    <AdminFooter />
                </div>
            </div>
        </AdminContextProvider>
    )
}

export default AdminLayout

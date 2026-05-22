"use client"

import { Layout } from "antd"
const AdminContent = ({ children }: { children: React.ReactNode }) => {
    const { Content } = Layout
    return (
        <Content
            style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: "#ccc",
                borderRadius: "#ccc",
            }}
        >
            {children}
        </Content>
    )
}

export default AdminContent

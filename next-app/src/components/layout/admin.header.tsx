"use client"

import { useState } from "react"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Layout, theme, Button } from "antd"

const AdminHeader = () => {
    const [collapsed, setCollapsed] = useState(false)
    const { Header } = Layout
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()
    return (
        <>
            <Header style={{ padding: 0, background: "#ccc" }}>
                <Button
                    type="text"
                    icon={
                        collapsed ? (
                            <MenuUnfoldOutlined />
                        ) : (
                            <MenuFoldOutlined />
                        )
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: "16px",
                        width: 64,
                        height: 64,
                    }}
                />
            </Header>
        </>
    )
}

export default AdminHeader

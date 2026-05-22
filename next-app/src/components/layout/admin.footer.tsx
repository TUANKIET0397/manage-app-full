"use client"

import { Layout } from "antd"

const AdminFooter = () => {
    const { Footer } = Layout
    return (
        <>
            <Footer style={{ textAlign: "center" }}>
                TuanKietCoder ©{new Date().getFullYear()} Created with
                @TuanKietCoder Design
            </Footer>
        </>
    )
}

export default AdminFooter

export { auth as proxy } from "@/auth"
// proxy là một alias để truy cập các chức năng của auth mà không cần phải import trực tiếp
// từ "@/auth" trong các file khác. Điều này giúp giảm sự phụ thuộc và làm cho mã nguồn dễ bảo trì hơn.
export const config = {
    matcher: [
        // "/((?!api|_next/static|_next/image|favicon.ico).*)"
        "/((?!api|_next/static|_next/image|favicon.ico|auth|verify|$).*)",
    ],
}

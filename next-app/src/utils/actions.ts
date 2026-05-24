"use server"
import { signIn } from "@/auth"

export async function authenticate(username: string, password: string) {
    try {
        const r = await signIn("credentials", {
            username: username,
            password: password,
            // callbackUrl: "/",
            redirect: false,
        })
        console.log(">>> check res in server: ", r)
        return r
    } catch (error) {
        // name được lấy từ class error mà mình đã custom trong src/utils/errors.ts
        if ((error as any).name === "InvalidEmailPasswordError") {
            return {
                error: (error as any).type,
                code: 1, //ở frontend mình sẽ check code để hiển thị message tương ứng, tránh việc phải check nhiều loại error khác nhau
            }
        } else if ((error as any).name === "InactiveAccountError") {
            return {
                error: (error as any).type,
                code: 2,
            }
        } else {
            return {
                error: "Internal server error",
                code: 0,
            }
        }
    }
}

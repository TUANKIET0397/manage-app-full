import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { InvalidEmailPasswordError } from "./utils/errors"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        // Cấu hình các provider ở đây, ví dụ:
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // }),
        // Bạn có thể thêm các provider khác như Facebook, GitHub, v.v.
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null

                //logic to verify if the user exists
                //call backend
                // user = {
                //     _id: "123",
                //     username: "john_doe",
                //     email: "john.doe@example.com",
                //     isVerify: true,
                //     type: "user",
                //     role: "admin",
                // }

                if (!user) {
                    throw new InvalidEmailPasswordError() //out put sẽ là một object có name = "InvalidEmailPasswordError" và type = "Email/Password không hợp lệ"
                    // return Promise.reject(new Error(" CUSTOMER MESSAGE "))
                    // tính chất của throw là nó bắt buộc phải được bắt bởi một catch nào đó, nếu không nó sẽ làm crash ứng dụng,
                    //  còn return thì nó chỉ trả về một giá trị nào đó mà không bắt buộc phải được bắt bởi một catch nào đó, nếu không được bắt thì nó sẽ trả về giá trị đó cho caller mà
                }

                // return user object with their profile data
                return user
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
})

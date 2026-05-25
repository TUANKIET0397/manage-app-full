import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { InactiveAccountError, InvalidEmailPasswordError } from "./utils/errors"
import { sendRequest } from "./utils/api"
import { IUser } from "./types/next-auth"

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
                username: {},
                password: {},
            },
            authorize: async (credentials) => {
                const res = await sendRequest<IBackendRes<ILogin>>({
                    method: "POST",
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
                    body: {
                        username: credentials.username,
                        password: credentials.password,
                    },
                })
                console.log(">>> check res: ", res)

                if (+res.statusCode === 201) {
                    return {
                        _id: res.data?.user?._id,
                        email: res.data?.user?.email,
                        name: res.data?.user?.name,
                        access_token: res.data?.access_token,
                    }
                }

                //sai mat khau 401
                else if (+res.statusCode === 401) {
                    throw new InvalidEmailPasswordError()
                }

                //tai khoan chua kich hoat 400
                else if (+res.statusCode === 400) {
                    throw new InactiveAccountError()
                } else {
                    throw new Error("Internal server error")
                }

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

                // if (!user) {
                //     throw new InvalidEmailPasswordError() //out put sẽ là một object có name = "InvalidEmailPasswordError" và type = "Email/Password không hợp lệ"
                //     // return Promise.reject(new Error(" CUSTOMER MESSAGE "))
                //     // tính chất của throw là nó bắt buộc phải được bắt bởi một catch nào đó, nếu không nó sẽ làm crash ứng dụng,
                //     //  còn return thì nó chỉ trả về một giá trị nào đó mà không bắt buộc phải được bắt bởi một catch nào đó, nếu không được bắt thì nó sẽ trả về giá trị đó cho caller mà
                // }

                // return user object with their profile data
                // return user
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                // User is available during sign-in
                token.user = user as IUser
            }
            return token
        },
        session({ session, token }) {
            ;(session.user as IUser) = token.user
            return session
        },

        authorized: async ({ auth }) => {
            // Logged in users are authenticated,
            //otherwise redirect to login page
            return !!auth
        },
    },
})

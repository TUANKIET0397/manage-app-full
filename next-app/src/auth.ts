import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

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
                user = {
                    _id: "123",
                    username: "john_doe",
                    email: "john.doe@example.com",
                    isVerify: true,
                    type: "user",
                    role: "admin",
                }

                if (!user) {
                    // No user found, so this is their first attempt to login
                    // Optionally, this is also the place you could do a user registration
                    throw new Error("Invalid credentials.")
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

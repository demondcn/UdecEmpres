import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import db from '@/libs/db'
import bcrypt from 'bcrypt'

const adminEmail = "oagudelod@ucundinamarca.edu.co";
const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Passwoord", type: "password" }
            },
            async authorize(credentials, req) {

                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!userFound) throw new Error('No user found')


                const matchPassword = await bcrypt.compare(credentials.password, userFound.password)
                if (!matchPassword) throw new Error('Wrong password')


                return {
                    id: userFound.id,
                    name: userFound.name.username,
                    email: userFound.email,
                }
            },
        }),
    ],
    pages:{
        signIn: "/"
    },
    callbacks: {
        async jwt({ token, user }) {
            // Añadir el id del usuario al token JWT
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            // Añadir el id del usuario a la sesión
            session.user.id = token.id;
            session.user.isAdmin = token.email === adminEmail;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
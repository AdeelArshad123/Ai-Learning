import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || 'demo',
      clientSecret: process.env.GITHUB_SECRET || 'demo',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'demo',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'demo',
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, token }) {
      return session
    },
    async jwt({ token, user }) {
      return token
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
import NextAuth, { Session, User } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../lib/prismadb'
import _log from '~/components/log'
import { AdapterUser } from 'next-auth/adapters'
import { JWT } from 'next-auth/jwt'

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID || '',
			clientSecret: process.env.DISCORD_CLIENT_SECRET || ''
		})
	],
	callbacks: {
		async session({
			session,
			user,
			token
		}: {
			session: Session
			user: User | AdapterUser
			token: JWT
		}) {
			session.isAdmin = user.isAdmin
			return session
		}
	}
}

export default NextAuth(authOptions)

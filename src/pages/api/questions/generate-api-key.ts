import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import prisma from '../../../lib/prismadb'
import { User } from 'next-auth'

export interface GenerateApiKeyResponse {
	token: string
}

export interface GenerateApiKeyError {
	error: string
}

interface GenerateApiKeyNextApiRequest extends NextApiRequest {
	body: {
		userId: string
	}
}

export default async function handler(
	req: GenerateApiKeyNextApiRequest,
	res: NextApiResponse<GenerateApiKeyResponse | GenerateApiKeyError>
) {
	const getUsers = async () => {
		const { userId } = req.body

		if (!userId) {
			return res.status(500).json({ error: 'no user id supplied' })
		}

		if (!process.env.JWT_SECRET) {
			return res.status(500).json({ error: 'no JWT_SECRET in .env file' })
		}

		try {
			const user = await prisma.user.findUnique({ where: { id: userId } })

			if (!user) {
				return res.status(500).json({ error: 'invalid user id' })
			}

			const token = jwt.sign({ user: userId }, process.env.JWT_SECRET, {
				expiresIn: '90d'
			})

			await prisma.user.update({
				where: { id: userId },
				data: { token }
			})

			res.status(200).json({ token })
		} catch (error: any) {
			res.status(500).json({ error: 'database communication error' + error.message })
		}
	}

	switch (req.method) {
		case 'GET':
			getUsers()
			break

		default:
			res.status(500).json({ error: 'HTTP Method not allowed.' })
			break
	}
}

// Path: src/pages/api/questions/generate-api-key.ts
// Created at: 02:12:16 - 13/03/2023
// Language: Typescript
// Framework: React/Next.js

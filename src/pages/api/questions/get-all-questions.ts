import { Question } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { User } from 'next-auth'
import prisma from '../../../lib/prismadb'

export interface GetAllQuestionsResponse {
	questions?: Question[]
	message?: string
}

export interface GetAllQuestionsError {
	error: string
}

interface GetAllQuestionsNextApiRequest extends NextApiRequest {
	body: {}
}

export default async function handler(
	req: GetAllQuestionsNextApiRequest,
	res: NextApiResponse<GetAllQuestionsResponse | GetAllQuestionsError>
) {
	const token = req.headers.authorization?.split(' ')[1]

	if (!token) {
		return res.status(405).json({
			message: 'invalid authorization header'
		})
	}

	if (!process.env.JWT_SECRET) {
		return res.status(500).json({ error: 'no JWT_SECRET in .env file' })
	}

	const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

	if (!decodedToken) {
		return res.status(500).json({ error: 'invalid token' })
	}

	const getQuestions = async () => {
		try {
			const user = await prisma.user.findUnique({ where: { token } })

			if (!user) {
				return res.status(405).json({
					message: 'invalid token'
				})
			}

			if (user.credits < 10) {
				console.warn('free credits running low. please upgrade your subscription.')
			}

			if (user.credits === 0) {
				return res.status(405).json({
					message: 'you have no free credits left. please upgrade your subscription.'
				})
			}

			await prisma.user.update({
				where: { id: user.id },
				data: {
					credits: user.credits - 1
				}
			})

			const questions = await prisma.question.findMany({ take: 10 })

			res.status(200).json({ questions })
		} catch (error) {
			res.status(500).json({ error: 'error communicating with the database' })
		}
	}

	switch (req.method) {
		case 'GET':
			getQuestions()
			break

		default:
			res.status(500).json({ error: 'HTTP Method not allowed' })
			break
	}
}

// Path: src/pages/api/questions/get-all-questions.ts
// Created at: 19:04:58 - 15/03/2023
// Language: Typescript
// Framework: React/Next.js

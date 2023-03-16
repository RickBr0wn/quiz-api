// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Answer, Question } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import _log from '~/components/log'
import prisma from '../../../lib/prismadb'
import jwt from 'jsonwebtoken'

type _Response = {
	message?: string
	error?: string
	question?: Question
}

interface _NextApiRequest extends NextApiRequest {
	body: {
		question: string
		answer: string
		incorrect_answers: string[]
	}
}

export default async function handler(req: _NextApiRequest, res: NextApiResponse<_Response>) {
	const addNewQuestion = async () => {
		const { question: text, answer, incorrect_answers } = req.body
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

		try {
			const user = await prisma.user.findUnique({ where: { token } })

			if (!user) {
				return res.status(405).json({
					message: 'invalid token'
				})
			}

			if (!user.isAdmin) {
				return res.status(405).json({
					message: 'you are not logged in as an adminstrator'
				})
			}
		} catch (error) {
			return res.status(405).json({
				message: 'error communicating with the database'
			})
		}

		let answers = [{ text: answer, correct: true }]

		if (incorrect_answers.length != 3) {
			return res.status(405).json({
				message: 'The amount of incorrect answers supplied MUST be 3.'
			})
		}

		incorrect_answers.forEach(text => answers.push({ text, correct: false }))

		try {
			const q = await prisma.question.create({
				include: {
					answers: true
				},
				data: {
					text,
					answers: {
						create: answers
					}
				}
			})

			return res.status(200).json({
				message: 'Question added successfully!',
				question: q
			})
		} catch (error) {
			res.status(500).json({
				message: `There has been an error: ${error}`
			})
		}
	}

	switch (req.method) {
		case 'POST':
			addNewQuestion()
			break
		default:
			res.status(500).json({
				message: `HTTP Method not allowed`
			})
			break
	}
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Answer, Question } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prismadb'

type _Response = {
	message: string
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
	if (req.method !== 'POST') {
		return res.status(405).json({
			message: 'Method not allowed.'
		})
	}

	const { question: text, answer, incorrect_answers } = req.body

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

		res.status(200).json({
			message: 'Question added successfully!',
			question: q
		})
	} catch (error) {
		res.status(200).json({
			message: `There has been an error: ${error}`
		})
	}
}

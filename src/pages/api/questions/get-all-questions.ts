// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Question } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prismadb'

type Data = {
	questions: Question[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const questions = await prisma.question.findMany()

	res.status(200).json({ questions })
}

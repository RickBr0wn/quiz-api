import { Question } from '@prisma/client'
import { Dispatch, SetStateAction } from 'react'
import _log from '~/components/log'

export const addNewQuestion = async (
	question: string,
	answer: { text: string; correct: boolean },
	incorrect_answers: { text: string; correct: boolean }[],
	stateSetter?: Dispatch<SetStateAction<Question[]>>
) => {
	try {
		const response = await fetch('/api/questions/add-question', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				question,
				answer,
				incorrect_answers
			})
		})

		const data = await response.json()
		const newQuestion: Question = data.question

		if (stateSetter) {
			stateSetter((prev: Question[]) => [...prev, newQuestion])
			return newQuestion
		}
	} catch (error) {
		_log(error, 'ERROR', 'red')
	}
}

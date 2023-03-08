import { Box, Button, Flex, FormLabel, Heading, Input, Text } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { Question } from '@prisma/client'
import { GetStaticProps } from 'next'
import { useSession } from 'next-auth/react'

import AuthButton from '~/components/auth-button'
import _log from '~/components/log'
import prisma from '../lib/prismadb'
import { addNewQuestion } from '~/helpers/addNewQuestion'

type HomeProps = {
	questions: Question[]
}

export default function Home({ questions }: HomeProps): JSX.Element {
	const { data: session } = useSession()
	const [questionState, setQuestionState] = useState(questions)

	const question = useRef<HTMLInputElement>(null)
	const answer = useRef<HTMLInputElement>(null)
	const incorrectOne = useRef<HTMLInputElement>(null)
	const incorrectTwo = useRef<HTMLInputElement>(null)
	const incorrectThree = useRef<HTMLInputElement>(null)

	if (!questions || !questionState) {
		return <h1>Loading..</h1>
	}

	const isValidInput = (input: string | undefined): boolean => {
		return typeof input === 'string' && input.length > 3 && input.length < 50
	}

	const isValidQuestion = () => (
		isValidInput(question.current?.value),
		isValidInput(answer.current?.value),
		isValidInput(incorrectOne.current?.value),
		isValidInput(incorrectTwo.current?.value),
		isValidInput(incorrectThree.current?.value)
	)

	const resetFields = () => {
		if (question.current?.value) {
			question.current.value = ''
		}
		if (answer.current?.value) {
			answer.current.value = ''
		}
		if (incorrectOne.current?.value) {
			incorrectOne.current.value = ''
		}
		if (incorrectTwo.current?.value) {
			incorrectTwo.current.value = ''
		}
		if (incorrectThree.current?.value) {
			incorrectThree.current.value = ''
		}
	}

	const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (isValidQuestion()) {
			await addNewQuestion(
				question.current?.value || '',
				answer.current?.value || '',
				[
					incorrectOne.current?.value || '',
					incorrectTwo.current?.value || '',
					incorrectThree.current?.value || ''
				],
				setQuestionState
			)
			resetFields()
		}
	}

	_log(questionState, 'questionState', 'blue')

	return (
		<Flex h='100vh' justify='center' flexDir='column'>
			<Heading>set up</Heading>
			{session?.user ? <Text>Signed in as {session.user.email}</Text> : <Text>Not signed in</Text>}
			<Flex justify='space-between' p={6} gap={2}>
				<AuthButton />
				<form onSubmit={handleClick}>
					<Flex flexDir='column' w={'100%'} gap={2}>
						<Input ref={question} placeholder='question' />
						<Input ref={answer} placeholder='correct answer' />
						<FormLabel pt={4}>Incorrect Answers</FormLabel>
						<Input ref={incorrectOne} placeholder='incorrect answer' />
						<Input ref={incorrectTwo} placeholder='incorrect answer' />
						<Input ref={incorrectThree} placeholder='incorrect answer' mb={4} />

						<Button type='submit'>add dummy question</Button>
					</Flex>
				</form>
			</Flex>
			{questionState.map(question => (
				<Flex key={question.id} gap={2}>
					<Text>{question.text}</Text>
					{question?.answers.map(answer => (
						<Flex key={answer.id}>
							<Text color={answer.correct ? 'green.300' : 'inherit'}>{answer.text}</Text>
						</Flex>
					))}
				</Flex>
			))}
		</Flex>
	)
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const questions = await prisma.question.findMany({
		include: {
			answers: true
		}
	})

	return {
		props: {
			questions: JSON.parse(JSON.stringify(questions))
		}
	}
}

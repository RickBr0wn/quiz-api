import { Flex, Heading, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { Question } from '@prisma/client'
import { GetStaticProps } from 'next'
import { useSession } from 'next-auth/react'
import AddButton from '~/components/add-button'
import AuthButton from '~/components/auth-button'
import _log from '~/components/log'
import prisma from '../lib/prismadb'

type HomeProps = {
	questions: Question[]
}

export default function Home({ questions }: HomeProps): JSX.Element {
	const { data: session } = useSession()
	const [questionState, setQuestionState] = useState(questions)

	_log(session)

	return (
		<Flex h='100vh' justify='center' flexDir='column'>
			<Heading>set up</Heading>
			{session?.user ? <Text>Signed in as {session.user.email}</Text> : <Text>Not signed in</Text>}
			<Flex justify='space-between' p={6}>
				<AuthButton />
				<AddButton />
			</Flex>
			{questionState.map(question => (
				<Flex key={question.id} gap={2}>
					<Text>{question.text}</Text>
					{question.answers.map(answer => (
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
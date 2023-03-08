import {
	TableContainer,
	Table,
	TableCaption,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Flex,
	Tfoot,
	Text
} from '@chakra-ui/react'
import type { Answer, Question } from '@prisma/client'
import type { FC } from 'react'
import { shuffle } from '~/helpers/shuffle'
import _log from './log'

type QuestionsTableProps = { questions: Question[] }

const QuestionsTable: FC<QuestionsTableProps> = ({ questions }): JSX.Element => {
	return (
		<TableContainer>
			<Table variant='simple' size={'md'}>
				<TableCaption fontWeight='bold'>Most Recent Published Questions</TableCaption>
				<Thead>
					<Tr>
						{/* <Th>Publisher</Th> */}
						{/* <Th>ID</Th>   */}
						<Th>Question</Th>
						<Th>Answers</Th>
					</Tr>
				</Thead>
				<Tbody>
					{questions.map(question => (
						<Tr key={question.id}>
							<Td>{question.text.substring(0, 32) + (question.text.length > 32 ? '...' : '')}</Td>
							<Td>
								<Flex>
									{shuffle(question.answers).map((answer: Answer) => (
										<Text
											color={answer.correct ? 'green.300' : ''}
											fontWeight={answer.correct ? 'black' : 'normal'}
											key={answer.id}
											ml={2}
										>
											{answer.text.substring(0, 12) + (answer.text.length > 12 ? '...' : '')}
										</Text>
									))}
								</Flex>
							</Td>
						</Tr>
					))}
				</Tbody>
				<Tfoot>
					<Tr>
						<Th>Question</Th>
						<Th>Answers</Th>
					</Tr>
				</Tfoot>
			</Table>
		</TableContainer>
	)
}

export default QuestionsTable

// Path: src/components/questions-table.tsx
// Created at: 15:35:17 - 08/03/2023
// Language: Typescript
// Framework: React/Next.js

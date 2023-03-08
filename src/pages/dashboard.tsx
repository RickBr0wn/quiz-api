import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import type { GetStaticProps } from 'next'
import prisma from '../lib/prismadb'
import type { FC } from 'react'
import { BiQuestionMark } from 'react-icons/bi'
import BasicStatistics, { StatsCard } from '~/components/basic-statistics'
import MainLayout from '~/components/main-layout'
import ProtectedRoute from '~/components/protected-route'
import QuestionsTable from '~/components/questions-table'
import { Question } from '@prisma/client'

type DashboardProps = { questions: Question[] }

const Dashboard: FC<DashboardProps> = ({ questions }): JSX.Element => {
	return (
		<ProtectedRoute>
			<MainLayout>
				<Flex flexDir='column' gap={4} h='100%'>
					<BasicStatistics />
					<Flex w='100%' gap={4}>
						<StatsCard title={'Questions'} stat={'3,230'} icon={<BiQuestionMark size={'3em'} />} />
						<Box
							flex={1}
							px={{ base: 2, md: 4 }}
							py={'5'}
							shadow={'xl'}
							border={'1px solid'}
							borderColor={useColorModeValue('gray.800', 'gray.500')}
							rounded={'lg'}
						>
							X
						</Box>
					</Flex>
					<Box
						flex={1}
						px={{ base: 2, md: 4 }}
						py={'5'}
						shadow={'xl'}
						border={'1px solid'}
						borderColor={useColorModeValue('gray.800', 'gray.500')}
						rounded={'lg'}
						h='100%'
					>
						<QuestionsTable questions={questions} />
					</Box>
				</Flex>
			</MainLayout>
		</ProtectedRoute>
	)
}

export const getStaticProps: GetStaticProps<DashboardProps> = async () => {
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

export default Dashboard

// Path: src/pages/dashboard.tsx
// Created at: 01:08:49 - 08/03/2023
// Language: Typescript
// Framework: React/Next.js

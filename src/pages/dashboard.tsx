import type { NextPage } from 'next'
// import type { GetStaticProps } from 'next'
// import type { GetServerSideProps } from 'next'
import { Box, Flex, Grid, GridItem, SimpleGrid, Stack, useColorModeValue } from '@chakra-ui/react'
import type { GetStaticProps } from 'next'
import prisma from '../lib/prismadb'
import type { FC } from 'react'
import { BiQuestionMark } from 'react-icons/bi'
import BasicStatistics, { StatsCard } from '~/components/basic-statistics'
import MainLayout from '~/components/main-layout'
import ProtectedRoute from '~/components/protected-route'
import QuestionsTable from '~/components/questions-table'
import { Question } from '@prisma/client'
import Graph from '~/components/graph'
import { BsPerson } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'

interface DashboardProps {
	questions: Question[]
}

const Dashboard: NextPage<DashboardProps> = ({ questions }): JSX.Element => {
	return (
		<ProtectedRoute>
			<MainLayout activeTitle='dashboard'>
				{/* <Flex flexDir='column' gap={4}>
					<BasicStatistics />
					<Flex w='100%' gap={4} flexDir={{ base: 'column', md: 'row' }}>
						<SimpleGrid flex={2} columns={{ base: 2, md: 1 }} w='100%' spacing={4}>
							<StatsCard
								title={'Questions'}
								stat={'3,230'}
								icon={<BiQuestionMark size={'3em'} />}
							/>
							<StatsCard
								title={'Questions'}
								stat={'3,230'}
								icon={<BiQuestionMark size={'3em'} />}
							/>
						</SimpleGrid>

						<Box
							shadow={'xl'}
							border={'1px solid'}
							borderColor={useColorModeValue('gray.800', 'gray.500')}
							rounded={'lg'}
							maxW={{ base: '100%', md: '50%' }}
						>
							<Graph />
						</Box>
					</Flex>
					<Box
						flex={1}
						shadow={'xl'}
						border={'1px solid'}
						borderColor={useColorModeValue('gray.800', 'gray.500')}
						rounded={'lg'}
					>
						<QuestionsTable questions={questions} />
					</Box>
				</Flex> */}
				<Grid gap={4} templateRows={'repeat(8, 1fr)'} templateColumns={'repeat(4, 1fr)'}>
					<GridItem colSpan={{ base: 2, lg: 1 }}>
						<StatsCard title={'Questions'} stat={'3,230'} icon={<BiQuestionMark size={'3em'} />} />
					</GridItem>
					<GridItem colSpan={{ base: 2, lg: 1 }}>
						<StatsCard title={'Questions'} stat={'3,230'} icon={<BiQuestionMark size={'3em'} />} />
					</GridItem>
					<GridItem colSpan={{ base: 2, lg: 1 }}>
						<StatsCard title={'Users'} stat={'150'} icon={<BsPerson size={'3em'} />} />
					</GridItem>
					<GridItem colSpan={{ base: 2, lg: 1 }}>
						<StatsCard title={'Locations'} stat={'7'} icon={<GoLocation size={'3em'} />} />
					</GridItem>

					<GridItem colSpan={{ base: 4, lg: 2 }} rowSpan={{ lg: 2 }}>
						<Flex flexDir={{ lg: 'column' }} h='100%' gap={4}>
							<Box h='100%' w='100%'>
								<StatsCard
									title={'Questions'}
									stat={'3,230'}
									icon={<BiQuestionMark size={'3em'} />}
								/>
							</Box>
							<Box h='100%' w='100%'>
								<StatsCard title={'Locations'} stat={'7'} icon={<GoLocation size={'3em'} />} />
							</Box>
						</Flex>
					</GridItem>

					<GridItem colSpan={{ base: 4, lg: 2 }} rowSpan={2}>
						<Box
							shadow={'xl'}
							border={'1px solid'}
							borderColor={useColorModeValue('gray.800', 'gray.500')}
							rounded={'lg'}
						>
							<Graph />
						</Box>
					</GridItem>

					<GridItem colSpan={4} rowSpan={2}>
						<Box
							flex={1}
							shadow={'xl'}
							border={'1px solid'}
							borderColor={useColorModeValue('gray.800', 'gray.500')}
							rounded={'lg'}
							h='100%'
						>
							<QuestionsTable questions={questions} />
						</Box>
					</GridItem>
				</Grid>
			</MainLayout>
		</ProtectedRoute>
	)
}

/**
 * @param context https://nextjs.org/docs/api-reference/data-fetching/get-static-props#context-parameter
 * @return https://nextjs.org/docs/api-reference/data-fetching/get-static-props#getstaticprops-return-values
 */
export const getStaticProps: GetStaticProps<DashboardProps> = async context => {
	const questions = await prisma.question.findMany({
		include: {
			answers: true
		}
	})

	return {
		props: {
			questions: JSON.parse(JSON.stringify(questions)) // will be passed to the page component as props
		}
	}
}

/**
 * @param context https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter
 * @return https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#getserversideprops-return-values
 */
// export const getServerSideProps: GetServerSideProps = async context => {
//   // ...asyncronous code
//   return {
//     props: {} // will be passed to the page component as props
//   }
// }

/**
 * @return https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#getserversideprops-return-values
 */
// export const getStaticPaths: GetStaticPaths = async () => {
//   // ...asyncronous code
//   return {
//     paths: [
//       {
//         params: {
//           /* ...params */
//         }
//       } // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#paths
//     ],
//     fallback: true // true, false or 'blocking' // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-false
//   }
// }

/**
 * @param context https://nextjs.org/docs/api-reference/data-fetching/get-initial-props#context-object
 */
// Test.getInitialProps = async context => {
//   // ...asyncronous code
//   return {
//     props: {} // will be passed to the page component as props
//   }
// }

export default Dashboard

// Path: src/pages/dashboard.tsx
// Created at: 23:26:26 - 11/03/2023
// Language: Typescript
// Framework: React/Next.js

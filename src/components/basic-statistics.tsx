import type { FC } from 'react'
import {
	Box,
	Flex,
	SimpleGrid,
	Stat,
	StatLabel,
	StatNumber,
	useColorModeValue
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { BsPerson } from 'react-icons/bs'
import { BiQuestionMark } from 'react-icons/bi'
import { GoLocation } from 'react-icons/go'

interface StatsCardProps {
	title: string
	stat: string
	icon: ReactNode
}

type BasicStatisticsProps = {}

const BasicStatistics: FC<BasicStatisticsProps> = (): JSX.Element => {
	return (
		<Box mx={'auto'}>
			{/* <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
				Everyday more questions are published!
			</chakra.h1> */}
			<SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
				<StatsCard title={'Questions'} stat={'3,230'} icon={<BiQuestionMark size={'3em'} />} />
				<StatsCard title={'Users'} stat={'150'} icon={<BsPerson size={'3em'} />} />
				<StatsCard title={'Locations'} stat={'7'} icon={<GoLocation size={'3em'} />} />
			</SimpleGrid>
		</Box>
	)
}

export default BasicStatistics

// Path: src/components/basic-statistics.tsx
// Created at: 02:17:38 - 08/03/2023
// Language: Typescript
// Framework: React/Next.js

function StatsCard(props: StatsCardProps) {
	const { title, stat, icon } = props
	return (
		<Stat
			px={{ base: 2, md: 4 }}
			py={'5'}
			shadow={'xl'}
			border={'1px solid'}
			borderColor={useColorModeValue('gray.800', 'gray.500')}
			rounded={'lg'}
		>
			<Flex justifyContent={'space-between'}>
				<Box pl={{ base: 2, md: 4 }}>
					<StatLabel fontWeight={'medium'} isTruncated>
						{title}
					</StatLabel>
					<StatNumber fontSize={'2xl'} fontWeight={'medium'}>
						{stat}
					</StatNumber>
				</Box>
				<Box my={'auto'} color={useColorModeValue('gray.800', 'gray.200')} alignContent={'center'}>
					{icon}
				</Box>
			</Flex>
		</Stat>
	)
}

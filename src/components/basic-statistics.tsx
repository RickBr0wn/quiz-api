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
		<Box mx={'auto'} w='100%'>
			<SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
				<StatsCard title={'Questions'} stat={'3,230'} icon={<BiQuestionMark size={'3em'} />} />
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

export function StatsCard(props: StatsCardProps) {
	const { title, stat, icon } = props
	return (
		<Stat
			px={{ base: 2, md: 4 }}
			py={'5'}
			shadow={'xl'}
			border={'1px solid'}
			borderColor={useColorModeValue('gray.800', 'gray.500')}
			rounded={'lg'}
			marginTop={0}
			h='100%'
		>
			<Flex justifyContent={'space-between'}>
				<Box pl={{ base: 2, md: 4 }}>
					<StatLabel fontWeight={'medium'} isTruncated>
						{title}
					</StatLabel>
					<StatNumber color='green.300' fontSize={'4xl'} fontWeight={'medium'}>
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

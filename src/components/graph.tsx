import type { FC } from 'react'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	// Legend,
	LineElement,
	PointElement,
	Title,
	Tooltip
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Flex, Text } from '@chakra-ui/react'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip
	// Legend
)

const data = {
	labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
	datasets: [
		{
			data: [10, 40, 20, 30, 70, 40, 60, 30]
		}
	]
}

const options = {
	// plugins: {
	//   legend: {
	//     display: false,
	//   },
	// },
	type: 'line',
	data,
	elements: {
		line: {
			tension: 0,
			borderWidth: 6,
			borderColor: '#68D391',
			backgroundColor: '#68D391'
		},
		point: {
			radius: 10,
			hitRadius: 0
		}
	}
	// scales: {
	//   xAxis: {
	//     display: false,
	//   },
	//   yAxis: {
	//     display: false,
	//   },
	// },
}

type GraphProps = {}

const Graph: FC<GraphProps> = (): JSX.Element => {
	return (
		<Flex flexDir='column' w='full' flex={1} p={{ base: 2, md: 6 }}>
			<Text fontWeight='bold'>Publishing Frequency</Text>
			<Line data={data} options={options} />
		</Flex>
	)
}

export default Graph

// Path: src/components/graph.tsx
// Created at: 18:41:47 - 08/03/2023
// Language: Typescript
// Framework: React/Next.js

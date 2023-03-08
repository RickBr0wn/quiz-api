import { Text } from '@chakra-ui/react'
import type { FC } from 'react'
import MainLayout from '~/components/main-layout'
import ProtectedRoute from '~/components/protected-route'

type TrendingProps = {}

const Trending: FC<TrendingProps> = (): JSX.Element => {
	return (
		<ProtectedRoute>
			<MainLayout>
				<Text>Trending</Text>
			</MainLayout>
		</ProtectedRoute>
	)
}

export default Trending

// Path: src/pages/trending.tsx
// Created at: 16:07:51 - 08/03/2023
// Language: Typescript
// Framework: React/Next.js

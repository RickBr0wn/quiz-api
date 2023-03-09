import type { FC } from 'react'
import Graph from '~/components/graph'
import MainLayout from '~/components/main-layout'
import ProtectedRoute from '~/components/protected-route'

type TrendingProps = {}

const Trending: FC<TrendingProps> = (): JSX.Element => {
	return (
		<ProtectedRoute>
			<MainLayout>
				<Graph />
				<Graph />
				<Graph />
			</MainLayout>
		</ProtectedRoute>
	)
}

export default Trending

// Path: src/pages/trending.tsx
// Created at: 16:07:51 - 08/03/2023
// Language: Typescript
// Framework: React/Next.js

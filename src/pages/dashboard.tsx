import type { FC } from 'react'
import BasicStatistics from '~/components/basic-statistics'
import MainLayout from '~/components/main-layout'
import ProtectedRoute from '~/components/protected-route'

type DashboardProps = {}

const Dashboard: FC<DashboardProps> = (): JSX.Element => {
	return (
		<ProtectedRoute>
			<MainLayout>
				<BasicStatistics />
			</MainLayout>
		</ProtectedRoute>
	)
}

export default Dashboard

// Path: src/pages/dashboard.tsx
// Created at: 01:08:49 - 08/03/2023
// Language: Typescript
// Framework: React/Next.js

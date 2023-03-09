import { Text } from '@chakra-ui/react'
import type { FC } from 'react'
import MainLayout from '~/components/main-layout'
import ProtectedRoute from '~/components/protected-route'

type SettingsProps = {}

const Settings: FC<SettingsProps> = (): JSX.Element => {
	return (
		<ProtectedRoute>
			<MainLayout activeTitle='settings'>
				<Text>Favourites</Text>
			</MainLayout>
		</ProtectedRoute>
	)
}

export default Settings

// Path: src/pages/settings.tsx
// Created at: 16:14:02 - 08/03/2023
// Language: Typescript
// Framework: React/Next.js

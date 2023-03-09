import { Text } from '@chakra-ui/react'
import type { FC } from 'react'
import MainLayout from '~/components/main-layout'
import ProtectedRoute from '~/components/protected-route'

type FavouritesProps = {}

const Favourites: FC<FavouritesProps> = (): JSX.Element => {
	return (
		<ProtectedRoute>
			<MainLayout activeTitle='favourites'>
				<Text>Favourites</Text>
			</MainLayout>
		</ProtectedRoute>
	)
}

export default Favourites

// Path: src/pages/favourites.tsx
// Created at: 16:13:39 - 08/03/2023
// Language: Typescript
// Framework: React/Next.js

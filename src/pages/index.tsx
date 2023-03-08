import { Button } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC } from 'react'
import AuthButton from '~/components/auth-button'
import HomeLayout from '~/components/home-layout'

type Props = {}

const Home: FC<Props> = (): JSX.Element => {
	const { data, status } = useSession()

	return (
		<HomeLayout>
			{status === 'authenticated' && (
				<Link href='/dashboard'>
					<Button colorScheme='green' mr={8}>
						DASHBOARD
					</Button>
				</Link>
			)}
			<AuthButton />
		</HomeLayout>
	)
}

export default Home

// Path: src/pages/index.tsx
// Created at: 01:00:36 - 08/03/2023
// Language: Typescript
// Framework: React/Next.js

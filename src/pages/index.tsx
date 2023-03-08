import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { FC } from 'react'
import AuthButton from '~/components/auth-button'
import HomeLayout from '~/components/home-layout'

type Props = {}

const Home: FC<Props> = (): JSX.Element => {
	return (
		<HomeLayout>
			{/* <Link href='/dashboard'>
				<Button>DASHBOARD</Button>
			</Link> */}
			<AuthButton />
		</HomeLayout>
	)
}

export default Home

// Path: src/pages/index.tsx
// Created at: 01:00:36 - 08/03/2023
// Language: Typescript
// Framework: React/Next.js

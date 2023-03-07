import { Button } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import type { FC } from 'react'

type Props = {}

const AuthButton: FC<Props> = (): JSX.Element => {
	const { data: session } = useSession()

	if (session && session.user) {
		return (
			<>
				<Button onClick={() => signOut()}>Sign out</Button>
			</>
		)
	}
	return (
		<>

			<Button onClick={() => signIn()}>Sign in</Button>
		</>
	)
}

export default AuthButton

// Path: src/components/auth-button.tsx
// Created at: 14:17:13 - 07/03/2023
// Language: Typescript
// Framework: React/Next.js

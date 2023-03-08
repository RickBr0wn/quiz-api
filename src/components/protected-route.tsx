import { Flex, Spinner } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect } from 'react'

type ProtectedRouteProps = { children: ReactNode }

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }): JSX.Element => {
	const { data: session, status } = useSession()
	const router = useRouter()

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/')
		}
	}, [router, status])

	if (status === 'loading') {
		return (
			<Flex h='100vh' justify='center' align='center'>
				<Spinner size='xl' />
			</Flex>
		)
	}

	return <>{children}</>
}

export default ProtectedRoute

// Path: src/components/protected-route.tsx
// Created at: 11:33:08 - 08/03/2023
// Language: Typescript
// Framework: React/Next.js

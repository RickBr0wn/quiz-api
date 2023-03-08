import { Flex } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'

type HomeLayoutProps = { children: ReactNode }

const HomeLayout: FC<HomeLayoutProps> = ({ children }): JSX.Element => {
	return (
		<Flex h='100vh' justify='center' align='center'>
			{children}
		</Flex>
	)
}

export default HomeLayout

// Path: src/components/home-layout.tsx
// Created at: 01:04:38 - 08/03/2023
// Language: Typescript
// Framework: React/Next.js

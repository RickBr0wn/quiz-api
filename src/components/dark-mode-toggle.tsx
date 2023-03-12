import { useColorMode, IconButton } from '@chakra-ui/react'
import { FC } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

type Props = {}

const DarkModeToggle: FC<Props> = (): JSX.Element => {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<IconButton
			icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
			onClick={toggleColorMode}
			variant='ghost'
			aria-label={'Theme toggle switch'}
			role={'switch'}
		/>
	)
}

export default DarkModeToggle

// Path: src/components/dark-mode-toggle.tsx
// Created at: 19:07:03 - 09/03/2023
// Language: Typescript
// Framework: React/Next.js§

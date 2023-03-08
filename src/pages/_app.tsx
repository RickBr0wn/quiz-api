import { SessionProvider } from 'next-auth/react'
import type { AppType } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import HeadLayout from '~/components/head-layout'
import { Session } from 'next-auth'

const App: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps }
}) => {
	return (
		<SessionProvider session={session}>
			<ChakraProvider>
				<HeadLayout>
					<Component {...pageProps} />
				</HeadLayout>
			</ChakraProvider>
		</SessionProvider>
	)
}

export default App

import { SessionProvider } from 'next-auth/react'
import type { AppType } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '~/components/layout'
import { Session } from 'next-auth'

const App: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps }
}) => {
	return (
		<SessionProvider session={session}>
			<ChakraProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>
		</SessionProvider>
	)
}

export default App

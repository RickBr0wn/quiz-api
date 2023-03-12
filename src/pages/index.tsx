import type { NextPage } from 'next'
// import type { GetStaticProps } from 'next'
// import type { GetServerSideProps } from 'next'
import { Button, Spinner } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import AuthButton from '~/components/auth-button'
import HomeLayout from '~/components/home-layout'

interface IndexProps {}

const Index: NextPage<IndexProps> = (): JSX.Element => {
	const { data: _session, status } = useSession()

	if (status === 'loading') {
		return <Spinner size={'lg'} />
	}

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

/**
 * @param context https://nextjs.org/docs/api-reference/data-fetching/get-static-props#context-parameter
 * @return https://nextjs.org/docs/api-reference/data-fetching/get-static-props#getstaticprops-return-values
 */
// export const getStaticProps: GetStaticProps<IndexProps> = async context => {
//   // ...asyncronous code
//   return {
//     props: {} // will be passed to the page component as props
//   }
// }

/**
 * @param context https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter
 * @return https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#getserversideprops-return-values
 */
// export const getServerSideProps: GetServerSideProps = async context => {
//   // ...asyncronous code
//   return {
//     props: {} // will be passed to the page component as props
//   }
// }

/**
 * @return https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#getserversideprops-return-values
 */
// export const getStaticPaths: GetStaticPaths = async () => {
//   // ...asyncronous code
//   return {
//     paths: [
//       {
//         params: {
//           /* ...params */
//         }
//       } // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#paths
//     ],
//     fallback: true // true, false or 'blocking' // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-false
//   }
// }

/**
 * @param context https://nextjs.org/docs/api-reference/data-fetching/get-initial-props#context-object
 */
// Test.getInitialProps = async context => {
//   // ...asyncronous code
//   return {
//     props: {} // will be passed to the page component as props
//   }
// }

export default Index

// Path: src/pages/index.tsx
// Created at: 23:22:24 - 11/03/2023
// Language: Typescript
// Framework: React/Next.js

import type { NextPage } from 'next'
// import type { GetStaticProps } from 'next'
// import type { GetServerSideProps } from 'next'
import { Text } from '@chakra-ui/react'
import MainLayout from '~/components/main-layout'
import ProtectedRoute from '~/components/protected-route'

interface FavouritesProps {}

const Favourites: NextPage<FavouritesProps> = (): JSX.Element => {
	return (
		<ProtectedRoute>
			<MainLayout activeTitle='favourites'>
				<Text>Favourites</Text>
			</MainLayout>
		</ProtectedRoute>
	)
}

/**
 * @param context https://nextjs.org/docs/api-reference/data-fetching/get-static-props#context-parameter
 * @return https://nextjs.org/docs/api-reference/data-fetching/get-static-props#getstaticprops-return-values
 */
// export const getStaticProps: GetStaticProps<FavouritesProps> = async context => {
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

export default Favourites

// Path: src/pages/favourites.tsx
// Created at: 23:25:38 - 11/03/2023
// Language: Typescript
// Framework: React/Next.js

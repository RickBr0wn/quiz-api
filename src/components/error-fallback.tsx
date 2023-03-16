import type { FC } from 'react'

interface ErrorFallbackProps {
	error: any
	resetErrorBoundary: any
}

const ErrorFallback: FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }): JSX.Element => {
	return (
		<div role='alert'>
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	)
}

export default ErrorFallback

// Path: src/components/error-fallback.tsx
// Created at: 19:38:55 - 15/03/2023
// Language: Typescript
// Framework: React/Next.js

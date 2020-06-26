import React from 'react'
import { FallbackProps } from 'react-error-boundary'
import { useAppContext } from 'providers/AppContext'

const RouteErrorBoundary: React.FC<FallbackProps> = ({
  error,
  componentStack,
  resetErrorBoundary,
}) => {
  const { resetEnvironment } = useAppContext()

  const handleTryAgain = () => {
    if (resetEnvironment) resetEnvironment()
    resetErrorBoundary()
  }

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error?.message}</pre>
      <pre>{componentStack}</pre>
      <button onClick={handleTryAgain}>Try again</button>
    </div>
  )
}
export default RouteErrorBoundary

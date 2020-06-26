import React from 'react'

import { AppContext } from 'providers/AppContext'

import { BrowserRouter as Router } from 'react-router-dom'

import { RelayEnvironmentProvider } from 'react-relay/hooks'
import createEnvironment from 'providers/Relay/createEnvironment'

import { ThemeProvider, CssBaseline } from '@material-ui/core'
import theme from 'providers/Theme/theme'

import { SnackbarProvider } from 'notistack'

import { ErrorBoundary } from 'react-error-boundary'
import RouteErrorBoundary from 'components/route/RouteErrorBoundary'
import RouteLoading from 'components/route/RouteLoading'
import RenderRoute from 'components/route/RenderRoute'
import routes from 'routes'

const Root = () => {
  const [environment, setEnvironment] = React.useState<any>(createEnvironment())
  const resetEnvironment = () => {
    const newEnv = createEnvironment()
    setEnvironment(newEnv)
  }

  return (
    <AppContext.Provider value={{ resetEnvironment }}>
      <Router>
        <RelayEnvironmentProvider environment={environment}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              autoHideDuration={1500}
            >
              <ErrorBoundary FallbackComponent={RouteErrorBoundary}>
                <React.Suspense fallback={<RouteLoading />}>
                  <RenderRoute routes={routes} />
                </React.Suspense>
              </ErrorBoundary>
            </SnackbarProvider>
          </ThemeProvider>
        </RelayEnvironmentProvider>
      </Router>
    </AppContext.Provider>
  )
}
export default Root
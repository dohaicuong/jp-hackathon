import React from 'react'

type AppContextType = {
  resetEnvironment: () => void
}
export const AppContext = React.createContext<AppContextType>({
  resetEnvironment: () => console.log('App is not ready'),
})
export const useAppContext = () => {
  const value = React.useContext(AppContext)
  return value
}
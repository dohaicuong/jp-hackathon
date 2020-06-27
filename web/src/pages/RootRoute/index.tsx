import React from 'react'

// import { graphql } from 'babel-plugin-relay/macro'
// import { useLazyLoadQuery } from 'react-relay/hooks'
// import { RootRouteQuery } from './__generated__/RootRouteQuery.graphql'
import { useHistory } from 'react-router-dom'

const RootRoute = () => {
  const { push } = useHistory()
  const token = localStorage.getItem('ACCESS_TOKEN')

  // const data = useLazyLoadQuery<RootRouteQuery>(
  //   graphql`
  //     query RootRouteQuery {
  //       me {
  //         branch {
  //           id
  //         }
  //       }
  //     }
  //   `,
  //   {}
  // )
  // const isInBranch = Boolean(data.me.branch?.id)
  React.useEffect(() => {
    if(!token) push('/user/auth')
    // else if(isInBranch) push('/dashboard')
    // else push('/org-create')
    else push('/dashboard')
  }, [token, push]) // isInBranch

  return null
}
export default RootRoute

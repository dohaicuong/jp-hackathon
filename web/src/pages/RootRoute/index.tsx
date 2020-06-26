import React from 'react'

import { graphql } from 'babel-plugin-relay/macro'
import { useLazyLoadQuery } from 'react-relay/hooks'

const RootRoute = () => {
  const data = useLazyLoadQuery(
    graphql`
      query RootRouteQuery {
        me {
          id
          name
        }
      }
    `,
    {}
  )
  console.log(data)

  return <>RootRoute</>
}
export default RootRoute

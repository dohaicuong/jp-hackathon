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

  return <>RootRoute</>
}
export default RootRoute

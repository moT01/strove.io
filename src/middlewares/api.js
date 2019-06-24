// import { Query, Mutation } from 'utils'
// import { FETCH_START } from '../state/api/constants'

// const apiMiddleware = ({ dispatch }) => next => action => {
//   console.log('action', action)
//   next(action)

//   if (action.type !== FETCH_START) return

//   const {
//     name,
//     storeKey = action.payload.storeKey,
//     variables,
//     context,
//     fetchPolicy = 'cache-first',
//     errorPolicy = 'all',
//     query,
//     mutation,
//     onSuccess,
//     onFailure,
//     client = action.payload.client,
//   } = action.payload

//   if (mutation) {
//     dispatch(
//       Mutation({
//         storeKey,
//         name,
//         variables,
//         context,
//         errorPolicy,
//         mutation,
//         onSuccess,
//         onFailure,
//       })
//     )
//   } else {
//     dispatch(
//       Query({
//         storeKey,
//         name,
//         variables,
//         context,
//         fetchPolicy,
//         errorPolicy,
//         query,
//         onSuccess,
//         onFailure,
//       })
//     )
//   }
// }

// export default apiMiddleware

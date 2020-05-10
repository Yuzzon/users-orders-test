import { FETCH_USERS, SHOW_LOADER, HIDE_LOADER, SET_PAGE, GET_ORDERS, OPEN_MODAL, CLOSE_MODAL } from './types'

export const fetchUsers = (page = 0) => {
   const token = 'cmpc3hcajyh3e5ksz6xho9t77flp4pesa300js9y8w9v6xptzj0vlk0halesk27hgqslukjxpepzkmaz6jpfj8zw0x5fwsajezvb';
   const offset = page*10
   return async dispatch => {
      try {
         dispatch(showLoader())
         const response = await fetch(`https://api.leeloo.ai/api/v1/accounts?limit=10&offset=${offset}`, {
            headers: {
               'X-Leeloo-AuthToken': token
            }
         })
         const users = await response.json()
         console.log("usersFetch", users);
         dispatch({
            type: FETCH_USERS,
            payload: users
         })
         dispatch(hideLoader())
      }
      catch (e) {
         console.log("error", e);
      }
   }
}

export const showLoader = () => {
   return {
      type: SHOW_LOADER
   }
}

export const hideLoader = () => {
   return {
      type: HIDE_LOADER
   }
}

export const setPage = (pageNum) => {
   return {
      type: SET_PAGE,
      payload: pageNum
   }
}

export const getUserOrders = (id) => {
   const token = 'cmpc3hcajyh3e5ksz6xho9t77flp4pesa300js9y8w9v6xptzj0vlk0halesk27hgqslukjxpepzkmaz6jpfj8zw0x5fwsajezvb';
   return async dispatch => {
      try {
         dispatch(showLoader())
         dispatch(openModal())
         const response = await fetch(`https://api.leeloo.ai/api/v1/accounts/${id}?include=contactedUsers,orders`, {
            headers: {
               'X-Leeloo-AuthToken': token
            }
         })
         const orders = await response.json()
         console.log(orders)
         dispatch({
            type: GET_ORDERS,
            payload: orders.included.orders
         })
         dispatch(hideLoader())
      }
      catch (e) {
         console.log("error", e);
      }
   }
}

export const openModal = () => {
   return {
      type: OPEN_MODAL
   }
}

export const closeModal = () => {
   return {
      type: CLOSE_MODAL
   }
}

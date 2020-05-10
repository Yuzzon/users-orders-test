import { FETCH_USERS, SET_PAGE, GET_ORDERS } from '../actions/types';

const inititalState = {
   usersList: [],
   userOrders: [],
   pageNum: 1
}

export default (state = inititalState, action) => {
   switch (action.type) {
      case FETCH_USERS:
         return {
            ...state,
            usersList: action.payload
         }
      case SET_PAGE:
         return {
            ...state,
            pageNum: action.payload
         }
      case GET_ORDERS:
         return {
            ...state,
            userOrders: action.payload
         }
      default:
         return state;
   }
}

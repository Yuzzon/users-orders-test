import { HIDE_LOADER, SHOW_LOADER, OPEN_MODAL, CLOSE_MODAL } from '../actions/types';

const inititalState = {
   loading: false,
   openModal: false
}

export default (state = inititalState, action) => {
   switch (action.type) {
      case SHOW_LOADER:
         return {...state, loading:true}
      case HIDE_LOADER:
         return {...state, loading: false}
      case OPEN_MODAL:
         return {...state, openModal: true}
      case CLOSE_MODAL:
         return {...state, openModal: false}
      default:
         return state;
   }
}

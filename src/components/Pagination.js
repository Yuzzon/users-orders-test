import React, { useState, useEffect } from 'react';

import Pagination from '@material-ui/lab/Pagination';
import { fetchUsers, setPage } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

export default function PaginationControlled() {

   const [totalRes, setTotalRes] = useState(null);
   const dispatch = useDispatch();
   const totalUsers = useSelector(state => state.usersList.usersList.meta);

   useEffect(()=>{
      totalUsers && setTotalRes(totalUsers.totalCount)
   }, [totalUsers])

   const handleChange = (event, value) => {
      dispatch(setPage(value));
      dispatch(fetchUsers(value - 1))
   };

   return (
      <div>
         <Pagination count={
               totalRes % 10 > 0 ? parseInt(totalRes / 10 + 1) : parseInt(totalRes / 10)
         } onChange={handleChange} />
      </div>
   );
}

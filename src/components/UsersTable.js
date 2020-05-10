import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, getUserOrders } from '../actions';
import Pagination from './Pagination';


const useStyles = makeStyles({
   container: {
      height: "100%"
   },
});

const UsersTable = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const usersData = useSelector(state => state.usersList.usersList.data);
   const loading = useSelector(state => state.app.loading);
   const pageNumber = useSelector(state => state.usersList.pageNum);

   useEffect(() => {
      dispatch(fetchUsers());
   }, [dispatch])

   const convertDate = (dateBefore) => {
      var b = dateBefore.split(/\D+/);
      const date = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]))
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let dt = date.getDate();
      let time = date.toLocaleTimeString('en',
         { timeStyle: 'short', hour12: false, timeZone: 'UTC' });

      if (dt < 10) {
         dt = '0' + dt;
      }
      if (month < 10) {
         month = '0' + month;
      }
      return (dt + '-' + month + '-' + year + ' ' + time);
   }


   return (
      <TableContainer component={Paper} className={classes.container}>
         <Table stickyHeader aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="right">Ім'я</TableCell>
                  <TableCell align="right">Мессенджер</TableCell>
                  <TableCell align="right">Час останнього повідомлення</TableCell>
                  <TableCell align="right">Додаткова інформація</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {!loading && usersData ?
                  usersData.map((row, i) => (
                     <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                           {(i + 1) + (pageNumber - 1) * 10}
                        </TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.from}</TableCell>
                        <TableCell align="right">{convertDate(row.lastMessageTime)}</TableCell>
                        <TableCell align="right">
                           <button onClick={() => dispatch(getUserOrders(row.id))}>...</button>
                        </TableCell>
                     </TableRow>
                  ))
                  :
                  <TableRow>
                     <TableCell style={{ border: "none", textAlign: "center" }}>
                        <CircularProgress />
                     </TableCell>
                  </TableRow>
               }
            </TableBody>
         </Table>
         <Pagination />
      </TableContainer>
   );
}
export default UsersTable

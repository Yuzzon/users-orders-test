import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

import Modal from 'react-modal'
import { closeModal } from '../actions';

const UserOrders = () => {

   const userOrders = useSelector(state => state.usersList.userOrders);
   const [orders, setOrders] = useState([]);
   const dispatch = useDispatch();
   useEffect(() => {
      setOrders(userOrders)
   }, [userOrders]);
   const loading = useSelector(state => state.app.loading);
   const modalIsOpen = useSelector(state => state.app.openModal);

   const customStyles = {
      content: {
         top: '50%',
         left: '50%',
         right: 'auto',
         bottom: 'auto',
         marginRight: '-50%',
         transform: 'translate(-50%, -50%)',

      }
   };

   return (
      <Modal
         isOpen={modalIsOpen}
         contentLabel="User orders"
         ariaHideApp={false}
         style={customStyles}
         shouldCloseOnOverlayClick={true}
         onRequestClose={()=>dispatch(closeModal())}
      >
         <TableContainer component={Paper}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>Id замовлення</TableCell>
                     <TableCell align="right">Ціна</TableCell>
                     <TableCell align="right">Валюта</TableCell>
                     <TableCell align="right">Спосіб оплати</TableCell>
                     <TableCell align="right">Статус</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {!loading && orders.length > 0 ?
                     orders.map((row, i) => (
                        <TableRow key={i}>
                           <TableCell>{row.id}</TableCell>
                           <TableCell align="right">{row.price}</TableCell>
                           <TableCell align="right">{row.currency}</TableCell>
                           <TableCell align="right">{row.title}</TableCell>
                           <TableCell align="right">{row.status}</TableCell>
                        </TableRow>
                     ))
                     :
                     <TableRow>
                        <TableCell style={{ border: "none", textAlign: "center" }}>
                        {loading ? 
                        <CircularProgress/>
                        : "Замовлень немає"}
                        </TableCell>
                     </TableRow>
                  }
               </TableBody>
            </Table>
         </TableContainer>
      </Modal>
   );
};

export default UserOrders;

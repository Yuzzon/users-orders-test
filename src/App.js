import React from 'react';
import './App.css';
import  UsersTable from './components/UsersTable'
import UserOrders from './components/UserOrders';

const App = () => {
   return (
      <div className="App">
         <UsersTable/>
         <UserOrders/>
      </div>
   );
}

export default App;

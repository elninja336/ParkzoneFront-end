// import logo from './logo.svg';
import './App.css';
import React from 'react';
// import Headers from './Component/Headers';
// import Footer from './Component/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Dashboard from './Pages/Dashboard';
// import ManageParkingLots from './Pages/ManageReservation';
import ManageSlots from './Pages/ManageSlots';
import ManageCustomers from './Pages/ManageCustomers';
import Reports from './Pages/Reports';
import Logout from './Pages/Logout';
// Customer' pages
import Customer from './Pages/Customer';
import ViewParking from './Pages/ViewParking';
import MyAccount from './Pages/MyAccount';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import SearchParkingLots from './Pages/SearchParkingLots';
import MyBookings from './Pages/MyBookings';
import BookingReservation from './Pages/BookingReservation';
import ManagePayment from './Pages/ManagePayment';
import CustomerHome from './Pages/CustomerHome';
import ManageReservation from './Pages/ManageReservation';


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );


// }
// const App = () => {
//   return (
//     <div>
//       <h1>Welcome to My First React App</h1>
//     </div>
//   );
// };

const App = () => {
  return (
    
    <div>
      {/* <Headers /> */}
      {/* <main> */}
        {/* <h2>Welcome to the Main Content</h2> */}
        {/* <p>This is where your app content goes.</p> */}
      {/* </main> */}
      {/* <Footer /> */}
      
      <Router>
        {/* <Headers /> */}
          {/* <main> */}
          
          
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/manage-reservations' element={<ManageReservation />} />
              <Route path='/manage-slots' element={<ManageSlots />} />
              <Route path='/manage-customers' element={<ManageCustomers />} />
              <Route path='/reports' element={<Reports />} />
              <Route path='/logout' element={<Logout />} />
              {/* Customer pages */}
              <Route path="/customer" element= {<Customer />} />
              <Route path="/customer-home" element= {<CustomerHome />} />
              <Route path="/view-parking" element={<ViewParking />} />
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<SearchParkingLots />} />
              <Route path="/bookings" element={<MyBookings />} />
              <Route path="/book" element={<BookingReservation />} />
              <Route path="/manage-payments" element={<ManagePayment />} />
              


            </Routes>
          {/* </main> */}
      </Router>
    </div>

    
    
  );
};

export default App;

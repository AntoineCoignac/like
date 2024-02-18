import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Notifications from './pages/Notifications/Notifications';
import Orders from './pages/Orders/Orders';
import Order from './pages/Order/Order';
import Chats from './pages/Chats/Chats';
import Chat from './pages/Chat/Chat';
import EditAccount from './pages/EditAccount/EditAccount';
import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/Log/Register/Register';
import Login from './pages/Log/Login/Login';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Settings from './pages/Settings/Settings';
import NewGig from './pages/NewGig/NewGig';
import User from './pages/User/User';
import Gig from './pages/Gig/Gig';
import EditGig from './pages/EditGig/EditGig';
import Pay from './pages/Pay/Pay';
import Success from './pages/Success/Success';
import { useNavigate } from 'react-router-dom';
import newRequest from './utils/newRequest';
import { useEffect } from 'react';
import Forget from './pages/Log/Forget/Forget';
import Code from './pages/Log/Code/Code';

function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await newRequest.get('/auth/isloggedin'); 

        if (!response.data.isLoggedIn) {
          try {
            await newRequest.post('/auth/logout');
            localStorage.removeItem('currentUser');
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="*" Component={Home}/>
        <Route path="/" Component={Home}/>
        <Route path="/search" Component={Search}/>
        <Route path="/notifications" Component={Notifications}/>
        <Route path="/work/orders" Component={Orders}/>
        <Route path="/work/order/:orderId" Component={Order}/>
        <Route path="/work/chats" Component={Chats}/>
        <Route path="/chat/:userId" Component={Chat}/>
        <Route path="/user/:id" Component={User}/>
        <Route path="/me" Component={EditAccount}/>
        <Route path="/work/dashboard" Component={Dashboard}/>
        <Route path="/register" Component={Register}/>
        <Route path="/login" Component={Login}/>
        <Route path="/settings" Component={Settings}/>
        <Route path='/newgig' Component={NewGig}/>
        {/*<Route path='/gig/:gigId' Component={Gig}/>*/}
        <Route path='/editgig/:gigId' Component={EditGig}/>
        <Route path='/pay/:id' Component={Pay}/>
        <Route path='/success' Component={Success}/>
        <Route path='/forget' Component={Forget}/>
        <Route path='/code' Component={Code}/>
      </Routes>
      </QueryClientProvider>
    </Router>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import { createContext } from 'react';
import users from "./assets/users.json";
import rates from "./assets/rates.json";
import translations from "./assets/translations.json";
import Search from './pages/Search/Search';
import Notifications from './pages/Notifications/Notifications';
import Orders from './pages/Orders/Orders';
import Order from './pages/Order/Order';
import Chats from './pages/Chats/Chats';
import Chat from './pages/Chat/Chat';
import Creator from './pages/Creator/Creator';
import messages from "./assets/messages.json";
import EditAccount from './pages/EditAccount/EditAccount';
import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/Log/Register/Register';
import Login from './pages/Log/Login/Login';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Settings from './pages/Settings/Settings';

function App() {
  const queryClient = new QueryClient();

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
        <Route path="/work/chat/:userId" Component={Chat}/>
        <Route path="/creator/:id" Component={Creator}/>
        <Route path="/me" Component={EditAccount}/>
        <Route path="/dashboard" Component={Dashboard}/>
        <Route path="/register" Component={Register}/>
        <Route path="/login" Component={Login}/>
        <Route path="/settings" Component={Settings}/>
      </Routes>
      </QueryClientProvider>
    </Router>
  );
}

export default App;

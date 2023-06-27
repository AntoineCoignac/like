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

export const GlobalContext = createContext();

function App() {

  return (
    <Router>
      <GlobalContext.Provider value={{users, rates, translations, messages}}>
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
      </Routes>
      </GlobalContext.Provider>
    </Router>
  );
}

export default App;

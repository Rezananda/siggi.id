import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/css/App.css';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
// import PublicRoute from './components/PublicRoute/PublicRoute';
import CartContext from './context/CartContext';
import JwtContext from './context/JwtContext';
import Carts from './pages/Carts/Carts';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Orders from './pages/Orders/Orders';
import OrderStatus from './pages/OrderStatus/OrderStatus';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Registration from './pages/Registration/Registration';

function App() {
  return (
    <div>
      <JwtContext>
        <CartContext>
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<Login/>}/>
              <Route path='/registrastion' element={<Registration/>}/>
              <Route path='/' element={<Home/>}/>
              <Route path='/product/:id' element={<ProductDetail/>}/>
              <Route path='/carts' element={<Carts/>}/>
              <Route element={<PrivateRoute/>}>
                <Route path='/orders' element={<Orders/>}/>
                <Route path='/order-status' element={<OrderStatus/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </CartContext>
      </JwtContext>
    </div>
  );
}

export default App;

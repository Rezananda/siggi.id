import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/css/App.css';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';
import VoucherDetail from './components/Voucher/VoucherDetail/VoucherDetail';
// import PublicRoute from './components/PublicRoute/PublicRoute';
import CartContext from './context/CartContext';
import JwtContext from './context/JwtContext';
import Carts from './pages/Carts/Carts';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Orders from './pages/Orders/Orders';
import DetailOrderStatus from './pages/OrderStatus/DetailOrderStatus/DetailOrderStatus';
import OrderStatus from './pages/OrderStatus/OrderStatus';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Registration from './pages/Registration/Registration';
import Search from './pages/Search/Search';

function App() {
  return (
    <div>
      <CartContext>
        <JwtContext>
          <BrowserRouter>
            <Routes>
              <Route element={<PublicRoute/>}></Route>
              <Route path='/login' element={<Login/>}/>
              <Route path='/registrastion' element={<Registration/>}/>
              <Route path='/' element={<Home/>}/>
              <Route path='/product/:id' element={<ProductDetail/>}/>
              <Route path='/carts' element={<Carts/>}/>
              <Route path='/voucher/:id' element={<VoucherDetail/>}/>
              <Route path='/search' element={<Search/>}/>
              <Route element={<PrivateRoute/>}>
                <Route path='/orders' element={<Orders/>}/>
                <Route path='/order-status' element={<OrderStatus/>}/>
                <Route path='/order-status/:id' element={<DetailOrderStatus/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </JwtContext>
      </CartContext>
    </div>
  );
}

export default App;

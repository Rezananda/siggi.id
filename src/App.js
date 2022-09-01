import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/css/App.css';
import VoucherDetail from './components/Voucher/VoucherDetail/VoucherDetail';
import CartContext from './context/CartContext';
import Carts from './pages/Carts/Carts';
import Home from './pages/Home/Home';
import Orders from './pages/Orders/Orders';
import DetailOrderStatus from './pages/OrderStatus/DetailOrderStatus/DetailOrderStatus';
import OrderStatus from './pages/OrderStatus/OrderStatus';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Products from './pages/Products/Products';
import Search from './pages/Search/Search';
import Voucher from './pages/Voucher/Voucher';

function App() {
  return (
    <div className='md:min-h-screen md:w-1/3 md:m-auto md:relative'>
      <CartContext>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/vouchers' element={<Voucher/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/product/:id' element={<ProductDetail/>}/>
            <Route path='/carts' element={<Carts/>}/>
            <Route path='/voucher/:id' element={<VoucherDetail/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/order-status' element={<OrderStatus/>}/>
            <Route path='/order-status/:id' element={<DetailOrderStatus/>}/>
          </Routes>
        </BrowserRouter>
      </CartContext>
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/css/App.css';
import CartContext from './context/CartContext';
import Carts from './pages/Carts/Carts';
import Home from './pages/Home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';

function App() {
  return (
    <div>
      <CartContext>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/product/:id' element={<ProductDetail/>}/>
            <Route path='/carts' element={<Carts/>}/>
          </Routes>
        </BrowserRouter>
      </CartContext>
    </div>
  );
}

export default App;

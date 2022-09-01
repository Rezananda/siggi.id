import Cookies from 'js-cookie'
import React, { createContext, useEffect, useState } from 'react'

export const getCartItems = () => {
    return Cookies.get('carts')  ? JSON.parse(Cookies.get("carts")) : []
}

export const getAddress = () => {
    return Cookies.get('address')  ? JSON.parse(Cookies.get("address")) : {}
}

export const Cart = createContext()

const CartContext = ({children}) => {
    const [cart, setCart] = useState(getCartItems())
    
    const addToCart = (product) => {
        const exist = cart.find((x) => x.id === product.id && x.variant_name === product.variant_name)
        if(exist){
            setCart(cart.map(x => x.id === product.id && x.variant_name === product.variant_name? {...exist, qty: exist.qty + 1} : x))
        }else{
            setCart([...cart, {...product, qty: 1}])
        }
    }

    const removeToCart = (product) => {
        const exist = cart.find((x) => x.id === product.id && x.variant_name === product.variant_name)
        if(exist.qty === 1){
            setCart(cart.filter((x) => x.variant_name !== product.variant_name))
        }else{
            setCart(cart.map((x)=> x.id === product.id && x.variant_name === product.variant_name ? {...exist, qty: exist.qty - 1} : x))
        }
    }

    useEffect(() => {
        Cookies.set('carts', JSON.stringify(cart), {expires: 30, path: '/', secure: true})
    }, [cart])
    

  return (
    <Cart.Provider value={{cart, addToCart, removeToCart, setCart}}>
        {children}
    </Cart.Provider>
  )
}

export default CartContext
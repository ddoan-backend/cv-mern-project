import { CartContext } from "../Cart/CartContext.js";
import { useState, useEffect } from "react";

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart')
        return saved ? JSON.parse(saved) : []
    })

    // savw cart
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
    //add item 
    const addToCart = (food) => {
        setCart((prev) => {
            const existed = prev.find(item => item.id === food.id)
            if (existed) {
                return prev.map(item =>
                    item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prev, { ...food, quantity: 1 }]
        })
    }
    //minus item
    const inscreaseQauntity = (id)=>{
        setCart(prev => prev.map(item=> item.id === id? {...item,quantity:item.quantity +1}:item))
    }
    //plus item
    const descreseQuantity = (id)=>{
        setCart(prev =>{
            const item =prev.find(i => i.id ===id)
            if(item.quantity === 1) return prev.filter(i =>i.id !==id)
            return prev.map(i =>i.id === id?{...i , quantity:i.quantity -1 }:i)
        })
    }

    const remove = (id)=>{
        setCart(prev => prev.filter(item => item.id !== id))
    }

    const clearCart = () => setCart([])

    const value = { cart, addToCart, clearCart , descreseQuantity ,inscreaseQauntity ,remove }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
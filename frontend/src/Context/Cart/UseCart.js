import { useContext } from "react";
import { CartContext } from "./CartContext.js";

export const useCart = () => {
    const ctx = useContext(CartContext)
    return ctx
}
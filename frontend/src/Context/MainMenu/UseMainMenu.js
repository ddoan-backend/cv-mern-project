import { useContext } from "react";
import { MainMenuContext } from "./MainMenuContext.js";

export function useMainMenu(){
    const ctx = useContext(MainMenuContext)
    if(!ctx)throw new Error("useMainMenu phải dùng trong MainMenuProvider")
        return ctx
}
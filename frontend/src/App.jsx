import {BrowserRouter, Route, Routes ,} from 'react-router'
import SigninPage from './pages/SigninPage.jsx'
import Dashboard from './pages/DashBoard.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import StaffPage from './pages/StaffPage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import KitchenPage from './pages/KitchenPage.jsx'
import { MainMenuProvider } from './Context/MainMenu/MainMenuProvider.jsx'
import { CartProvider } from './Context/Cart/CartProvider.jsx'


import {Toaster} from 'sonner'

function App() {

  return (
    <>
    <Toaster></Toaster>
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SigninPage></SigninPage>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/order' element={
          <CartProvider>
          <MainMenuProvider>
            <OrdersPage></OrdersPage>
          </MainMenuProvider>
          </CartProvider>
          }></Route>
        <Route path='/dashboard/staff' element={<StaffPage></StaffPage>}></Route>
        <Route path='/dashboard/menu' element={<MenuPage></MenuPage>}></Route>
        <Route path='/dashboard/kitchen' element={<KitchenPage></KitchenPage>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

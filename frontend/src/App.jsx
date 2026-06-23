import {BrowserRouter, Route, Routes , Navigate} from 'react-router'
import SigninPage from './pages/SigninPage.jsx'
import Dashboard from './pages/DashBoard.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import StaffPage from './pages/StaffPage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import KitchenPage from './pages/KitchenPage.jsx'
import PaymentPage from './pages/PaymentPage.jsx'
import RevenuePage from './pages/RevenuePage.jsx'
import TablePage from './pages/TablePage.jsx'
import { MainMenuProvider } from './Context/MainMenu/MainMenuProvider.jsx'
import { CartProvider } from './Context/Cart/CartProvider.jsx'


import {Toaster} from 'sonner'

function App() {

  return (
    <>
    <Toaster></Toaster>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/signin' />} />
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
        <Route path='/dashboard/payment' element={<PaymentPage></PaymentPage>}></Route>
        <Route path='/dashboard/revenue' element={<RevenuePage></RevenuePage>}></Route>
        <Route path='/dashboard/table' element={<TablePage></TablePage>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

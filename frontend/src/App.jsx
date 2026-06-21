import {BrowserRouter, Route, Routes ,} from 'react-router'
import SigninPage from './pages/SigninPage.jsx'
import Dashboard from './pages/DashBoard.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import StaffPage from './pages/StaffPage.jsx'
import MenuPage from './pages/MenuPage.jsx'


import {Toaster} from 'sonner'

function App() {

  return (
    <>
    <Toaster></Toaster>
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SigninPage></SigninPage>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/dashboard/order' element={<OrdersPage></OrdersPage>}></Route>
        <Route path='/dashboard/staff' element={<StaffPage></StaffPage>}></Route>
        <Route path='/dashboard/menu' element={<MenuPage></MenuPage>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

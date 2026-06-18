import {BrowserRouter, Route, Routes ,} from 'react-router'
import SigninPage from './pages/SigninPage'
import StaffDashboardPage from './pages/StaffDashboardPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import MenuLayoutPage from './pages/MenuLayoutPage'
import {Toaster} from 'sonner'

function App() {

  return (
    <>
    <Toaster></Toaster>
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SigninPage></SigninPage>}></Route>
        <Route path='/staff' element={<StaffDashboardPage></StaffDashboardPage>}></Route>
        <Route path='/admin' element={<AdminDashboardPage></AdminDashboardPage>}></Route>
        <Route path='/menu' element={<MenuLayoutPage></MenuLayoutPage>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

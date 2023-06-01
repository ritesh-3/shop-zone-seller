
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useDarkMode from './custom-hooks/darkMode';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ActivationPage from './pages/ActivationPage';
import SellerProtectedRoute from './routes/SellerProtectedRoute';
import useAppReload from './custom-hooks/AppReload';
import AlredyLoggedInProtectRoute from './routes/AlredyLoggedInProtectRoute';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import CreateProductPage from './pages/CreateProductPage';
import CreateEventPage from './pages/CreateEventPage';
import ProductsPage from './pages/ProductsPage';
import EventsPage from './pages/EventsPage';
import OrdersPage from './pages/OrdersPage';
import CouponsPage from './pages/CouponsPage';
import RefundsPage from './pages/RefundsPage';
import MessagesPage from './pages/MessagesPage';
import SellerOrderDetails from './components/Order/SellerOrderDetails';




function App() {
  const [darkMode, toggleDarkMode] = useDarkMode();

  useAppReload();

  return <div className={darkMode ? 'dark' : ''}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<AlredyLoggedInProtectRoute> <LoginPage /> </AlredyLoggedInProtectRoute>} />
        <Route path='/signup' element={<AlredyLoggedInProtectRoute> <SignupPage /> </AlredyLoggedInProtectRoute>} />
        
        <Route path='/dashboard' element={<SellerProtectedRoute>   <DashboardPage /> </SellerProtectedRoute>} />
        <Route path='/products' element={<SellerProtectedRoute> <ProductsPage /> </SellerProtectedRoute>} />
        <Route path='/events' element={<SellerProtectedRoute> <EventsPage /> </SellerProtectedRoute>} />
        <Route path='/orders' element={<SellerProtectedRoute> <OrdersPage /> </SellerProtectedRoute>} />
        <Route path='/coupons' element={<SellerProtectedRoute> <CouponsPage /> </SellerProtectedRoute>} />
        <Route path='/refunds' element={<SellerProtectedRoute> <RefundsPage /> </SellerProtectedRoute>} />
        <Route path='/messages' element={<SellerProtectedRoute> <MessagesPage /> </SellerProtectedRoute>} />
        <Route path='/create-product' element={<SellerProtectedRoute>   <CreateProductPage /> </SellerProtectedRoute>} />
        <Route path='/create-event' element={<SellerProtectedRoute>   <CreateEventPage /> </SellerProtectedRoute>} />
        <Route path="/order/:id" element={<SellerProtectedRoute><SellerOrderDetails/> </SellerProtectedRoute>} />
        <Route path='/seller/activation/:activation_token' element={<ActivationPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>


      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  </div>
}

export default App

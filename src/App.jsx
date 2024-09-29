import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from "./components/Header/Header";
import Footer2 from "./components/Footer2/Footer2";
import Hero from "./components/Hero/Hero";
import Cards from "./components/Card/Cards";
import Companies from "./components/Companies/Companies";
import Signup from './pages/Signup/Signup'; 
import ProductPage from './components/Products/ProductPage.jsx'; 
import AdminDashboard from './pages/Admin/AdminDashboard'; // Update import path
import ProductList from './components/Products/ProductList.jsx'; // Update import path
import Login from './pages/Login/Login'; // Update the path as necessary
import ExploreMore from './pages/ExploreMore/ExploreMore';
import Commemorative from './pages/Categories/Commemorative';
import AddProduct from './pages/Admin/AddProduct';
import ProductDetail from './components/admin/ProductDetail';
import OrderDetail from './components/admin/OrderDetail';
import UserDetail from './components/admin/UserDetail'; 
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import Definitive from './pages/Categories/Definitive.jsx';
import HundredYearOldStamps from './pages/Categories/HundredYearOldStamps.jsx';
import Cart from './pages/Cart';
import { CartProvider } from './CartContext.jsx';
import LatestArrivals from './pages/LatestArrivals/LatestArrivals.jsx';
import PersistentLogin from './PersistentLogin.jsx';
import Team from './components/Team/Team.jsx';
import ProfilePage from './components/Profile/ProfilePage.jsx';
import SellerDashboard from './components/Seller/SellerDashboard.jsx';
import ProductVerification from './pages/Admin/ProductVerification.jsx';
import MyProducts from './pages/Seller/MyProducts.jsx';
import CertificatePage from './components/Seller/CertificatePage.jsx';
import VerificationStatus from './components/Seller/VerificationStatus.jsx';
import AddSellerProduct from './pages/Seller/AddSellerProduct.jsx';
import CheckCertificate from './components/CheckCertificate/CheckCertificate.jsx';
import VerifiedProducts from './pages/Seller/VerifiedProducts.jsx';
import ProductDetailPage from './pages/Seller/ProductDetailPage.jsx';
import PDAForm from './pages/PDA/PDA.jsx';
import Recharge from './pages/PDA/Recharge.jsx';

function App() {
  
  return (
    <CartProvider>
    <Router>
      
      <div className="App">
        <Header />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/admin/dashboard" element={
            
              <AdminDashboard />
            } /> {/* Add AdminPage route */}
          <Route path="/products" element={
             <ProtectedRouteForAdmin>
              <ProductList />
             </ProtectedRouteForAdmin>} /> {/* Add ProductList route */}
             <Route path="/profile" element={<ProfilePage/>}/>
             <Route path="/seller-dashboard" element={<SellerDashboard/>}/>
          <Route path="/categories/explore-more" element={<ExploreMore />}/>
          <Route path="/seller-dashboard" element={<SellerDashboard/>} />
          <Route path="/add-seller-product" element={<AddSellerProduct/>} />
          <Route path="/certificate/:certificateNumber" element={<CertificatePage />} />
          <Route path="/verification-status" element={<VerificationStatus/>}/>
          <Route path="/check-certificate" element={<CheckCertificate/>}/>
          <Route path="/my-products" element={<MyProducts/>} />
          <Route path="/product-verification" element={<ProductVerification/>}/>
          <Route path="/verified-products" element={<VerifiedProducts/>} />
          <Route path="/seller-products/:id" element={<ProductDetailPage/>} />
          <Route path="/latest-arrivals" element={<LatestArrivals/>}/>
          <Route path="/PDA" element={<PDAForm/>}/>
          <Route path="recharge" element={<Recharge/>}/>
          <Route path="/categories/commemorative" element={<Commemorative />} />
          <Route path="/categories/definitive" element={<Definitive />} />
          <Route path="/categories/100-year-old" element={<HundredYearOldStamps />}/>
          <Route path="/admin/add-product" element={<AddProduct />} />
          
          

          <Route path="/admin/products" element={
            <ProtectedRouteForAdmin>
              <ProductDetail />
            </ProtectedRouteForAdmin>} /> {/* Add ProductDetail route */}
          <Route path="/admin/orders" element={
            <ProtectedRouteForAdmin>
              <OrderDetail />
            </ProtectedRouteForAdmin>} /> {/* Add OrderDetail route */}
          <Route path="/admin/users" element={
            <ProtectedRouteForAdmin>
              <UserDetail />
            </ProtectedRouteForAdmin>} /> {/* Add UserDetail route */}
          <Route path="/cart" element={<Cart />}  />
          <Route path="/" element={
            <>
              <Hero />
              <Team/>
             
            </>
          } />
        </Routes>
        <Footer2 />
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
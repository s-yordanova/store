import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import Account from "./pages/account/Account";
import PayCash from "./pages/payCash/PayCash";
import Delivery from "./pages/Delivery";
import OrderProducts from "./pages/OrderProducts";
import Conditions from "./pages/Conditions";

const App = () => {
  const user =  useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/products/:category/:category" element={<ProductList/>} />
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/cart" element={<Cart/>} /> 
        <Route path="/login" element={user? <Navigate to = "/"/> : <Login/>} />
        <Route path="/register" element={user? <Navigate to = "/"/> : <Register/>} />
        <Route path="/success" element={<Success/>} />
        <Route path="/cash" element={<PayCash/>} />
        <Route path="/shipping" element={<Delivery/>} />
        <Route path="/conditions" element={<Conditions/>} />
        <Route path="/account" element={user === null? <Navigate to = "/"/> : <Account/>} />
        <Route path="/details/:id" element={user === null? <Navigate to = "/"/> : <OrderProducts/>} />
      </Routes>
    </Router>
  );
};

export default App;

import {
  lazy,
  Suspense,
} from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/navbar";
import ProductList from "./pages/productlist";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AddProduct from "./pages/addproduct"; 
// import ErrorBoundary from "./components/ErrorBoundary";

const Cart = lazy(
  () => import("./pages/cart")
);

const Register = lazy(
  () => import("./pages/register")
);

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Suspense
        fallback={<p>Loading page...</p>}
      >
        <Routes>
          <Route
            path="/"
            element={<ProductList />}
          />

         <Route
  path="/cart"
  element={
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  }
/>

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
  path="/admin/products/add"
  element={
    <ProtectedRoute adminOnly>
      <AddProduct />
    </ProtectedRoute>
  }
/>

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
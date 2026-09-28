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
            element={<Cart />}
          />

          <Route
            path="/register"
            element={<Register />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
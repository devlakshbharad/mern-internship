import {Link,BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import Card from "./card"


import Home from './home'
import { Cart } from './cart'
import { Products } from './product'
import { Register } from './register'
import { NotFound } from './notfound'
function Handel(){
return(<>
<Router>
    <Link to="/">Home </Link>
     <Link to="/register">Register</Link>{" "}
        <Link to="/products">Products</Link>{" "}
        <Link to="/cart">Cart</Link>

    <Routes>

        <Route path="/" element={<Home />}></Route>
        <Route path="/register"
          element={<Register />}></Route>
      <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
    </Routes>
</Router>


</>)


 } export default Handel
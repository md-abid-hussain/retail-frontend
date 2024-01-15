import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./Features/Auth/Login";
import PersistLogin from "./Features/Auth/PersistLogin";
import Register from "./Features/Auth/Register";
import Catalogue from "./components/Catalogue/Catalogue";
import Categories from "./components/Catalogue/Categories";
import ResetPassword from "./Features/Auth/ResetPassword";
import Prefetch from "./Features/Auth/Prefetch";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset-password">
          <Route path=":token" element={<ResetPassword />} />
        </Route>
        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
              <Route path="catalogue" element={<Catalogue />}>
                <Route index element={<Categories />} />
              </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

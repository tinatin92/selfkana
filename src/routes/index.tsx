import { Route, Routes } from "react-router-dom";
import DefaultLayout from "@/layouts/default"
import { ROUTES } from './default'


const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {ROUTES}
        </Route>
      </Routes>
    );
  };
  
  export default AppRoutes;
import { Outlet } from "react-router-dom";
import CatalogueHeader from "./CatalogueHeader";
import CatalogueFooter from "./CatalogueFooter";

const Catalogue = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <CatalogueHeader />
      <div className="flex-1">
        <Outlet />
      </div>
      <CatalogueFooter />
    </div>
  );
};

export default Catalogue;

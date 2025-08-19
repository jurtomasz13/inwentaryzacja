import { ClipboardList, Home, MapPin, Package, ScanBarcode, ShoppingCart, Tag } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";

export default function Navigation() {
  return (
    <nav className="flex justify-center p-4 border-b-1 border-b-slate-400 shadow-sm">
      <Link to="" className="mr-4 flex items-center">
        <div className="flex items-center">
          <Package />
          <h2 className="ml-2 text-lg font-bold">Simple Inventory</h2>
        </div>
      </Link>
      <div className="flex gap-2">
        <NavLink to="/" className="flex">
          <Button variant="ghost">
            <Home />
            <span>Dashboard</span>
          </Button>
        </NavLink>
        <NavLink to="/inventory" className="flex">
        <Button variant="ghost">
          <ClipboardList />
          <span>Inwentaryzacja</span>
          </Button>
        </NavLink>
        <NavLink to="/products" className="flex">
        <Button variant="ghost">
          <ScanBarcode />
          <span>Produkty</span>
          </Button>
        </NavLink>
        <NavLink to="/categories" className="flex">
        <Button variant="ghost">
          <Tag />
          <span>Kategorie</span>
          </Button>
        </NavLink>
        <NavLink to="/rooms" className="flex">
        <Button variant="ghost">
          <MapPin />
          <span>Pomieszczenia</span>
          </Button>
        </NavLink>
        <NavLink to="/orders" className="flex">
        <Button variant="ghost">
          <ShoppingCart />
          <span>Zamówienia</span>
          </Button>
        </NavLink>
      </div>
    </nav>
  );
}

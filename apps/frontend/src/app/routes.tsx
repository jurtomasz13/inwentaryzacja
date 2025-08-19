import { Route, Routes as RouterRoutes } from 'react-router';
import { MainLayout } from './components/layouts/main-layout';
import HomePage from './pages/home-page';
import OrdersPage from './pages/orders-page';
import InventoryPage from './pages/inventory/inventory-page';
import ProductsPage from './pages/products-page';
import CategoriesPage from './pages/categories-page';
import RoomsPage from './pages/rooms-page';
import InventoryItemPage from './pages/inventory/inventory-item-page';

export function Routes() {
  return (
    <div>
      <RouterRoutes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/inventory/:id" element={<InventoryItemPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>
      </RouterRoutes>
    </div>
  );
}

export default Routes;

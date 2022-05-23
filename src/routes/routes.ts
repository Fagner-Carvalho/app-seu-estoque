enum AppRoutes {
  Login = '/login',
  Dashboard = '/dashboard',
  ListUsers = '/users/list',
  CreateUsers = '/users/create',
  UpdateUsers = '/users/update/:id',
  ListItems = '/items/list',
  CreateItems = '/items/create',
  UpdateItems = '/items/update/:id',
  ListCategories = '/categories/list',
  CreateCategories = '/categories/create',
  UpdateCategories = '/categories/update/:id',
  ListUnitMeasures = '/unitMeasures/list',
  CreateUnitMeasures = '/unitMeasures/create',
  UpdateUnitMeasures = '/unitMeasures/update/:id',
  ListSuppliers = '/suppliers/list',
  CreateSuppliers = '/suppliers/create',
  UpdateSuppliers = '/suppliers/update/:id',
}

export const HOME = AppRoutes.Login;

export default AppRoutes;

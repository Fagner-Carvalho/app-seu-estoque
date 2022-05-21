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
}

export const HOME = AppRoutes.Login;

export default AppRoutes;

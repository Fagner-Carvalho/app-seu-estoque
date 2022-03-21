enum AppRoutes {
  Login = '/login',
  Dashboard = '/dashboard',
  ListUsers = '/users/list',
  CreateUsers = '/users/create',
  UpdateUsers = '/users/update/:id',
}

export const HOME = AppRoutes.Login;

export default AppRoutes;

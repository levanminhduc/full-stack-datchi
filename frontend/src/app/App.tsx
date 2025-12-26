import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './layouts';
import { HomePage } from '../features/home';
import { EmployeePage } from '../features/employees';
import { TodoPage } from '../features/todos';
import {
  LoginPage,
  RegisterPage,
  ProtectedRoute,
  AuthProvider,
} from '../features/auth';
import { ROUTES } from '../config/routes';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

          {/* Protected routes */}
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Routes>
                    <Route path={ROUTES.HOME} element={<HomePage />} />
                    <Route
                      path={ROUTES.EMPLOYEES}
                      element={<EmployeePage />}
                    />
                    <Route path={ROUTES.TODOS} element={<TodoPage />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './layouts';
import { HomePage } from '../features/home';
import { EmployeePage } from '../features/employees';
import { TodoPage } from '../features/todos';
import { ROUTES } from '../config/routes';

export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.EMPLOYEES} element={<EmployeePage />} />
          <Route path={ROUTES.TODOS} element={<TodoPage />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
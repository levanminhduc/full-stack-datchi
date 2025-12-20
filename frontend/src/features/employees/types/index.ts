export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  status: 'active' | 'inactive' | 'on_leave';
  avatarUrl?: string;
  phone?: string;
  joinedDate: string;
}

export type EmployeeStatus = Employee['status'];

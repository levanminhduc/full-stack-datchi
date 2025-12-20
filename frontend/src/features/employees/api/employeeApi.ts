import { httpClient } from '../../../lib/api/http';
import type { Employee } from '../types';

interface EmployeeListResponse {
  count: number;
  rows: Employee[];
}

export const getEmployees = async (limit: number = 100): Promise<EmployeeListResponse> => {
  return httpClient.get<EmployeeListResponse>(`/meta/employees?limit=${limit}`);
};

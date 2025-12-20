import { httpClient } from '../../../lib/api/http';
import type { Employee } from '../types';

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const getEmployees = async (
  page: number = 1,
  pageSize: number = 20,
): Promise<PaginatedResponse<Employee>> => {
  return httpClient.get<PaginatedResponse<Employee>>(
    `/meta/employees?page=${page}&pageSize=${pageSize}`,
  );
};

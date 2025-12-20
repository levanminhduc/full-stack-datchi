import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';

export interface EmployeeDto {
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

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

@Injectable()
export class MetaService {
  constructor(@Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient) {}

  async getEmployees(page: number, pageSize: number): Promise<PaginatedResponse<EmployeeDto>> {
    const offset = (page - 1) * pageSize;

    const { data, error, count } = await this.supabase
      .from('employees')
      .select('id, employee_id, full_name, department, chuc_vu, phone_number, is_active, created_at', { count: 'exact' })
      .range(offset, offset + pageSize - 1)
      .order('id', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    const total = count ?? 0;
    const transformedData: EmployeeDto[] = (data ?? []).map((emp: any) => {
      const fullName = (emp.full_name || '').trim();
      const nameParts = fullName.split(' ').filter((part: string) => part.length > 0);
      const firstName = nameParts.length > 0 ? nameParts[nameParts.length - 1] : fullName;
      const lastName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : '';

      return {
        id: emp.id,
        firstName: firstName || fullName,
        lastName: lastName || '',
        email: emp.employee_id ? `${emp.employee_id}@company.com` : '',
        position: emp.chuc_vu || 'nhan_vien',
        department: emp.department || '',
        status: (emp.is_active ? 'active' : 'inactive') as 'active' | 'inactive',
        phone: emp.phone_number || undefined,
        joinedDate: emp.created_at ? new Date(emp.created_at).toISOString().split('T')[0] : '',
      };
    });

    return {
      data: transformedData,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }
}

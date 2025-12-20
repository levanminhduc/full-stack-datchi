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

@Injectable()
export class MetaService {
  constructor(@Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient) {}

  async getEmployees(limit: number): Promise<{ count: number; rows: EmployeeDto[] }> {
    const { data, error, count } = await this.supabase
      .from('employees')
      .select('*', { count: 'exact' })
      .limit(limit);
    if (error) {
      throw new Error(error.message);
    }

    const transformedData: EmployeeDto[] = (data ?? []).map((emp: any) => {
      const fullName = (emp.full_name || '').trim();
      const nameParts = fullName.split(' ').filter(part => part.length > 0);

      let firstName = '';
      let lastName = '';

      if (nameParts.length > 0) {
        firstName = nameParts[nameParts.length - 1];
        lastName = nameParts.slice(0, -1).join(' ');
      }

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

    return { count: count ?? 0, rows: transformedData };
  }
}

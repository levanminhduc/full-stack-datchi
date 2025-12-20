import { Chip } from '@mui/material';
import type { EmployeeStatus } from '../types';

interface EmployeeStatusChipProps {
  status: EmployeeStatus;
}

const statusConfig: Record<EmployeeStatus, { label: string; color: 'success' | 'error' | 'warning' | 'default' }> = {
  active: { label: 'Active', color: 'success' },
  inactive: { label: 'Inactive', color: 'error' },
  on_leave: { label: 'On Leave', color: 'warning' },
};

export const EmployeeStatusChip = ({ status }: EmployeeStatusChipProps) => {
  const config = statusConfig[status] || { label: status, color: 'default' };

  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      variant="outlined"
      sx={{ fontWeight: 500 }}
    />
  );
};

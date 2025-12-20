import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { Employee } from '../types';
import { EmployeeStatusChip } from './EmployeeStatusChip';

interface EmployeeListProps {
  employees: Employee[];
  onEdit?: (employee: Employee) => void;
  onDelete?: (id: number) => void;
}

export const EmployeeList = ({ employees, onEdit, onDelete }: EmployeeListProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (employees.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">Không tìm thấy nhân viên nào.</Typography>
      </Box>
    );
  }

  if (isMobile) {
    return (
      <Stack spacing={2}>
        {employees.map((employee) => (
          <Card key={employee.id} variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Avatar
                    src={employee.avatarUrl}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    sx={{ width: 56, height: 56 }}
                  >
                    {employee.firstName[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" component="div">
                      {employee.firstName} {employee.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {employee.position}
                    </Typography>
                  </Box>
                </Box>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>
              
              <Stack spacing={1} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Department:</Typography>
                  <Typography variant="body2">{employee.department}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Status:</Typography>
                  <EmployeeStatusChip status={employee.status} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Email:</Typography>
                  <Typography variant="body2">{employee.email}</Typography>
                </Box>
              </Stack>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, pt: 1, borderTop: 1, borderColor: 'divider' }}>
                <IconButton size="small" onClick={() => onEdit?.(employee)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={() => onDelete?.(employee.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 650 }} aria-label="employee table">
        <TableHead>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow
              key={employee.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover
            >
              <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={employee.avatarUrl} alt={employee.firstName}>
                    {employee.firstName[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">
                      {employee.firstName} {employee.lastName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: {employee.id}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>
                <EmployeeStatusChip status={employee.status} />
              </TableCell>
              <TableCell>
                <Typography variant="body2">{employee.email}</Typography>
                {employee.phone && (
                  <Typography variant="caption" color="text.secondary">
                    {employee.phone}
                  </Typography>
                )}
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Edit">
                  <IconButton onClick={() => onEdit?.(employee)} size="small">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => onDelete?.(employee.id)} size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

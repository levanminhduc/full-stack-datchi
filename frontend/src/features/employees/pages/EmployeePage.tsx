import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Stack,
  Select,
  FormControl,
  InputLabel,
  Paper,
  CircularProgress,
  Box,
  Pagination,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { EmployeeList } from '../components';
import { getEmployees } from '../api';
import type { Employee } from '../types';

const PAGE_SIZE = 20;

export const EmployeePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchEmployees = useCallback(async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await getEmployees(pageNum, PAGE_SIZE);
      setEmployees(response.data);
      setTotalPages(response.totalPages);
      setTotal(response.total);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees(page);
  }, [page, fetchEmployees]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [employees, searchTerm, statusFilter]);

  const handleEdit = (employee: Employee) => {
    alert(`Edit ${employee.firstName} ${employee.lastName}`);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa nhân viên này?')) {
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Nhân viên
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tổng cộng {total} nhân viên
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />}>
          Thêm nhân viên
        </Button>
      </Stack>

      <Paper sx={{ p: 2, mb: 3 }} variant="outlined">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            placeholder="Tìm kiếm nhân viên..."
            size="small"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: { md: 400 } }}
          />

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={statusFilter}
              label="Trạng thái"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="active">Đang làm việc</MenuItem>
              <MenuItem value="inactive">Nghỉ việc</MenuItem>
              <MenuItem value="on_leave">Nghỉ phép</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      <EmployeeList
        employees={filteredEmployees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Container>
  );
};

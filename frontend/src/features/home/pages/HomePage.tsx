import { Container, Typography, Box, Stack } from '@mui/material';
import { StatCard, QuickActions } from '../components';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const HomePage = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Trang chủ
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Chào mừng bạn đến với hệ thống quản lý nhân sự
        </Typography>
      </Box>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 4 }}>
        <Box sx={{ flex: 1 }}>
          <StatCard
            title="Tổng nhân viên"
            value="24"
            icon={<PeopleIcon />}
            color="primary"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <StatCard
            title="Công việc"
            value="12"
            icon={<AssignmentIcon />}
            color="info"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <StatCard
            title="Hoàn thành"
            value="8"
            icon={<CheckCircleIcon />}
            color="success"
          />
        </Box>
      </Stack>

      <QuickActions />
    </Container>
  );
};


import { Container, Typography, Box, Grid } from '@mui/material';
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

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Tổng nhân viên"
            value="24"
            icon={<PeopleIcon />}
            color="primary"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Công việc"
            value="12"
            icon={<AssignmentIcon />}
            color="info"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Hoàn thành"
            value="8"
            icon={<CheckCircleIcon />}
            color="success"
          />
        </Grid>
      </Grid>

      <QuickActions />
    </Container>
  );
};


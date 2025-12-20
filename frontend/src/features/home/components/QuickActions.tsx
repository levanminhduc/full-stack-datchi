import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddIcon from '@mui/icons-material/Add';
import { ROUTES } from '../../../config/routes';

export const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Quản lý nhân viên',
      description: 'Xem và quản lý danh sách nhân viên',
      icon: <PeopleIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />,
      color: 'primary' as const,
      onClick: () => navigate(ROUTES.EMPLOYEES),
    },
    {
      title: 'Quản lý công việc',
      description: 'Xem và quản lý danh sách công việc',
      icon: <AssignmentIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />,
      color: 'info' as const,
      onClick: () => navigate(ROUTES.TODOS),
    },
  ];

  return (
    <Box>
      <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
        Truy cập nhanh
      </Typography>
      <Grid container spacing={3}>
        {actions.map((action) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={action.title}>
            <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={action.onClick}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: { xs: 48, sm: 64 },
                      height: { xs: 48, sm: 64 },
                      borderRadius: 2,
                      bgcolor: `${action.color}.main`,
                      color: `${action.color}.contrastText`,
                      mr: 2,
                    }}
                  >
                    {action.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {action.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {action.description}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  color={action.color}
                  startIcon={<AddIcon />}
                  fullWidth
                >
                  Truy cập
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};


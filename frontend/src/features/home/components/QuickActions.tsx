import { Card, CardContent, Typography, Button, Box, Stack } from '@mui/material';
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
      icon: <PeopleIcon fontSize="large" />,
      color: 'primary' as const,
      onClick: () => navigate(ROUTES.EMPLOYEES),
    },
    {
      title: 'Quản lý công việc',
      description: 'Xem và quản lý danh sách công việc',
      icon: <AssignmentIcon fontSize="large" />,
      color: 'info' as const,
      onClick: () => navigate(ROUTES.TODOS),
    },
  ];

  return (
    <Box>
      <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
        Truy cập nhanh
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
        {actions.map((action) => (
          <Box key={action.title} sx={{ flex: 1 }}>
            <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={action.onClick}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 64,
                      height: 64,
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
          </Box>
        ))}
      </Stack>
    </Box>
  );
};


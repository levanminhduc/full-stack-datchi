import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { useTodos } from '../hooks';
import { TodoForm, TodoList } from '../components';
import type { Todo } from '../types';

export const TodoPage = () => {
  const { todos, loading, createTodo, updateTodo, deleteTodo } = useTodos();

  const handleToggle = async (todo: Todo) => {
    await updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Quản lý công việc
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Danh sách các công việc cần thực hiện
        </Typography>
      </Box>

      <TodoForm onSubmit={createTodo} loading={loading} />

      {loading && todos.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
      )}
    </Container>
  );
};


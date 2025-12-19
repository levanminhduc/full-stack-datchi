import { Container, Typography, Box, IconButton, CircularProgress } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTodos } from '../hooks';
import { TodoForm, TodoList } from '../components';
import type { Todo } from '../types';

interface TodoPageProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const TodoPage = ({ darkMode, onToggleDarkMode }: TodoPageProps) => {
  const { todos, loading, createTodo, updateTodo, deleteTodo } = useTodos();

  const handleToggle = async (todo: Todo) => {
    await updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h3" component="h1">
          Todo List
        </Typography>
        <IconButton onClick={onToggleDarkMode} color="inherit">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
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


import { ListItem, Checkbox, IconButton, Typography, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <Paper sx={{ mb: 1 }}>
      <ListItem
        secondaryAction={
          <IconButton edge="end" onClick={() => onDelete(todo.id)}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <Checkbox
          checked={todo.completed}
          onChange={() => onToggle(todo)}
        />
        <Typography
          sx={{
            flex: 1,
            textDecoration: todo.completed ? 'line-through' : 'none',
          }}
        >
          {todo.title}
        </Typography>
      </ListItem>
    </Paper>
  );
};


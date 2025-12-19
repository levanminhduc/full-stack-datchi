import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import type { CreateTodoDto } from '../types';

interface TodoFormProps {
  onSubmit: (data: CreateTodoDto) => Promise<void>;
  loading?: boolean;
}

export const TodoForm = ({ onSubmit, loading }: TodoFormProps) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    await onSubmit({ title });
    setTitle('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, display: 'flex', gap: 1 }}>
      <TextField
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new todo..."
        disabled={loading}
      />
      <Button 
        type="submit" 
        variant="contained" 
        sx={{ minWidth: 100 }}
        disabled={loading || !title.trim()}
      >
        Add
      </Button>
    </Box>
  );
};


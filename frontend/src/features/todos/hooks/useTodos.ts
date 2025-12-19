import { useState, useEffect } from 'react';
import { todoApi } from '../api';
import type { Todo, CreateTodoDto, UpdateTodoDto } from '../types';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await todoApi.getAll();
      setTodos(data);
    } catch (err) {
      setError('Error loading todos');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (data: CreateTodoDto) => {
    setLoading(true);
    setError(null);
    try {
      await todoApi.create(data);
      await loadTodos();
    } catch (err) {
      setError('Error creating todo');
      console.error('Error creating todo:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id: number, data: UpdateTodoDto) => {
    setLoading(true);
    setError(null);
    try {
      await todoApi.update(id, data);
      await loadTodos();
    } catch (err) {
      setError('Error updating todo');
      console.error('Error updating todo:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await todoApi.delete(id);
      await loadTodos();
    } catch (err) {
      setError('Error deleting todo');
      console.error('Error deleting todo:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    refreshTodos: loadTodos,
  };
};


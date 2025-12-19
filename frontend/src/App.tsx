import { useState, useEffect } from 'react'
import { todoApi, type Todo } from './api'
import { Container, Typography, TextField, Button, List, ListItem, Checkbox, IconButton, Paper, Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTitle, setNewTitle] = useState('')

  useEffect(() => {
    loadTodos()
  }, [])

  const loadTodos = async () => {
    try {
      const data = await todoApi.getAll()
      setTodos(data)
    } catch (err) {
      console.error('Error loading todos:', err)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    try {
      await todoApi.create(newTitle)
      setNewTitle('')
      loadTodos()
    } catch (err) {
      console.error('Error adding todo:', err)
    }
  }

  const handleToggle = async (todo: Todo) => {
    try {
      await todoApi.update(todo.id, { completed: !todo.completed })
      loadTodos()
    } catch (err) {
      console.error('Error updating todo:', err)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await todoApi.delete(id)
      loadTodos()
    } catch (err) {
      console.error('Error deleting todo:', err)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Todo List
      </Typography>

      <Box component="form" onSubmit={handleAdd} sx={{ mb: 3, display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add new todo..."
          variant="outlined"
        />
        <Button type="submit" variant="contained" sx={{ minWidth: 100 }}>
          Add
        </Button>
      </Box>

      {todos.length === 0 ? (
        <Typography color="text.secondary">No todos yet. Add one above!</Typography>
      ) : (
        <List>
          {todos.map((todo) => (
            <Paper key={todo.id} sx={{ mb: 1 }}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleDelete(todo.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={() => handleToggle(todo)}
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
          ))}
        </List>
      )}
    </Container>
  )
}

export default App

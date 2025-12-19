const API_URL = 'http://localhost:3000/todos';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const todoApi = {
  getAll: async (): Promise<Todo[]> => {
    const res = await fetch(API_URL);
    return res.json();
  },

  create: async (title: string): Promise<Todo> => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    return res.json();
  },

  update: async (id: number, data: Partial<Todo>): Promise<Todo> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  delete: async (id: number): Promise<void> => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  },
};


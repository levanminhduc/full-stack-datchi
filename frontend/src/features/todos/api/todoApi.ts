import { httpClient } from '../../../lib/api/http';
import type { Todo, CreateTodoDto, UpdateTodoDto } from '../types';

const TODOS_ENDPOINT = '/todos';

export const todoApi = {
  getAll: async (): Promise<Todo[]> => {
    return httpClient.get<Todo[]>(TODOS_ENDPOINT);
  },

  getById: async (id: number): Promise<Todo> => {
    return httpClient.get<Todo>(`${TODOS_ENDPOINT}/${id}`);
  },

  create: async (data: CreateTodoDto): Promise<Todo> => {
    return httpClient.post<Todo>(TODOS_ENDPOINT, data);
  },

  update: async (id: number, data: UpdateTodoDto): Promise<Todo> => {
    return httpClient.put<Todo>(`${TODOS_ENDPOINT}/${id}`, data);
  },

  delete: async (id: number): Promise<void> => {
    return httpClient.delete<void>(`${TODOS_ENDPOINT}/${id}`);
  },
};


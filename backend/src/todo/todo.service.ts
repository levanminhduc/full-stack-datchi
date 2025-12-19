import { Injectable } from '@nestjs/common';
import { Todo } from './todo.interface';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private idCounter = 1;

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  create(createTodoDto: CreateTodoDto): Todo {
    const todo: Todo = {
      id: this.idCounter++,
      title: createTodoDto.title,
      completed: false,
    };
    this.todos.push(todo);
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo | null {
    const todo = this.findOne(id);
    if (!todo) return null;
    if (updateTodoDto.title !== undefined) todo.title = updateTodoDto.title;
    if (updateTodoDto.completed !== undefined) todo.completed = updateTodoDto.completed;
    return todo;
  }

  remove(id: number): boolean {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return false;
    this.todos.splice(index, 1);
    return true;
  }
}


export class CreateTodoDto {
  title: string;
}

export class UpdateTodoDto {
  title?: string;
  completed?: boolean;
}


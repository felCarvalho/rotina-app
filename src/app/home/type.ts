export interface PostTask {
  titleTask: string;
  descriptionTask: string;
  titleCategory: string;
  descriptionCategory: string;
}

export type createTaskResponse = { data: string; success: boolean };

export interface Task {
  id: string;
  title: string;
  description: string;
  category: Category;
  user: User;
  createAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  status: 'incompleta' | 'concluida';
}

export interface Category {
  id: string;
  title: string;
  description: string;
  user: string;
  createAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface User {
  id: string;
  name: string;
  createAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

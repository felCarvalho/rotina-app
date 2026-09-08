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
  user: string;
  created: Date;
  updated: Date;
  deleted: Date | null;
  status: 'incompleta' | 'concluida';
}

export interface Category {
  id: string;
  title: string;
  description: string;
  user: string;
  created: Date;
  updated: Date;
  deleted: Date | null;
}

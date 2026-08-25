export interface PostTask {
  titleTask: string;
  descriptionTask: string;
  titleCategory: string;
  descriptionCategory: string;
}

export type createTaskResponse = { data: string; success: boolean };

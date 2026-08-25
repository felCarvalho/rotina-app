import { inject, Service } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { createTaskResponse, PostTask } from '../type';

@Service()
export class TaskService {
  private httpClient = inject(HttpClient);
  private httpResource = httpResource;

  createTask(body: PostTask) {
    return this.httpClient.post<PostTask>(`${environments.apiUrl}task/create`, {
      ...body,
    });
  }
}

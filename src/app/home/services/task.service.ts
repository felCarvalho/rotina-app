import { inject, Service } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { createTaskResponse, PostTask, Task } from '../type';

@Service()
export class TaskService {
  private httpClient = inject(HttpClient);
  private httpResource = httpResource;

  public createTask(body: PostTask) {
    return this.httpClient.post<PostTask>(`${environments.apiUrl}task/create`, {
      ...body,
    }, {
      credentials: 'include',
    });
  }

  public getAllTasks() {
    return this.httpClient.get<Task[]>(`${environments.apiUrl}task/all`, {
      credentials: 'include',
    });
  }
  
}

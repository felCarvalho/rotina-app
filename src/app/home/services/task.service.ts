import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PostTask, Task } from '../type';

@Service()
export class TaskService {
  private httpClient = inject(HttpClient);

  public createTask(body: PostTask) {
    return this.httpClient.post<{ data: string; success: boolean }>(
      `${environment.apiUrl}task/create`,
      {
        ...body,
      },
      {
        credentials: 'include',
      },
    );
  }

  public getAllTasks() {
    return this.httpClient.get<Task[]>(`${environment.apiUrl}task/all/user`, {
      credentials: 'include',
    });
  }

  public updateTitle(taskId: string, title: string) {
    return this.httpClient.patch<{
      data: string;
      error: string;
      success: boolean;
    }>(
      `${environment.apiUrl}task/update/title/${taskId}`,
      { title },
      {
        credentials: 'include',
      },
    );
  }

  public updateTaskStatus(taskId: string, status: 'incompleta' | 'concluida') {
    return this.httpClient.patch<{ data: string; success: boolean }>(
      `${environment.apiUrl}task/update/status/${taskId}`,
      { status },
      {
        credentials: 'include',
      },
    );
  }

  public deleteTask(taskId: string) {
    return this.httpClient.delete<{
      data: string;
      error: string;
      success: boolean;
    }>(`${environment.apiUrl}task/delete/${taskId}`, {
      credentials: 'include',
    });
  }
}

import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { loginResponse, PostLogin } from '../type';

@Service()
export class AuthService {
  private httpClient = inject(HttpClient);

  postLogin({ body }: { body: PostLogin }) {
    return this.httpClient.post<loginResponse>(`${environments.apiUrl}auth/login`, {
      ...body,
    });
  }
}

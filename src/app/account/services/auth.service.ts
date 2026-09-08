import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { loginResponse, PostLogin } from '../type';
import { LocalStorageUtil } from '../../utils/local-storage/local.storage';

@Service()
export class AuthService {
  private httpClient = inject(HttpClient);

  public verifySessionId() {
    const sessionId = LocalStorageUtil.getItem('sessionId');

    if (!sessionId.success) return false;
    return true;
  }

  public postLogin({ body }: { body: PostLogin }) {
    return this.httpClient.post<loginResponse>(
      `${environments.apiUrl}auth/login`,
      {
        ...body,
      },
      {
        responseType: 'text',
        credentials: 'include',
      },
    );
  }

  public postRefreshToken() {
    return this.httpClient.post(
      `${environments.apiUrl}auth/refresh`,
      {},
      {
        credentials: 'include',
        responseType: 'text',
      },
    );
  }
}

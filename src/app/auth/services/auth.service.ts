import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PostLogin, LoginResponse } from '../type';
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
    return this.httpClient.post<LoginResponse>(
      `${environment.apiUrl}auth/login`,
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
      `${environment.apiUrl}auth/refresh`,
      {},
      {
        credentials: 'include',
        responseType: 'text',
      },
    );
  }
}

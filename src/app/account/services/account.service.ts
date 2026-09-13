import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { createUserResponse, getUserResponse, PostUser } from '../type';

@Service()
export class UserService {
  private httpClient = inject(HttpClient);

  postUser({ body }: { body: PostUser }) {
    return this.httpClient.post<createUserResponse>(
      `${environments.apiUrl}account/create`,
      {
        ...body,
      },
    );
  }

  public getUser() {
    return this.httpClient.get<getUserResponse>(
      `${environments.apiUrl}info/user`,
      { credentials: 'include' },
    );
  }

  public logOut() {
    return this.httpClient.post(
      `${environments.apiUrl}auth/logout`,
      {},
      { credentials: 'include' },
    );
  }
}

//Analise esse texto para poder ver as propriedas que o httpResource aceita
/*
user = httpResource(() => ({
  url: `/api/user/${userId()}`,
  method: 'GET',
  headers: {
    'X-Special': 'true',
  },
  params: {
    'fast': 'yes',
  },
  reportProgress: true,
  transferCache: true,
  keepalive: true,
  mode: 'cors',
  redirect: 'error',
  priority: 'high',
  cache: 'force-cache',
  credentials: 'include',
  referrer: 'no-referrer',
  integrity: 'sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GhEXAMPLEKEY=',
  referrerPolicy: 'no-referrer',
}));*/

import { inject, Service } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { createUserResponse, PostUser } from '../type';

@Service()
export class UserService {
  private httpClient = inject(HttpClient);
  private httpResource = httpResource;

  postUser({ body }: { body: PostUser }) {
    return this.httpClient.post<createUserResponse>(`${environments.apiUrl}account/create`, {
      ...body,
    });
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

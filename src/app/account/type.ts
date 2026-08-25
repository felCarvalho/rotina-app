export interface PostUser {
  name: string;
  identifier: string;
  password: string;
  repeatPassword: string;
}

export type createUserResponse = { data: string; error: string; success: boolean };

export interface PostLogin {
  identifier: string;
  password: string;
}

export type loginResponse = { data: string; error: string; success: boolean };

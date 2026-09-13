export interface PostUser {
  name: string;
  identifier: string;
  password: string;
  repeatPassword: string;
}

export type createUserResponse = {
  data: string;
  success: boolean;
};

export type getUserResponse = {
  data: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    identifier: string;
  };
  success: boolean;
};

export type User = {
  username: string;
  email: string;
  password: string;
};

export type UserLoginBody = {
  email: string;
  password: string;
};

export type UserDbType = {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type postContentType = {
  type: "header" | "text" | "image";
  content: string;
};

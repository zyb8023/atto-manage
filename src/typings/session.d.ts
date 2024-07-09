import 'express-session';

interface IUser {
  username: string;
  roles?: Array<number>;
}

declare module 'express-session' {
  interface SessionData {
    user?: IUser;
    // 你可以在这里添加其他会话属性
  }
}

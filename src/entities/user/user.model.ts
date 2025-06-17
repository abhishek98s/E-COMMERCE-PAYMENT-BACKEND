export interface UserModel {
  user_id?: string;
  username: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}

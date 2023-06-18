export interface User {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
  role: string;
}

export enum UserRole {
  User = 'User',
  Admin = 'Admin',
}
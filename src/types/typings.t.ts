import type { ReactNode } from 'react';

/**
 * Common Types
 */
interface Reusable {
  id: number;
}

/**
 * Auth Types and Interfaces
 */
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPassword {
  email: string;
}

export type PasswordUpdate = {
  password: string;
  confirmPassword: string;
};

/**
 * User Types and Interfaces
 */
export interface APIUser extends Reusable {
  attributes: {
    name: string;
    email: string;
  };
  relationships: {
    paths: APIPath[];
  };
}

export interface User extends Reusable {
  role: string;
}

/**
 * UI Types
 */
export type Route = {
  inactiveIcon?: ReactNode;
  activeIcon?: ReactNode;
  name?: string;
  to: string;
};

export type SelectionOption = {
  name: string;
  value: string;
};

/**
 * Home Page Types
 */
export type Data = {
  title: string;
  icon: string;
  content: string;
  bg: string;
  contentBg: string;
};

/**
 * Paths Types
 */
export type Path = {
  user_id: number;
  path: string;
};

export type APIPath = {
  id: number;
  attributes: {
    path: string;
  };
};

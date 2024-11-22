
export interface LoginRequest {
  userName: string,
  password: string
}

export interface LoginResponse {
  accessToken: string,
  user: Users,
}

export interface Users {
  id: number;
  username: string;
  roles: string[];
}


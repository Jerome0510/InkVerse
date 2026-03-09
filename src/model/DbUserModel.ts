export interface DbUser {
  id: number;
  pseudo: string;
  avatar: string;
  email: string;
  provider: string;
  provider_id: string;
  role: string;
  created_at: Date;
}

export default DbUser;

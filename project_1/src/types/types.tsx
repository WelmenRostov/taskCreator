export interface Post {
  id: number;
  count?: number;
  title: string;
  text: string;
  data: string;
  status: 'pending' | 'fulfilled' | 'rejected';
  editable?: boolean;
}

export type TStatus = 'pending' | 'fulfilled' | 'rejected';

export interface zapros {
  page: number;
  limit: number;
  status: TStatus;
}

export interface Post {
  id: number;
  count?: number;
  title: string;
  text: string;
  data: string;
  conditionTasks: 'pending' | 'fulfilled' | 'rejected';
  editable?: boolean;
}

export interface SaveEditorParams {
  id: number;
  title?: string;
  text?: string;
}

export interface ApiResponse {
  data: Post; // озвращаемый объект — это один пост, а не массив
  totalPages: number;
  page: number;
}

const colorDarkText = 'dark:text-zinc-200 dark:bg-gray-800';
const colorWitheText = 'text-zinc-800 bg-zinc-300 ';

export const fonColor = 'dark:bg-gray-950/10 bg-gray-800';

export const colorShadow =
  'shadow-lg dark:shadow-indigo-500/50 shadow-zinc-100/50 border-zinc-800 border-2 dark:border-indigo-600';
export const colorBase = colorDarkText + ' ' + colorWitheText;

export const API_URL = 'http://localhost:3002';

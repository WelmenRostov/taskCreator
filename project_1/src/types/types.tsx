export interface Post {
    id: number,
    count?: number,
    title: string,
    text: string,
    data: Date,
    status: 'pending' | 'fulfilled' | 'rejected' | 'editor';
}
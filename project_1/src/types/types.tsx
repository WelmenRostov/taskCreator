export interface Post {
    id: number,
    count?: number,
    title: string,
    text: string,
    data: Date,
    status: 'pending' | 'fulfilled' | 'rejected' | 'editor';
}
/**
 * Интерфейс значений контекста задач
 */
export interface PostContextType {
    posts: Post[];                                  // Список всех постов
    modal: boolean;                                 // Состояние модального окна
    setModal: (state: boolean) => void;             // Функция открытия/закрытия модалки
    handleSave: (post: Post) => void;               // Добавление/сохранение поста
    handleAddPost: (post: Post) => void;            // Добавление нового поста
    removePost: (id: number) => void;               // Удаление поста
    updatePost: (id: number, updatedPost: Post) => void; // Полное обновление поста
    updateStatus: (id: number, updatedPost: Post) => void; // Только статус
}



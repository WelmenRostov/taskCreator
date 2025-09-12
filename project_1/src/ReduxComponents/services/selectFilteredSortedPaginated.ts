import { createSelector } from '@reduxjs/toolkit';
import type { RootState2 } from '../../app/store';
import type { Post } from '../type/type';

export const selectFilteredSortedPaginated = createSelector(
  (state: RootState2) => state.todo.items,
  (state: RootState2) => state.todo.searchText,
  (state: RootState2) => state.todo.filterStatus,
  (state: RootState2) => state.todo.sortBy,
  (state: RootState2) => state.todo.page,
  (state: RootState2) => state.todo.limit,
  (items: Post[], searchText, filterStatus, sortBy, page, limit) => {
    console.log('items', items);
    let filtered = [...items];
    console.log('filtered 1', filtered);
    // Фильтр по статусу
    if (filterStatus) {
      filtered = filtered.filter((item) => item.conditionTasks === filterStatus);
    }

    console.log('filtered 2', filtered);
    // Поиск по тексту и заголовку
    const search = searchText?.trim().toLowerCase() ?? '';
    if (search) {
      filtered = filtered.filter(
        (item) => item.title.toLowerCase().includes(search) || item.text.toLowerCase().includes(search)
      );
    }

    console.log('filtered 3', filtered);
    // Сортировка
    filtered.sort((a, b) => {
      if (sortBy === 'new') return new Date(b.data).getTime() - new Date(a.data).getTime();
      if (sortBy === 'old') return new Date(a.data).getTime() - new Date(b.data).getTime();
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'text') return a.text.localeCompare(b.text);
      return 0;
    });
    console.log('page', page, 'limit', limit, 'filtered.length', filtered.length);
    console.log('filtered 4', filtered);
    // Пагинация
    return filtered;
  }
);

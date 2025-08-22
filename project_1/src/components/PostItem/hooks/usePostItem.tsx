import React, { useState } from 'react';
import type { Post } from '../../../types/types';
import { useAppDispatch } from '../../../context/usePostContext';
import { updatePostThunk } from '../../../features/postReducer/postThunks';

interface Props extends Post {
  index: number;
  removePost: (id: number) => void;
}

export const usePostItem = (props: Props) => {
  const { id, text, title, status } = props;
  const dispatch = useAppDispatch();

  const [editableTitle, setEditableTitle] = useState(title);
  const [editableText, setEditableText] = useState(text);

  // Завершить задачу
  const fulfilledStatus = async () => {
    await dispatch(
      updatePostThunk({
        id,
        status: 'fulfilled',
      })
    );
  };

  // Отклонить задачу
  const rejectedStatus = async () => {
    await dispatch(
      updatePostThunk({
        id,
        status: 'rejected',
      })
    );
  };

  // Восстановить задачу в статус "pending"
  const recoverStatus = async () => {
    await dispatch(
      updatePostThunk({
        id,
        status: 'pending',
      })
    );
  };

  const handleSave = async () => {
    await dispatch(
      updatePostThunk({
        id,
        title: editableTitle,
        text: editableText,
        status: 'pending',
      })
    );
  };

  // Отменить редактирование (оставить как было)
  const handleNoSave = () => {
    dispatch(
      updatePostThunk({
        id,
        title,
        text,
        status,
      })
    );
  };

  // Обновление локального состояния при вводе текста
  const handleSetEditableTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableTitle(e.target.value);
  };

  const handleSetEditableText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableText(e.target.value);
  };

  return {
    handleSetEditableText,
    handleSetEditableTitle,
    handleSave,
    handleNoSave,
    recoverStatus,
    fulfilledStatus,
    rejectedStatus,
    editableTitle,
    editableText,
  };
};

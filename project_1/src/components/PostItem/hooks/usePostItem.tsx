import React, { useState } from 'react';
import type { Post } from '../../../types/types';

interface Props extends Post {
  index: number;
  removePost: (id: number) => void;
  updatePost: (id: number, updatedPost: Post) => void;
  updateStatus: (id: number, updatedPost: Post) => void;
}

export const usePostItem = (props: Props) => {
  const { id, data, text, title, editable, status, updatePost, updateStatus } = props;
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableText, setEditableText] = useState(text);

  const changeStatus = () => {
    const updatedPost: Post = {
      id,
      title,
      text,
      data,
      editable: true,
      status: 'pending',
    };
    updatePost(id, updatedPost);
  };

  const fulfilledStatus = () => {
    const updatedPost: Post = {
      id,
      title,
      text,
      data,
      status: 'fulfilled',
      editable,
    };
    updateStatus(id, updatedPost);
  };

  const rejectedStatus = () => {
    const updatedPost: Post = {
      id,
      title,
      text,
      data,
      status: 'rejected',
      editable,
    };
    updateStatus(id, updatedPost);
  };

  const recoverStatus = () => {
    const updatedPost: Post = {
      id,
      title,
      text,
      data,
      status: 'pending',
      editable,
    };
    updateStatus(id, updatedPost);
  };

  const handleSave = () => {
    const updatedPost: Post = {
      id,
      title: editableTitle,
      text: editableText,
      data,
      status: 'pending',
      editable: false,
    };
    updatePost(id, updatedPost);
  };

  const handleNoSave = () => {
    const updatedPost: Post = {
      id,
      title,
      text,
      data,
      status,
      editable: false,
    };
    updatePost(id, updatedPost);
  };

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
    changeStatus,
    editableTitle,
    editableText,
  };
};

import { useState } from 'react';
import PostItemEditor from './PostItemEditor';
import type { Post } from '../../types/types';
import PostItemPending from './PostItemPending';
import PostItemfulFilled from './PostItemFulfild';
import PostItemRejected from './PostItemRejected';

interface Props extends Post {
  index: number;
  removePost: (id: number) => void;
  updatePost: (id: number, updatedPost: Post) => void;
  updateStatus: (id: number, updatedPost: Post) => void;
}

export const PostItem = (props: Props) => {
  const { id, data, text, title, index, removePost, status, updatePost, updateStatus } = props;
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableText, setEditableText] = useState(text);
  console.log('editableTitle', editableTitle);

  const changeStatus = () => {
    const updatedPost: Post = {
      id,
      title,
      text,
      data,
      status: 'editor',
    };
    updateStatus(id, updatedPost);
  };
  const fulfilledStatus = () => {
    const updatedPost: Post = {
      id,
      title,
      text,
      data,
      status: 'fulfilled',
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
    };
    updatePost(id, updatedPost);
  };

  const handleNoSave = () => {
    const updatedPost: Post = {
      id,
      title,
      text,
      data,
      status: 'pending',
    };
    updatePost(id, updatedPost);
  };

  const visibles = 'vse';
  if (visibles == 'vse') {
    return (
      <>
        {status == 'editor' && (
          <PostItemEditor
            handleSave={handleSave}
            handleNoSave={handleNoSave}
            setEditableText={setEditableText}
            setEditableTitle={setEditableTitle}
            editableTitle={editableTitle}
            editableText={editableText}
            {...props}
          />
        )}
        {status == 'fulfilled' && (
          <PostItemfulFilled
            fulfilledStatus={fulfilledStatus}
            changeStatus={changeStatus}
            index={index}
            removePost={removePost}
            text={text}
            data={data}
            id={id}
            title={title}
          />
        )}
        {status == 'pending' && (
          <PostItemPending
            fulfilledStatus={fulfilledStatus}
            changeStatus={changeStatus}
            index={index}
            removePost={removePost}
            text={text}
            data={data}
            id={id}
            title={title}
          />
        )}
        {status == 'rejected' && (
          <PostItemRejected
            fulfilledStatus={fulfilledStatus}
            changeStatus={changeStatus}
            index={index}
            removePost={removePost}
            text={text}
            data={data}
            id={id}
            title={title}
          />
        )}
      </>
    );
  }
};

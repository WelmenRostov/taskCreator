import PostItemEditor from './PostItemEditor';
import type { Post } from '../../types/types';
import PostItemPending from './PostItemPending';
import PostItemfulFilled from './PostItemFulfild';
import PostItemRejected from './PostItemRejected';
import { usePostItem } from './hooks/usePostItem';

interface Props extends Post {
  index: number;
  removePost: (id: number) => void;
  updatePost: (id: number, updatedPost: Post) => void;
  updateStatus: (id: number, updatedPost: Post) => void;
}

export const PostItem = (props: Props) => {
  const { id, data, text, title, index, editable, removePost, status } = props;
  const {
    handleSetEditableTitle,
    handleSetEditableText,
    handleNoSave,
    handleSave,
    fulfilledStatus,
    rejectedStatus,
    recoverStatus,
    changeStatus,
    editableTitle,
    editableText,
  } = usePostItem(props);

  console.log('!status', status, title);

  return (
    <>
      {editable && (
        <PostItemEditor
          handleSave={handleSave}
          handleNoSave={handleNoSave}
          handleSetEditableText={handleSetEditableText}
          handleSetEditableTitle={handleSetEditableTitle}
          editableTitle={editableTitle}
          editableText={editableText}
          {...props}
        />
      )}
      {status == 'pending' && !editable && (
        <PostItemPending
          fulfilledStatus={fulfilledStatus}
          changeStatus={changeStatus}
          index={index}
          rejectedStatus={rejectedStatus}
          text={text}
          data={data}
          id={id}
          title={title}
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
      {status == 'rejected' && (
        <PostItemRejected
          fulfilledStatus={fulfilledStatus}
          changeStatus={changeStatus}
          index={index}
          recoverStatus={recoverStatus}
          text={text}
          data={data}
          id={id}
          title={title}
        />
      )}
    </>
  );
};

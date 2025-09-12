import React from 'react';
import type { Post } from '../types/types';
import PostItemPending from './PostItems/PostItemPending';
import PostItemEditor from './PostItems/PostItemEditor';

interface PostItemProps extends Post {
  order: number;
}

const PostItem = React.memo(({ order, ...props }: PostItemProps) => {
  const { conditionTasks, editable } = props;

  return (
    <>
      {editable && <PostItemEditor {...props} order={order} />}
      {conditionTasks === 'pending' && !editable && <PostItemPending {...props} order={order} />}
    </>
  );
});

export default PostItem;

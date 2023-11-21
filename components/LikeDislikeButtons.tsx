// components/LikeDislikeButtons.tsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { incrementLikes, incrementDislikes } from '../store/features/likeDislikeSlice';

interface LikeDislikeButtonsProps {
  postId: number;
}

const LikeDislikeButtons: React.FC<LikeDislikeButtonsProps> = ({ postId }) => {
  const dispatch = useDispatch();
  const { likes, dislikes } = useSelector((state: RootState) => state.likeDislike[postId] || { likes: 0, dislikes: 0 });

  return (
    <div>
      <button onClick={() => dispatch(incrementLikes(postId))}>
        Like ({likes})
      </button>
      <button onClick={() => dispatch(incrementDislikes(postId))}>
        Dislike ({dislikes})
      </button>
    </div>
  );
};

export default LikeDislikeButtons;

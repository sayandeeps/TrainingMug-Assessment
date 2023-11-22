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
  const isLiked = likes > 0;

  const handleLikeDislike = () => {
    if (isLiked) {
      dispatch(incrementDislikes(postId));
    } else {
      dispatch(incrementLikes(postId));
    }
  };

  return (
    <button
      type="button"
      onClick={handleLikeDislike}
      className={`text-white font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 ${
        isLiked
          ? 'bg-red-500 hover:bg-red-600 focus:ring-red-300 border border-red-500'
          : 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 border border-blue-700'
      }`}
    >
      {isLiked ? (
    
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-thumbs-down"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
  )}
      {/* <span className="sr-only">{isLiked ? 'Dislike' : 'Like'}</span> ({isLiked ? dislikes : likes}) */}
    </button>
  );
};

export default LikeDislikeButtons;

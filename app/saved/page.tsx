// Import necessary dependencies
import { useEffect, useState } from 'react';
import { RootState } from '../../store/store';
import { savePost, unsavePost } from "../../store/features/savedPostsSlice";
import { useDispatch, useSelector } from "react-redux";
import LikeDislikeButtons from '../../components/LikeDislikeButtons';
import SearchBar from '../../components/SearchBar';



interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const SavedPostsPage = () => {
  const [searchedPosts, setSearchedPosts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [back, setback] = useState(false);



  // Access saved posts from Redux store
  const dispatch = useDispatch();
  const savedPosts = useSelector(
    (state: RootState) => state.savedPosts.savedPosts
  );

  const handleSavePost = (post: Post) => {
    dispatch(savePost(post));
  };

  const handleUnsavePost = (postId: number) => {
    dispatch(unsavePost(postId));
  };

  return (
    // <div>
    //   <h1>Saved Posts</h1>
    //   <div className="saved-posts-container">
    //     {savedPosts.map((post) => (
    //       <div className="saved-post" key={post.id}>
    //         <h2>{post.title}</h2>
    //         <p>{post.body}</p>
    //         {/* Render any other relevant details */}
    //       </div>
    //     ))}
    //     {savedPosts.length === 0 && <p>No saved posts yet.</p>}
    //   </div>
    // </div>
    <div>
    <h1>Search Posts</h1>
        <div className='flex'>
        
        <SearchBar setSearchedPosts={setSearchedPosts} setback={setback} setSearchTerm={setSearchTerm} />
        
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8 py-6">
    {(searchedPosts.length > 0 && searchTerm !== '' ? searchedPosts : savedPosts).map((post: Post) => (
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5 flex-grow" key={post.id}>
        <div className="p-5 flex flex-col h-full justify-between">
            <div>
                <a href="#">
                    <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{post.title}</h5>
                </a>
                <p className="font-normal text-gray-700 mb-3">{post.body}</p>
            </div>
            <div className="mt-auto">
            <LikeDislikeButtons postId={post.id} />

            {savedPosts.some((savedPost) => savedPost.id === post.id) ? (
            <button
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
              onClick={() => handleUnsavePost(post.id)}
            >
              Unsave
            </button>
          ) : (
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
              onClick={() => handleSavePost(post)}
            >
              Save
            </button>
          )}
            </div>
        </div>
    </div>
       ))}
    
         {savedPosts.length === 0 && <p>No saved posts yet.</p>}

   </div>
   </div>

  );
};

export default SavedPostsPage;

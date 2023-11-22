"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { savePost, unsavePost } from '../../store/features/savedPostsSlice';
import LikeDislikeButtons from '../../components/LikeDislikeButtons';
import SearchBar from '../../components/SearchBar';
import axios from 'axios';

const Page = () => {
    

  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedPosts, setSearchedPosts] = useState<any[]>([]);
  const [back, setback] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  console.log('Searched Posts Length:', searchedPosts.length);
  console.log('searched term', searchTerm);

  const postsPerPage = 20;

  const dispatch = useDispatch();
  const savedPosts = useSelector((state: RootState) => state.savedPosts.savedPosts);

  const handleSavePost = (post: any) => {
    dispatch(savePost(post));
  };

  const handleUnsavePost = (postId: number) => {
    dispatch(unsavePost(postId));
  };


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
            setPosts(response.data);
        })
        .catch((error) => {
            console.error('Error fetching posts:', error);
        });
}, []); 


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };




  return (
    <div>
        <h1>Search Posts</h1>
        <div className='flex'>
        
        <SearchBar setSearchedPosts={setSearchedPosts} setback={setback} setSearchTerm={setSearchTerm} />
        
    </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8 py-6">
      {(searchedPosts.length > 0 && searchTerm !='' ? searchedPosts  : currentPosts).map((post: any) => ( 
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
                {savedPosts.some((savedPost: any) => savedPost.id === post.id) ? (
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
      </div>
       

      <div className="flex justify-center mt-4" style={{display: searchedPosts.length > 0 ? 'none' : 'block' }}>
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => (
          <button
            key={i}
            className="mx-1 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      
    </div>
  );
};

export default Page;

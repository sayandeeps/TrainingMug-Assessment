"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { savePhoto, unsavePhoto } from '../../store/features/savedPhotoSlice';
import LikeDislikephotoButtons from '../../components/LikeDislikephotoButtons';
import SearchBarphotos from '../../components/SearchBarphotos';
import axios from 'axios';

const Page = () => {
    

  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedPosts, setSearchedPosts] = useState<any[]>([]);
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
  const [back, setback] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLikePost = (postId: number) => {
    const updatedLikeCounts = { ...likeCounts };
    updatedLikeCounts[postId] = (likeCounts[postId] || 0) + 1;
    setLikeCounts(updatedLikeCounts);
  };

  console.log('Searched Posts Length:', searchedPosts.length);
  console.log('searched term', searchTerm);

  const postsPerPage = 20;

  const dispatch = useDispatch();
  const savedPhoto = useSelector((state: RootState) => state.savedPhoto.savedPhoto);

  const handleSavePhoto = (post: any) => {
    dispatch(savePhoto(post));
  };

  const handleUnsavePhoto = (postId: number) => {
    dispatch(unsavePhoto(postId));
  };


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/photos')
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

  const maxVisiblePages = 5;
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const getVisiblePageNumbers = () => {
    const midPoint = Math.floor(maxVisiblePages / 2);
    let startPage = currentPage - midPoint;
    let endPage = currentPage + midPoint;

    if (startPage <= 0) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - maxVisiblePages + 1;
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const [visiblePageNumbers, setVisiblePageNumbers] = useState<number[]>(getVisiblePageNumbers());



  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setVisiblePageNumbers(getVisiblePageNumbers());
  }, [currentPage]);




  return (
    <div>
        <h1>Search Photo
          
        </h1>
        <div className='flex'>
        
        <SearchBarphotos setSearchedPosts={setSearchedPosts} setback={setback} setSearchTerm={setSearchTerm} />
        
    </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8 py-6">
      {(searchedPosts.length > 0 && searchTerm !='' ? searchedPosts  : currentPosts).map((post: any) => ( 

          <a href="#" className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80" key={post.id}>
                <img src={`${post.url}`} loading="lazy" alt="Photo by Minh Pham" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"/>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                </div>

                <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">{`${post.title}`} 
                
                <div className="mt-auto">
              <LikeDislikephotoButtons postId={post.id} />
                {savedPhoto.some((savedPost: any) => savedPost.id === post.id) ? (
                  <button
                    className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
                    onClick={() => handleUnsavePhoto(post.id)}
                  >
                    Unsave
                  </button>
                ) : (
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
                    onClick={() => handleSavePhoto(post)}
                  >
                    Save
                  </button>
                )}
              </div>
                
                </span>
            </a>
        ))}
      </div>
       

      {/* Existing code... */}
      <div className="flex justify-center mt-4" style={{ display: searchedPosts.length > 0 ? 'none' : 'block' }}>
        {/* Show visible page numbers */}
        {visiblePageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`mx-1 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none ${
              currentPage === pageNumber ? 'bg-gray-400' : ''
            }`}
            onClick={() => paginate(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        {/* Show previous button to navigate to previous set of pages */}
        {currentPage > maxVisiblePages / 2 && (
          <button
            className="mx-1 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
            onClick={() => paginate(currentPage - 1)}
          >
            Prev
          </button>
        )}

        {/* Show next button to navigate to next set of pages */}
        {currentPage <= totalPages - maxVisiblePages / 2 && (
          <button
            className="mx-1 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
      
    </div>
  );
};

export default Page;
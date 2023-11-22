// Import necessary dependencies
import { useEffect, useState } from 'react';
import { RootState } from '../../store/store';
import { savePhoto, unsavePhoto } from "../../store/features/savedPhotoSlice";
import { useDispatch, useSelector } from "react-redux";
import LikeDislikephotoButtons from '../../components/LikeDislikephotoButtons';
import SearchBarphotos from '../../components/SearchBarphotos';



interface Post {
    albumId: number;
    id: number;
    title: string;
    body: string;
    url: string;
    thumbnailUrl: string;
}

const SavedPhotoPage = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 20;


  const [searchedPosts, setSearchedPosts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [back, setback] = useState(false);



  // Access saved posts from Redux store
  const dispatch = useDispatch();
  const savedPhoto = useSelector(
    (state: RootState) => state.savedPhoto.savedPhoto
  );

  const handleSavePhoto = (post: Post) => {
    dispatch(savePhoto(post));
  };

  const handleUnsavePost = (postId: number) => {
    dispatch(unsavePhoto(postId));
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = savedPhoto.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
 console.log('Searched Posts Length:', searchedPosts.length);
  console.log('searched term', searchTerm);
  return (
   
    <div>
    <h1>Search Photo</h1>
        <div className='flex'>
        
        <SearchBarphotos setSearchedPosts={setSearchedPosts} setback={setback} setSearchTerm={setSearchTerm} />
        
    </div>
    <div className="grid grid-cols-1 gap-4 px-4 sm:px-6 lg:px-8 py-6">
    {(searchedPosts.length > 0 && searchTerm !== '' ? searchedPosts : currentPosts).map((post: Post) => (

    <div className="dark:bg-gray-800 dark:text-gray-50">
	<div className="container grid grid-cols-12 mx-auto dark:bg-gray-900">
    <div
  className="bg-no-repeat bg-cover  col-span-full lg:col-span-4"
  style={{
    backgroundImage: `url(${post.thumbnailUrl})`,
    backgroundPosition: 'center center',
    backgroundBlendMode: 'multiply',
    backgroundSize: 'cover',
  }}
>
  <LikeDislikephotoButtons postId={post.id} />
</div>
		<div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10">
			<div className="flex justify-start">
			</div>
			<h1 className="text-3xl font-semibold">{post.title}</h1>
			<p className="flex-1 pt-2">Full Image Download Link : {post.url}</p>
			<a rel="noopener noreferrer" href="#" className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm dark:text-violet-400">
				<span>
                {savedPhoto.some((savedPhoto) => savedPhoto.id === post.id) ? (
             <button
               className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
               onClick={() => handleUnsavePost(post.id)}
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
                </span>
				
			</a>
			
		</div>
	</div>
</div>
       ))}

    
         {savedPhoto.length === 0 && <p>No saved posts yet.</p>}
         <div className="flex justify-center mt-4" style={{display: searchedPosts.length > 0 ? 'none' : 'block' }}>
        {Array.from({ length: Math.ceil(savedPhoto.length / postsPerPage) }, (_, i) => (
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

   </div>
   

  );
};

export default SavedPhotoPage;

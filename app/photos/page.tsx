import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import LikeDislikephotoButtons from '../../components/LikeDislikephotoButtons';

const Page = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchedPosts, setSearchedPosts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 20;

  const handleLikePost = (postId: number) => {
    const updatedLikeCounts = { ...likeCounts };
    updatedLikeCounts[postId] = (likeCounts[postId] || 0) + 1;
    setLikeCounts(updatedLikeCounts);
  };

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/photos')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const pageCount = Math.ceil(posts.length / postsPerPage);
  const pagesVisited = pageNumber * postsPerPage;

  const displayPosts = (searchedPosts.length > 0 && searchTerm !== '') ? searchedPosts : posts.slice(pagesVisited, pagesVisited + postsPerPage);

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };
  console.log(displayPosts.length)

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8 py-6">
        {displayPosts.map((post: any) => (
          <a href="#" className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80" key={post.albumId}>
            <img src={`${post.url}`} loading="lazy" alt="Photo by Minh Pham" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
            <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">{`${post.title}`} <LikeDislikephotoButtons postId={post.id} /></span>
          </a>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

export default Page;

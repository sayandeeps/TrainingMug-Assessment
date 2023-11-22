import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import axios from 'axios';

interface SearchBarProps {
  setSearchedPosts: React.Dispatch<React.SetStateAction<any[]>>;
  setback: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setSearchedPosts,
  setback,
  setSearchTerm,
}) => {
  const [searchTerm, setSearchTermLocal] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTermLocal(e.target.value);
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(searchTerm);
  };

  const handleBack = () => {
    setSearchTerm('');
    setSearchedPosts([]);
    setback(true);
    setSearchTermLocal('');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm !== '') {
        try {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts?q=${searchTerm}`
          );
          setSearchedPosts(response.data);
          setback(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [searchTerm, setSearchedPosts, setback]);

  return (
    <div>
      <form onSubmit={handleSearch} className='flex space-x-4'>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleInputChange}
          className='w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          style={{ width: '50vw' }}
          />
<button type="submit" className="px-5 py-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        
    </button>        
    <button type="button" onClick={handleBack} className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 ">
    
All Posts</button>
      </form>
    </div>
  );
};

export default SearchBar;

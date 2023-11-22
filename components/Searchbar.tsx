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
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleBack}>
          Back
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

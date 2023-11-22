"use client";

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SearchResults = () => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { q } = router.query;
        if (q) {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts?q=${q}`
          );
          setSearchResults(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [router.query]);

  return (
    <div>
      {searchResults.map((post: any) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

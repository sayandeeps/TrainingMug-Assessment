"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}
const Page = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 20;

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

    // Logic to paginate
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8 py-6">
                {currentPosts.map((post) => (
                    <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5 flex-grow" key={post.id}>
                        <div className="p-5 flex flex-col h-full justify-between">
                            <div>
                                <a href="#">
                                    <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{post.title}</h5>
                                </a>
                                <p className="font-normal text-gray-700 mb-3">{post.body}</p>
                            </div>
                            <div className="mt-auto">
                                <a className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" href="#">
                                    Like
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
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

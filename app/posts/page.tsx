


"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}
const page = () => {
    const [posts, setPosts] = useState<Post[]>([]); 

    useEffect(() => {
        // Fetch posts data from JSONPlaceholder API using Axios
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                // Set the received posts data to the state
                setPosts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }, []); 
  return (

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8 py-6">
    {posts.map((post) => (
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


  )
}

export default page
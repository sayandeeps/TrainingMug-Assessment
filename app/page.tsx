"use client";
import Image from 'next/image'
import React, { useState } from 'react';
import PhotosPage from './photos/page';
import SavedPost from './saved/page';
import SavedPhoto from './savedphoto/page';
import PostsPage from './posts/page';
import NextNProgress from 'nextjs-progressbar';



import Link from 'next/link'

export default function Home() {

  const [selectedTab, setSelectedTab] = useState('Photos'); // 'Photos' or 'Posts'

  const handleTabChange = (tab: string) => {
    console.log('Selected Tab:', tab);
      setSelectedTab(tab);
  };

  return (
   <main>

    <>
    <NextNProgress />
        <div className="flex w-screen h-screen text-gray-400 bg-gray-900">

        <div className="flex flex-col items-center w-16 pb-4 overflow-auto border-r border-gray-800 text-gray-500">
            <button  onClick={() => handleTabChange('Photos')} className="flex items-center justify-center flex-shrink-0 w-full h-16" >
                <svg className="w-8 h-8 stroke-current text-gray-300"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            </button>
            <button onClick={() => handleTabChange('Photos')} className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 rounded hover:bg-gray-800" >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-camera"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
            </button>
            <button onClick={() => handleTabChange('SavedPhoto')} className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 rounded hover:bg-gray-800" >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-database"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
            </button>
            <button  className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 rounded hover:bg-gray-800" onClick={() => handleTabChange('Posts')}>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
            </button>
            <button onClick={() => handleTabChange('Saved')} className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 rounded hover:bg-gray-800" >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-archive"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
            </button>
            
           
        </div>

        <div className="flex flex-col flex-grow">
            <div className="flex items-center flex-shrink-0 h-16 px-8 border-b border-gray-800">
                <h1 className="text-lg font-medium">TrainingMug Assessment Dashboard </h1>
                {/* search box */}

                <button
                    className={`flex items-center justify-center h-10 px-4 ml-auto text-sm font-medium rounded hover:bg-gray-800 ${
                        selectedTab === 'Photos' ? 'bg-gray-800' : ''
                    }`}
                    onClick={() => handleTabChange('Photos')}
                >
                    Photos
                </button>
                <button
                    className={`flex items-center justify-center h-10 px-4 ml-2 text-sm font-medium  rounded hover:bg-gray-800 ${
                        selectedTab === 'SavedPhoto' ? 'bg-gray-800' : ''
                    }`}
                    onClick={() => handleTabChange('SavedPhoto')}
                >
                    Saved Photo
                </button>
                <button
                    className={`flex items-center justify-center h-10 px-4 ml-2 text-sm font-medium  rounded hover:bg-gray-800 ${
                        selectedTab === 'Posts' ? 'bg-gray-800' : ''
                    }`}
                    onClick={() => handleTabChange('Posts')}
                >
                    Posts
                </button>
                <button
                    className={`flex items-center justify-center h-10 px-4 ml-2 text-sm font-medium  rounded hover:bg-gray-800 ${
                        selectedTab === 'Saved' ? 'bg-gray-800' : ''
                    }`}
                    onClick={() => handleTabChange('Saved')}
                >
                    Saved Posts
                </button>
                
            </div>
            
            <div className="flex-grow p-6 overflow-auto bg-gray-800">
                
                {selectedTab === 'Photos' ? (
                    <PhotosPage />
                ) : selectedTab === 'SavedPhoto' ? (
                    <SavedPhoto />
                  ): selectedTab === 'Posts' ? (
                    <PostsPage />
                ) : selectedTab === 'Saved' ? (
                  <SavedPost />
                )  : null}
                </div>
            </div>
        </div>



<a className="fixed flex items-center justify-center h-8 pr-2 pl-1 bg-blue-600 rounded-full bottom-0 right-0 mr-4 mb-4 shadow-lg text-blue-100 hover:bg-blue-600" href="https://github.com/sayandeeps" target="_top">
<div className="flex items-center justify-center h-6 w-6 bg-blue-500 rounded-full">
</div>
<span className="text-sm ml-1 leading-none">@sayandeeps</span>
</a>
    </>



   </main>
  )
}

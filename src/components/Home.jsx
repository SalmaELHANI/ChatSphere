import React from 'react';
import { Link } from 'react-router-dom';




function Home() {
    return (
        <div className='overflow-hidden' >
            {/* Add the image to the left side of the page */}
            <div className="sticky top-0 z-50">
                <div className="w-full bg-black opacity-90 h-20 flex justify-between">
                    {/* Image on the left side */}
                    <div className="w-full lg:w-30/6 xl:w-full h-full flex items-center px-4">
                        <img className="rounded-lg w-32" src="public/logo.png" alt="addify logo" />
                    </div>
                    {/* Content on the right side */}
                    <div className="w-full h-full flex justify-end items-center">
                        <Link to={"/join"}
                            className="inline-flex text-white items-center px-6 py-3 font-medium hover:opacity-75"
                        > Start
                        </Link>
                        &nbsp;
                    </div>
                </div>
            </div>

            {/* Existing content */}
            <div className="relative overflow-hidden text-black rounded-lg sm:mx-16 sm:py-16">
                <div className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
                        <h2 className="text-4xl font-bold sm:text-5xl">
                            Chat Room
                            <span className="hidden sm:block text-4xl">click on start to get access in chat</span>
                        </h2>

                        <Link to={"/join"}
                            className="inline-flex text-white items-center px-6 py-3 font-medium bg-rose-500 rounded-lg hover:opacity-75"
                        > Start
                        </Link>
                    </div>
                </div>
                <div class="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full ">
                    <img class="w-96" src="public/img.png" />
                </div>
            </div>
        </div>
    );
}

export default Home;

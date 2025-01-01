// app/dashboard/page.js
import React from "react";
// import React, { useEffect, useState } from "react";

const Dashboard = () => {
  // const [bookmarks, setBookmarks] = useState([]);

  // useEffect(() => {
  //   const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  //   setBookmarks(savedBookmarks);
  // }, []);

  return (
  <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
  <header className="bg-white dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-600">
    <h1 className="text-center text-xl font-bold p-4 text-gray-900 dark:text-gray-100 sm:text-2xl">
      User Dashboard
    </h1>
  </header>
  <main className="flex justify-center mt-2">
    <div className="w-full max-w-md px-4 sm:px-0">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800">
              <th scope="col" className="px-4 py-2 text-center">
                Liked Blogs
              </th>
              <th scope="col" className="px-4 py-2 text-center">
                Bookmarked Blogs
                <div className="space-y-4">
        {/* {bookmarks.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))} */}
      </div>
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </main>
</div>
  );
};
export default Dashboard;

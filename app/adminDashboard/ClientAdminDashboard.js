/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
// app/adminDashboard/page.js
"use client";

import { useState, useEffect, use, useRef } from "react";
import { HiPlus, HiPencil, HiUsers } from "react-icons/hi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "next/navigation";
import JoditEditor from "jodit-react";
import { SiLibreofficewriter } from "react-icons/si";
import { FaCalendarDays } from "react-icons/fa6";

const AdminDashboard = () => {
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [data, setData] = useState({
    category: "",
    title: "",
    description: "",
    date: "",
    author: "",
    image: null,
    content: "",
  });
  const { post } = useParams();
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await axios.get("/api/blog");
    setBlogs(res.data.blogs);
  };

  const deleteBlog = async (mongoId) => {
    try {
      const response = await axios.delete("/api/blog", {
        params: {
          id: mongoId,
        },
      });
      if (response.data.success) {
        toast.success(response.data.msg);
        fetchBlogs();
      } else {
        toast.error("Error deleting post");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // useEffect(() => {
  //   setMounted(true);
  //   // Fetch posts and subscribers data here
  // }, []);

  const editor = useRef(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("category", data.category);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("date", data.date);
      formData.append("author", data.author);
      formData.append("image", data.image);
      formData.append("content", data.content);

      const response = await axios.post("/api/blog", formData);

      setData({
        category: "",
        title: "",
        description: "",
        date: "",
        author: "",
        image: null,
        content: "",
      });

      if (response.data.success) {
        toast.success(response.data.msg);
        setData({
          category: "",
          title: "",
          description: "",
          date: "",
          author: "",
          image: null,
          content: "",
        });
      } else {
        toast.error("Error creating post");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  // if (!mounted) return null;

  return (
    <div
      className={`min-h-screen bg-white text-black dark:bg-black dark:text-white`}
    >
      <ToastContainer />
      <div className="text-center text-2xl font-bold p-4 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-b-2  border-gray-300 dark:border-gray-600">
        Admin Dashboard
      </div>
      {/* Sidebar */}
      <div
        className={`fixed left-5 top-30 h-96 w-64 p-4 bg-black text-white dark:bg-white dark:text-black shadow-xl md:block hidden rounded-xl`}
      >
        <nav>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`flex items-center space-x-2 w-full p-3 rounded ${
              activeTab === "blogs"
                ? "bg-white dark:bg-black text-black dark:text-white"
                : "hover:bg-gray-700 dark:hover:bg-gray-200"
            }`}
          >
            <HiPencil />
            <span>Published Blogs</span>
          </button>
          <button
            onClick={() => setActiveTab("createPost")}
            className={`flex items-center space-x-2 w-full p-3 rounded mt-2 ${
              activeTab === "createPost"
                ? "bg-white dark:bg-black text-black dark:text-white"
                : "hover:bg-gray-700 dark:hover:bg-gray-200"
            }`}
          >
            <HiPlus />
            <span>Create Post</span>
          </button>
          <button
            onClick={() => setActiveTab("subscribers")}
            className={`flex items-center space-x-2 w-full p-3 rounded mt-2 ${
              activeTab === "subscribers"
                ? "bg-white dark:bg-black text-black dark:text-white"
                : "hover:bg-gray-700 dark:hover:bg-gray-200"
            }`}
          >
            <HiUsers />
            <span>Subscribers</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <main className="pt-20 md:pl-64 p-4">
        <div className="max-w-7xl mx-auto">
          {activeTab === "blogs" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Published Blogs</h2>
              </div>

              <div className="grid gap-4">
                {blogs
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((blog) => (
                    <div
                      key={blog._id || blog.id}
                      className={`p-4 rounded-lg bg-white dark:bg-black shadow`}
                    >
                      <a
                        href={`/blogs/${blog._id || blog.id}`}
                        className="hover:text-gray-600 cursor-pointer"
                      >
                        <h3 className="font-semibold">{blog.title}</h3>
                      </a>

                      <div className="flex items-center justify-between w-full">
  <span className="flex items-center">
    <SiLibreofficewriter className="mr-2" />
    By {blog.author}
  </span>
  <span className="flex items-center font-mono">
    <FaCalendarDays className="mr-2" />
    {new Date(blog.date).toLocaleString()}
  </span>
</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {blog.excerpt}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex-grow">
                          <span className="px-2 py-1 rounded text-sm bg-gray-200 text-black">
                            Published
                          </span>
                        </div>
                        <div className="flex gap-4">
                          <button className="text-black hover:text-gray-600 font-bold">
                            Edit
                          </button>
                          <button
                            onClick={() => deleteBlog(blog._id)}
                            className="text-black hover:text-red-700 font-bold"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeTab === "createPost" && (
            <div className="max-w-4xl mx-auto p-4 md:p-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Create New Post
              </h2>
              <form onSubmit={onSubmitHandler} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-medium">Category</label>
                    <select
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black dark:bg-gray-800"
                      value={data.category}
                      onChange={(e) =>
                        setData({ ...data, category: e.target.value })
                      }
                    >
                      <option value="All">All Category</option>
                      <option value="technology">Technology</option>
                      <option value="design">Design</option>
                      <option value="business">Business</option>
                      <option value="lifestyle">Lifestyle</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">Title</label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black dark:bg-gray-800"
                      value={data.title}
                      onChange={(e) =>
                        setData({ ...data, title: e.target.value })
                      }
                      placeholder="Enter post title"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium">Description</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black dark:bg-gray-800"
                    value={data.description}
                    onChange={(e) =>
                      setData({ ...data, description: e.target.value })
                    }
                    placeholder="Brief description of your post"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-medium">Date</label>
                    <input
                      type="datetime-local"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black dark:bg-gray-800"
                      value={data.date}
                      onChange={(e) =>
                        setData({ ...data, date: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">
                      Author Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black dark:bg-gray-800"
                      value={data.author}
                      onChange={(e) =>
                        setData({ ...data, author: e.target.value })
                      }
                      placeholder="Enter author name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Featured Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black dark:bg-gray-800"
                    onChange={(e) =>
                      setData({ ...data, image: e.target.files[0] })
                    }
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Content</label>
                  <JoditEditor
                    ref={editor}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black dark:bg-gray-800 h-60"
                    value={data.content}
                    onChange={(value) => setData({ ...data, content: value })}
                    placeholder="Write your post content here..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-lg hover:opacity-90 transition duration-300"
                >
                  Create Post
                </button>
              </form>
            </div>
          )}

          {activeTab === "subscribers" && (
            <div>
              <h2 className="text-xl ml-2 font-semibold mb-6">Subscribers →</h2>
              <div
                className={`rounded-lg bg-white dark:bg-black shadow-xl overflow-x-auto`}
              >
                <table className="w-full">
                  <thead className={`bg-white dark:bg-gray-800 bg-gray-50'}`}>
                    <tr>
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-left">Date Subscribed</th>
                      <th className="px-6 py-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((subscriber) => (
                      <tr
                        key={subscriber.id}
                        className="border-t dark:border-gray-700"
                      >
                        <td className="px-6 py-4">{subscriber.email}</td>
                        <td className="px-6 py-4">{subscriber.date}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-sm ${
                              subscriber.active
                                ? "bg-gray-200 text-black"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {subscriber.active ? "Active" : "Inactive"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white border-t md:hidden z-10">
        <div className="flex justify-around p-4">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex flex-col items-center ${
              activeTab === "posts" ? "text-blue-500" : ""
            }`}
          >
            <HiPencil size={24} />
            <span className="text-sm">Posts</span>
          </button>
          <button
            onClick={() => setActiveTab("createPost")}
            className={`flex flex-col items-center ${
              activeTab === "createPost" ? "text-blue-500" : ""
            }`}
          >
            <HiPlus size={24} />
            <span className="text-sm">Create</span>
          </button>
          <button
            onClick={() => setActiveTab("subscribers")}
            className={`flex flex-col items-center ${
              activeTab === "subscribers" ? "text-blue-500" : ""
            }`}
          >
            <HiUsers size={24} />
            <span className="text-sm">Subscribers</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AdminDashboard;

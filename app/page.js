/* eslint-disable react/react-in-jsx-scope */
import Hero from "@/components/Hero";
import SimpleDivider from "../components/SimpleDivider";
import Blogs from "@/components/Blogs";
import SocialProof from "@/components/SocialProof";
import NewsLetterCTA from "@/components/NewsLetterCTA";
import ScrollToTop from "@/components/ScrollToTop";
import BlogsCard from "@/components/BlogsCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <div>
      <ToastContainer/>
      <ScrollToTop/>
      <Hero />
      <SimpleDivider type="gradient" />
      <Blogs/>
      <SimpleDivider type="gradient" />
      <SocialProof/>
      <SimpleDivider type="gradient" />
      <NewsLetterCTA/>
      <SimpleDivider type="gradient" />
      <BlogsCard/>      
      <SimpleDivider type="gradient"/>
    </div>
  );
}

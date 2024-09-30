import React from 'react';
import { FaReddit, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import "./Footer2.css";

const Footer = () => {
  return (
    <footer className='bg-black text-white '>
      <div className='px-4 py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full'>
        <div className='flex justify-center items-center'>
          <a href='#' className='w-auto'>
            <img className='p-4 h-32 filter invert' src="logo.png" alt="Logo" />
          </a>
        </div>

        <div className='flex flex-col text-center md:text-left'>
          <a href='#' className='m-2 text-zinc-50 hover:underline'>Stamp Letter</a>
          <a href='#' className='m-2 text-zinc-50 hover:underline'>Explore</a>
          <a href='#' className='m-2 text-zinc-50 hover:underline'>About Us</a>
          <a href='https://www.reddit.com/r/retrophil/' target="main" className='m-2 text-zinc-50 hover:underline'>Community</a>
        </div>

        <div className='flex flex-col text-center md:text-left'>
          <a href='#' className='m-2 text-zinc-50 hover:underline'>FDC Variety</a>
          <a href='#' className='m-2 text-zinc-50 hover:underline'>Definitive</a>
          <a href='#' className='m-2 text-zinc-50 hover:underline'>Stationary</a>
          <a href='#' className='m-2 text-zinc-50 hover:underline'>More Stamps</a>
        </div>

        <div className='flex flex-col items-center md:items-start'>
          <h2 className='text-slate-50 font-bold text-xl mb-4'>Connect With Us</h2>
          <div className='flex gap-4 '>
            <a href='https://www.reddit.com/r/retrophil/' target="main"><FaReddit className='text-2xl hover:text-gray-400' /></a>
            <a href='https://twitter.com' target="main"><FaTwitter className='text-2xl text-blue-400 hover:text-gray-400' /></a>
            <a href='https://linkedin.com' target="main"><FaLinkedin className='text-2xl text-blue-700 hover:text-gray-400' /></a>
            <a href='https://instagram.com' target="main"><FaInstagram className='text-2xl text-pink-400 hover:text-gray-400' /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

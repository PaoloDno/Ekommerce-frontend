import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import {
  FaHome,
  FaStore,
  FaTag,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaLaptop,
} from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";
import { FaGoogle } from "react-icons/fa6";

export default function FooterComponent() {
  const { user } = useAppContext();
  const brandName = "Ekommerce";

  return (
    <footer className="flex flex-col w-full bg-skin-primary text-skin-color1 in-center relative overflow-hidden">
      {/* Blur layers */}
      <div className="absolute inset-0 bg-gray-500/5 opacity-15 blur-lg z-0" />
      <div className="absolute inset-0 bg-white/5 blur-2xl opacity-25 backdrop-blur-lg z-0" />

      <div className="grid-footer grid grid-cols-2 sm:grid-cols-4 gap-6 p-3 w-full max-w-7xl z-10">
        {/* About */}
        <div className="flex flex-col p-3 rounded-lg bg-skin-secondary/60 text-stylep3 min-h-[30vh] border-2 border-skin-colorBorder1">
          <span className="text-stylep1 font-bold">About</span>
          <span className="font-semibold">{brandName}</span>
          <p>Demo E-commerce store</p>
          <p>Navigation links</p>

          <div className="flex flex-col space-y-1 mt-2">
            <Link to="/" className="flex items-center gap-2 hover:text-skin-colorHigh transition">
              <FaHome /> Home
            </Link>
            <Link to="/stores" className="flex items-center gap-2 hover:text-skin-colorHigh transition">
              <FaStore /> Store
            </Link>
            <Link to="/categories" className="flex items-center gap-2 hover:text-skin-colorHigh transition">
              <FaTag /> Categories
            </Link>
          </div>
        </div>

        {/* Products */}
         <div className="flex flex-col p-3 rounded-lg bg-skin-secondary/60 text-stylep3 min-h-[30vh] border-2 border-skin-colorBorder1">
          <span className="text-stylep1 font-bold">Products</span>
          <Link to="/products" className="hover:text-skin-colorHigh">Browse Products</Link>
          <Link to="/stores" className="hover:text-skin-colorHigh">Find Stores</Link>
        </div>

        {/* Seller */}
         <div className="flex flex-col p-3 rounded-lg bg-skin-secondary/60 text-stylep3 min-h-[30vh] border-2 border-skin-colorBorder1">
          <span className="text-stylep1 font-bold">Seller</span>
          {user ? (
            <Link to={`/profile/${user._id}`} className="hover:text-skin-colorHigh">
              Your Store
            </Link>
          ) : (
            <>
              <span>Become a Seller</span>
              <Link
                to="/login"
                className="w-fit bg-skin-fill-3/70 px-3 py-1 rounded-lg text-skin-color3 hover:bg-skin-fill-3"
              >
                Login / Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Socials */}
         <div className="flex flex-col p-3 rounded-lg bg-skin-secondary/60 text-stylep3 min-h-[30vh] border-2 border-skin-colorBorder1">
          <span className="text-stylep1 font-bold">Connect</span>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-skin-colorHigh"
          >
            <FaEnvelope /> Gmail.com
          </a>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-skin-colorHigh"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-skin-colorHigh"
          >
             <FaLaptop /> Portfolio
          </a>
        </div>
      </div>

      <div className="z-10">
        <ThemeSwitcher />
      </div>

      <div className="z-20 my-2 opacity-35 flex flex-row h-[15px] w-screen md:max-w-screen-lg in-center relative">
        <div className="theme-default flex-1 bg-skin-primary flex w-full h-1" />
        <div className="theme-coffee flex-1 bg-skin-primary flex w-full h-1" />
        <div className="theme-dark flex-1 bg-skin-primary flex w-full h-1" />
        <div className="theme-sakura flex-1 bg-skin-primary flex w-full h-1" />
        <div className="theme-dark2 flex-1 bg-skin-primary flex w-full h-1" />
        <div className="theme-forest flex-1 bg-skin-primary flex w-full h-1" />
        <div className="theme-default flex-1 bg-skin-primary flex w-full h-1" />
      </div>

      <div className="flex flex-col items-center mt-4 space-y-2 pb-[15vh] md:pb-6 z-10">
        <span className="text-stylep2">
          © 2026 {brandName}. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

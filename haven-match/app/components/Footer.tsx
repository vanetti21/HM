"use client"

import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#34495e] px-4 md:px-16 lg:px-28 py-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-11">
            <div>
                <h2 className="text-lg font-bold mb-4 text-white">
                    About Us
                </h2>
                <p className="text-gray-300">
                    Somos un equipo dedicado a proporcionar los mejores servicios para nuestros clientes.
                </p>
            </div>
            <div>
                <h2 className="text-lg font-bold mb-4 text-white">Quick Links</h2>
                <ul>
                    <li><a href=" " className="hover:underline text-gray-300">Home</a></li>
                    <li><a href=" " className="hover:underline text-gray-300">Services</a></li>
                    <li><a href=" " className="hover:underline text-gray-300">Contact</a></li>
                    <li><a href=" " className="hover:underline text-gray-300">About</a></li>
                </ul>
            </div>
            <div>
                <h2 className="text-lg font-bold mb-4 text-white">Follow Us</h2>
                <ul className="flex space-x-4">
                    <li>
                        {" "}
                        <FaFacebook className="text-blue-500" /> {" "}
                        <a href="" className="hover:underline text-gray-300">
                            Facebook
                        </a>
                    </li>
                    <li>
                        {" "}
                        <FaTwitter className="text-sky-500" /> {" "}
                        <a href="" className="hover:underline text-gray-300">
                            Twitter
                        </a>
                    </li>
                    <li>
                        {" "}
                        <FaInstagram className="text-orange-500" /> {" "}
                        <a href="" className="hover:underline text-gray-300">
                            Instagram
                        </a>
                    </li>
                    <li>
                        {" "}
                        <FaYoutube className="text-red-500" /> {" "}
                        <a href="" className="hover:underline text-gray-300">
                            Youtube
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="border-t border-gray-500 pt-4 text-gray-300 text-center mt-4">
            <p>© 2025 Haven Match. All Rights Reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;

"use client";

import React, {useState} from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";


function ImageSlider() {
    const slides = [
        {
            url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            url: 'https://images.unsplash.com/photo-1500673587002-1d2548cfba1b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            url: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            url: 'https://images.unsplash.com/photo-1451440063999-77a8b2960d2b?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0)

        const prevSlide = () => {
            const isFirstSlide = currentIndex === 0;
            const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
            setCurrentIndex(newIndex);
        };

        const nextSlide = () => {
            const isLastSlide = currentIndex === slides.length - 1;
            const newIndex = isLastSlide ? 0 : currentIndex + 1;
            setCurrentIndex(newIndex);
        };

        const goToSlide = (slideIndex: React.SetStateAction<number>) => {
            setCurrentIndex(slideIndex);
        };

    return (
    <div className="max-w-[3000px] h-[780px] w-full m-auto py-16 px-4 relative group">
        <div style={{backgroundImage: `url(${slides[currentIndex].url})`}} className="w-full h-full rounded-2xl bg-center bg-cover duration-500"></div>
        {/* flechita de la ikielda*/}
        <div className="hidden group-hover:block absolute top-[59%] -translate-x-0 -translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactLeft onClick={prevSlide} size={30}/>
        </div>
        {/* flechita de la derecha*/}
        <div className="hidden group-hover:block absolute top-[59%] -translate-x-0 -translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className="flex top-4 justify-center py-2">
            {slides.map((slide, slideIndex) => (
                <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className="text-2xl cursor-pointer">
                    <RxDotFilled />
                </div>
            ))}
        </div>
    </div>
    )
}

export default ImageSlider
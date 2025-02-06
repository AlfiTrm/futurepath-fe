import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import gsap from "gsap";

const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const intervalRef = useRef(null);

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 4000);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("next");
    setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      setIsAnimating(false);
    }, 500);
    startInterval();
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("prev");
    setTimeout(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === 0 ? slides.length - 1 : prevSlide - 1
      );
      setIsAnimating(false);
    }, 500);
    startInterval();
  };

  useLayoutEffect(() => {
    const timeline = gsap.timeline({
      yoyo: true,
    });

    setTimeout(() => {
      timeline
        .to('#container', {
          opacity: 1,
          duration: 0.3,
          yoyo: true,
          ease: 'none'
        })
      timeline.to('#circle1', {
        x: 200,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: 'power1.inOut',
      })
      timeline.to('#circle2', {
        y: -300,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: 'power1.inOut',
      })
    }, 100);
  }, []);

  return (
    <div id="container" className="flex items-center justify-center opacity-0">
      <div className="shadow-md relative p-5 bg-white text-black flex items-center justify-center overflow-hidden mt-5 xl:h-[500px] md:h-[500px] sm:h-[400px] xl:w-[95%] md:w-[800px] sm:w-[700px] rounded-xl">
        <div id="circle1" className="absolute p-60 bottom-1/2 -left-60 blur-2xl bg-blue-300 rounded-full"></div>
        <div id="circle2" className="absolute p-[20%] top-1/2 right-0 blur-2xl bg-blue-500 rounded-full"></div>
        <div className="relative z-10 flex items-center justify-between w-full max-w-[80%]">
          <div
            className={`transition-all duration-500 transform ${isAnimating
              ? direction === "next"
                ? "-translate-x-6 opacity-0"
                : "translate-x-6 opacity-0"
              : "translate-x-0 opacity-100"
              }`}
          >
            <h1 className="xl:text-5xl lg:text-4xl md:text-5xl sm:text-3xl mt-5 font-bold mb-4 text-black ">
              {slides[currentSlide].title}
            </h1>
            <div className="flex items-center text-sm mb-2 mr-6 text-sky-500">
              <MdVerified className="mr-2 text-blue-400" />
              <p>{slides[currentSlide].rank}</p>
            </div>
            <p className="text-sm mb-5 xl:w-[450px] sm:w-[250px] sm:text-xs text-gray-800">
              {slides[currentSlide].description}
            </p>
            <div className="flex items-center space-x-4">
              <button className=" text-white bg-blue-500 px-5 py-2 rounded hover:text-blue-500 border border-blue-500 hover:bg-white">
                Lebih Lanjut
              </button>
            </div>
          </div>

          <div
            className={`w-[700px] mr-5 flex justify- transition-all duration-500 transform ${isAnimating
              ? direction === "next"
                ? "-translate-x-8 opacity-0"
                : "translate-x-8 opacity-0"
              : "translate-x-0 opacity-100"
              }`}
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="xl:w-[500px] sm:w-[400px] sm:h-[150px] md:h-[300px] xl:h-[350px] translate-x-10 object-cover rounded-lg shadow-lg cursor-pointer hover:scale-[1.01] "
            />
          </div>
        </div>
        <div className="bottom-10 transform flex absolute space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-1 rounded-sm ${index === currentSlide ? "bg-blue-500" : "bg-black"
                }`}
            ></div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 text-3xl z-20 active:scale-75"
          aria-label="Previous Slide"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 text-3xl z-20 active:scale-75"
          aria-label="Next Slide"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Carousel;

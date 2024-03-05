import React, {useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useRouter } from 'next/router';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ChatBot from './ChatBot'
import Image from 'next/image';

const Footer = () => {
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  const closeChat= () => {
    setShowChat(false);
  };
  const handleChatBot = () => {
    setShowChat(true);
  };
  const handleLink = (link) => {
      router.push(`/searchForProduct/searchForProduct?searchForProduct=${link}`);
  }


  const images = [
    {
      src: "https://img.freepik.com/free-photo/sports-shoe-pair-design-illustration-generated-by-ai_188544-19642.jpg?w=1060&t=st=1701775091~exp=1701775691~hmac=e0d3fc7e43e997f0f9ace70aa644f2b69282b85210d074d4c75c2d435dd3df40",
      description: "30% discount on all shoes",
      link: "shoes"
    },
    {
      src: "https://img.freepik.com/free-photo/woman-with-curly-hair-poses-bridge-wears-blue-sweatshirt-trousers-listens-motivational-music-via-wireless-headphones-focused-into-distance-people-leisure-hobby-concept_273609-55980.jpg?size=626&ext=jpg&ga=GA1.1.884650923.1699367309&semt=ais",
      description: "Benneton pullover only for a short time!",
      link: "benneton pullover"
    },
    {
      src: "https://img.freepik.com/free-photo/golden-ring-diamond_1232-1919.jpg?size=626&ext=jpg&ga=GA1.1.884650923.1699367309&semt=ais",
      description: "Gold jewelery from Goldfinger for amazing prices",
      link:"goldfinger"
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,  // Add this line for automatic sliding
    autoplaySpeed: 3000,  // Set the duration for each slide (in milliseconds)
  };
  

  return (
    <footer className="p-6 sm:p-3 bg-indigo-500 text-white mt-4">
      <div className="flex">
        <div className="w-2/4 relative">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="h-48 relative"  onClick={() => handleLink(image.link)}>
                <img
                  src={image.src}
                  alt={`slide-${index + 1}`}
                  className="h-full w-full object-cover"
                 
                  style={{ maxHeight: '150px', maxWidth: '400px' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p>{image.description}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="w-1/4 p-4 ml-2">
          <button onClick={handleChatBot} className="mt-2 bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          <img src="/icons/chat.png" alt="Tshirt Icon" onClick={handleChatBot} width={40} height={40} className="flex-shrink-0 w-5 h-5 mr-4 text-black" />Chat with us</button>
          <ChatBot show={showChat} onClose={closeChat}/>
        </div>
        <div className="w-1/4 p-4 ml-2">
          <h3 className="text-lg font-bold mb-2">
          Contact Us</h3>
          <p>Email: contactus@web.de</p>
          <p>Phone: +49 87 456-7890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

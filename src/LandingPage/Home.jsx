import  { useRef, useState, useEffect } from 'react';
import '../App.css'; 
import {akatsuki}  from './index';

 


const Home = ({name, image,  DOB, origin, description, age }) => {
  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const thumbnailBorderRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState(''); // next or prev

  const timeRunning = 3000;
  const timeAutoNext = 7000;

  // Move to next slide
  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimationType('next');
    setTimeout(() => {
      setIsAnimating(false);
      setAnimationType('');
    }, timeRunning);
  };

  // Move to previous slide
  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimationType('prev');
    setTimeout(() => {
      setIsAnimating(false);
      setAnimationType('');
    }, timeRunning);
  };

  // Auto-transition logic (useEffect for cleanup)
  useEffect(() => {
    let timeoutId = setTimeout(handleNext, timeAutoNext);

    return () => clearTimeout(timeoutId);
  }, [currentSlide]);

  // Handle slide transition on animation class change
  useEffect(() => {
    if (!animationType) return;

    const sliderItems = sliderRef.current.querySelectorAll('.carousel .list .item');
    const thumbnailItems = thumbnailBorderRef.current.querySelectorAll('.carousel .thumbnail .item');

    if (animationType === 'next') {
      sliderRef.current.appendChild(sliderItems[0]);
      thumbnailBorderRef.current.appendChild(thumbnailItems[0]);
    } else {
      sliderRef.current.prepend(sliderItems[sliderItems.length - 1]);
      thumbnailBorderRef.current.prepend(thumbnailItems[thumbnailItems.length - 1]);
    }

    setCurrentSlide((prevSlide) => (prevSlide + (animationType === 'next' ? 1 : -1) + sliderItems.length) % sliderItems.length);
  }, [animationType]);

  return (
    

    
    <div ref={carouselRef} className="carousel">

      <div ref={sliderRef} className="list">
        {/* Add your list items here */}
        {akatsuki && akatsuki.map((akatsukis) => (
        <div className="item" key={akatsukis.name}>
          <img src={akatsukis.image} alt="Slide 1" />
          {/* Content goes here */}
                <div className="content">
                    <div className="author">{akatsukis.DOB}</div>
                    <div className="title">{akatsukis.name}</div>
                    <div className="topic">{akatsukis.origin}</div>
                    <div className="des">
                        {/*<!-- lorem 50 -->*/}
                        {akatsukis.description}
                    </div>
                    <div className="buttons">
                        <button>SEE MORE</button>
                        <button>SUBSCRIBE</button>
                    </div>
                </div>
        </div>
           ))}
        
        {/* ... more items */}
      </div>

     
      <div ref={thumbnailBorderRef} className="thumbnail">
        {/* Add your thumbnail items here */}
        {akatsuki && akatsuki.map((akatsukis) => (
        <div className="item" key={akatsukis.name}>
          <img src={akatsukis.image} alt="Thumbnail 1" />
          {/* Title and description go here */}

                <div className="content">
                    <div className="title">
                        {akatsukis.name}
                    </div>
                    <div className="description">
                        {akatsukis.age}
                    </div>
                </div>
        </div>
             ))}
        {/* ... more items */}
      </div>
     
   
    
    
      <div className='arrows'>
      <button  onClick={handlePrev} className="des">
        {/*<i className="fas fa-angle-left"><</i>*/}
       prev
      </button>
      <button onClick={handleNext}  >
        {/*<i className="fas fa-angle-right">></i>*/}
       next
      </button>
      </div>
        

      {/* Time element (optional) */}
      <div className="time">{timeAutoNext / 1000}s</div>
    </div>
   
    
  );
};

export default Home;

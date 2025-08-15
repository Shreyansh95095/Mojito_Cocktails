'use client';

import { useRef } from 'react';
import { allCocktails } from '../../constants'
import { useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Menu = () => {

    const contentRef = useRef();

    const [currentIndex, setCurrentIndex] = useState(0);

    useGSAP(() => {
        const leafTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#menu',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        })

        leafTimeline
            .to('#m-right-leaf', { y: 250 }, 0)
            .to('#m-left-leaf', { y: -250 }, 0)

    gsap.fromTo('#title', 
            { opacity: 0 }, 
            {opacity: 1, duration: 1}
    );
    gsap.fromTo('.cocktail img', 
        {opacity: 0, xPercent: -100}, 
        {xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut'}
    );
    gsap.fromTo('.details h2', 
        {yPercent: 100, opacity: 0}, 
        {yPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut'}
    );
    gsap.fromTo('.details p', 
        {yPercent: 100, opacity: 0}, 
        {yPercent: 0, opacity: 1, duration: .8, ease: 'power1.inOut'}, 
        '-=0.2'
    );
    
    }, [currentIndex]);

    const totalCocktails = allCocktails.length;

    const goTOSlide = (index) => {
        const newIndex = (index + totalCocktails) % totalCocktails;
        setCurrentIndex(newIndex);
    }

    const getCocktailAt = (index) => {
        return allCocktails[(currentIndex + index + totalCocktails) % totalCocktails];
    }

    const currentCocktail = getCocktailAt(0);
    const previousCocktail = getCocktailAt(-1);
    const nextCocktail = getCocktailAt(1);

  return (
    <section id='menu' aria-labelledby='menu-heading'>
        <img src="/images/slider-left-leaf.png" alt="left-leaf" id='m-left-leaf' />
        <img src="/images/slider-right-leaf.png" alt="right-leaf" id='m-right-leaf' />

        <h2 id="menu-heading" className='sr-only'>
            Cocktail Menu
        </h2>

        <nav className='cocktail-tabs' aria-label='Cocktail Navigation' >
            {allCocktails.map(({ id, name}, index) => {
                const isActive = index === currentIndex;
                return (
                    <button key={id} 
                     className=
                     {
                        `${isActive 
                         ? 'text-while border-white' 
                         : 'text-white/50 border-white/50'}
                    `}
                      onClick={() => goTOSlide(index)}      
                    >
                        {name}
                    </button>
                )
            })}
        </nav>

        <div className="content">
            <div className="arrows">
                <button className="text-left" onClick={() => goTOSlide(currentIndex - 1) }>
                    <span>{previousCocktail.name}</span>
                    <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true" />
                </button>
                <button className="text-right" onClick={() => goTOSlide(currentIndex + 1) }>
                    <span>{nextCocktail.name}</span>
                    <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true" />
                </button>
            </div>

            <div className="cocktail">
                <img src={currentCocktail.image} alt="" className='object-contain' />
            </div>

            <div className='recipe'>
                <div ref={contentRef} className='info'>
                    <p>Recipe for:</p>
                    <p id='title'>{currentCocktail.name}</p>
                </div>

                <div className="details">
                    <h2>{currentCocktail.title}</h2>
                    <p>{currentCocktail.description}</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Menu

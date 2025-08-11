import React from 'react'
import { ScrollTrigger, SplitText } from 'gsap/all'
import gsap from 'gsap'


gsap.registerPlugin(ScrollTrigger, SplitText);

const app = () => {
  return (
    <div className='h-[100vh] text-8xl flex-center'>
      app
    </div>
  )
}

export default app

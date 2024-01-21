import React, { useEffect, useState } from 'react'
import MainContentContainer from '../../Layouts/MainLayout/components/MainLayoutContainer'
import axios from 'axios'

const About = () => {

  return (
    <MainContentContainer h1='About'>
      <div className='p-16 grow flex flex-col items-center justify-center text-2xl font-thin'>
        <p className='mb-8'>
          Welcome to our comprehensive suite of digital tools designed to streamline your document management, printing processes, and other varied tasks.
          Explore these intuitive interfaces and discover how these tools can enhance your productivity and workflow efficiency.
        </p>
        <p>
          Everything presented here is crafted by dedicated colleagues passionate about self-improvement and enhancing all aspects of their environment.
          So, are You ready for challenges? You're in the right place.&nbsp;
          <span className='font-bold'>Let's go for it!</span>
        </p>
      </div>
    </MainContentContainer>

  )
}

export default About
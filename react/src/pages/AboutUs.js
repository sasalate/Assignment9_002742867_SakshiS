import React from 'react'
import Card from '../components/card'
import Navbar from '../components/navbar';

function AboutUs() {
  return (
    <div className='App'>
      <Navbar />
      <Card
        title='ABOUT US'
        imageUrl={require('../pages/img2.jpg')}
        body='We are a team of passionate bakers who love to create delicious and visually stunning cupcakes. Our cupcakes are made with the finest ingredients and are baked fresh every day to ensure that they are of the highest quality.
        Thank you for considering our bakery for your sweet needs. We look forward to serving you and making your day just a little bit sweeter!'
      />
    </div>
  )
}

export default AboutUs;
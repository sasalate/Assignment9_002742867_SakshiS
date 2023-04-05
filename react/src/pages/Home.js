import React from 'react'
import Card from '../components/card'
import Navbar from '../components/navbar';

function Home() {
  return (
    <div className='App'>
      <Navbar />
      <Card
        title='HOME'
        imageUrl={require('../pages/cupcake_home.jpg')}
        body='
        Welcome to Cupcake District, your sweet destination for the best cupcakes in Massachusetts!Whether you are craving a treat, need a dessert for an event, or just want to surprise the family, there is plenty to tempt your taste buds at Cupcake District! '
      />
    </div>
  )
}

export default Home;
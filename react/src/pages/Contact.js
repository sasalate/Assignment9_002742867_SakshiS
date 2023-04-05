import React from 'react'
import Card from '../components/card'
import Navbar from '../components/navbar';

function Contact() {
  return (
    <div className='App'>
      <Navbar />
      <Card
        title='CONTACT'
        imageUrl={require('../pages/contact-us.jpg')}
        body='
        Address
294 Newbury St, Boston, MA 02115
857-612-9876
cake_district@gmail.com'
      />
    </div>
  )
}

export default Contact;
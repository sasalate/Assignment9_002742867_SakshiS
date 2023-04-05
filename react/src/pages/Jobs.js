import React, {useState} from 'react'
import Card from '../components/card'
import Navbar from '../components/navbar';



function Jobs() {

  const listItems = [
    'Store Manager',
    'Graphic Designer',
    'UI/UX Engineer',
    'Data Analyst'
  ];

  return (
    <div className='App'>
      <Navbar />
      <Card
        title='We are looking for'
        imageUrl={require('../pages/jobs.jpg')}
        body={
          <ul>
            {listItems.map(item => <li key={item}>{item}</li>)}
          </ul>
        }
      />
      
      
    </div>
  );
}
export default Jobs;
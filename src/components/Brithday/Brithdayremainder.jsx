import React, { useEffect, useState } from 'react';
import List from './List';
import './Birth.css';

const Brithdayremainder = () => {
    const [info, setInfo] = useState([]);

    useEffect(() => {
      // Fetch data from the provided URL
      fetch(' https://asteriactg.com/student')
        .then((response) => response.json())
        .then((data) => setInfo(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);
    return (
        <main id='site-main'>
            <div className="uppercase font-bold  ">
        <h1 className="text-3xl text-center">Birthday Remainder</h1>
</div>
      <div className="board">
      <h1 className="text-xl text-center">Today Birthday</h1>
        <List info={Today(info)} className="board1"></List>
        <h2 className='upcoming text-dark text-xl'>Upcoming</h2>
       
        <List info={Upcoming(info, 2)} upcoming={true}></List>
      </div>
    </main>
  
    );
};

export default Brithdayremainder;
function Today(person) {
    let currentDay = new Date().getDate();
    let currentMonth = new Date().getMonth();
  
    let filter = person.filter(data => {
      let day = new Date(data.brithday).getDate();
      let month = new Date(data.brithday).getMonth();
  
      return currentDay === day && currentMonth === month;
    });
  
    return filter;
  }
  
  // upcoming birthdays
  function Upcoming(person, toMonth) {
    let currentMonth = new Date().getMonth();
    let currentDay = new Date().getDate();
  
    let filter = person.filter(data => {
      let month = new Date(data.brithday).getMonth();
      let day = new Date(data.brithday).getDate();
  
      if (currentDay === day) return false;
      return month >= currentMonth && month <= currentMonth + toMonth;
    });
  
    return filter;
  }
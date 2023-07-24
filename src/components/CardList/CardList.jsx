import React from 'react'
import Card from '../Card/Card';
import "./CardList.css";

function CardList({rates=[]}) {

  return (
    <div className="card-list">
      {
        rates.map(rate => {
          return (
            <Card key={rate._id} rate={rate} userId={rate.userId} />
          )
        } 
        )
      }
    </div>
  )
}

export default CardList;
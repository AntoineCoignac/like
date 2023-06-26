import React from 'react'
import Card from '../Card/Card';
import "./CardList.css";

function CardList({rates=[]}) {

  return (
    <div className="card-list">
      {
        rates.map(rate => {
          console.log(rate.userId)
          return (
            <Card key={rate.rateId} rateId={rate.rateId} userId={rate.userId} />
          )
        } 
        )
      }
    </div>
  )
}

export default CardList;
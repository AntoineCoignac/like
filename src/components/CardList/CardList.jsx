import React from 'react'
import Card from '../Card/Card';
import "./CardList.scss";

function CardList({rates=[]}) {

  return (
    rates.length === 0 ?
      (
        <div className='full-height no-result'>Il n'y a aucun résultat 🔜</div>
      ) :
      (
      <div className="card-list">
        {
          rates.map(rate => (
            <Card key={rate._id} rate={rate} userId={rate.userId} />
          ))
        }
      </div>
      )
  );
}

export default CardList;
import React from 'react';

function TimeRemaining({ endTime }) {
  const now = new Date();
  const endDateTime = new Date(endTime);
  const timeDifference = endDateTime - now;

  const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return (
    <>
      {daysRemaining > 0 ? (
        <span>{daysRemaining} jour{daysRemaining > 1 ? 's' : ''} restant{daysRemaining > 1 ? 's' : ''}</span>
      ) : (
        <span>{hoursRemaining} heure{hoursRemaining > 1 ? 's' : ''} restante{hoursRemaining > 1 ? 's' : ''}</span>
      )}
    </>
  );
}

export default TimeRemaining;

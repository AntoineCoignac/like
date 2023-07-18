import React from 'react'
import Nav from '../../components/Nav/Nav';
import Filter from '../../components/Filter/Filter';
import CardList from '../../components/CardList/CardList';

function Home() {
 
  return (
    <>
        <Nav transparent={true} />
        <Filter />
        <CardList rates={[]}/>
    </>
  )
}

export default Home
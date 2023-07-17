import React, { useContext } from 'react'
import Nav from '../../components/Nav/Nav';
import Filter from '../../components/Filter/Filter';
import CardList from '../../components/CardList/CardList';
import { GlobalContext } from '../../App';

function Home() {
  let {rates} = useContext(GlobalContext);
  return (
    <>
        <Nav transparent={true} />
        <Filter />
        <CardList rates={rates}/>
    </>
  )
}

export default Home
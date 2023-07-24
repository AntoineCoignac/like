import React, { useState } from 'react'
import Nav from '../../components/Nav/Nav';
import Filter from '../../components/Filter/Filter';
import CardList from '../../components/CardList/CardList';
import newRequest from '../../utils/newRequest';
import { useEffect } from 'react';

function Home() {
  const [filters, setFilters] = useState(
    {
      tag : "me",
      min : 0,
      max : 1000000000,
    }
  )
  const [gigs, setGigs] = useState([]);

  const loadGigs = async () => {
    try {
      const url = `/gigs?${"me" != filters.tag ? `tag=${filters.tag}` : "" }&min=${filters.min}&max=${filters.max}`
      const res = await newRequest.get(url);
      setGigs(res.data);
      console.log(url);
      console.log(res.data); // This should log the data fetched from the API
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadGigs();
    console.log(filters);
  }, [filters]);
 
  return (
    <>
        <Nav transparent={true} />
        <Filter filters={filters} setFilters={setFilters}/>
        <CardList rates={gigs}/>
    </>
  )
}

export default Home
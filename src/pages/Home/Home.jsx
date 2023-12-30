import React, { useState } from 'react'
import Nav from '../../components/Nav/Nav';
import Filter from '../../components/Filter/Filter';
import CardList from '../../components/CardList/CardList';
import newRequest from '../../utils/newRequest';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Load from '../../components/Load/Load';

function Home() {

  const currentUserJson = localStorage.getItem('currentUser');
  const currentUser = currentUserJson && currentUserJson !== 'undefined' ? JSON.parse(currentUserJson) : null;

  const navigate = useNavigate();
  
  const [filters, setFilters] = useState(
    {
      tag : "me",
      min : undefined,
      max : undefined,
    }
  )

  const [gigs, setGigs] = useState([]);

  const loadGigs = async () => {
    try {
      const url = `/gigs?${"me" != filters.tag ? `tag=${filters.tag}` : "" }${filters.min ? `&min=${filters.min}` : ""}${filters.max ? `&max=${filters.max}` : ""}`
      const res = await newRequest.get(url);
      setGigs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadGigs();
  }, [filters]);

  if (currentUser) {
    if (currentUser.isSeller) {
      navigate("/work/dashboard");
      return <></>
    }
  }else{
    return (
      <>
          <Nav transparent={false} />
          <h1 className='name big-title home-title'>Feed Creator</h1>
          <Filter filters={filters} setFilters={setFilters}/>
          {
            gigs ? <CardList rates={gigs}/> : <Load/>
          }
          
      </>
  )
  }
  
}

export default Home
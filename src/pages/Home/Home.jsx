import React, { useState } from 'react'
import Nav from '../../components/Nav/Nav';
import Filter from '../../components/Filter/Filter';
import CardList from '../../components/CardList/CardList';
import newRequest from '../../utils/newRequest';
import { useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import Load from '../../components/Load/Load';

function Home() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      console.log(currentUser);
  
      if (currentUser && currentUser.password) {
        try {
          const secretKey = 'VotreCleSecrete';
          const res = await newRequest.post("/auth/login", {
            username: currentUser.username,
            password: CryptoJS.AES.decrypt(currentUser.password, secretKey).toString(CryptoJS.enc.Utf8)
          });
          console.log("reconnexion");
          localStorage.setItem("currentUser", JSON.stringify({ ...res.data, password: currentUser.password }));
        } catch (err) {
          console.log(err);
        }
      }else{
        navigate("/");
      }
    };
  
    fetchData();
  }, []);
  
  
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
      console.log("test");
      const url = `/gigs?${"me" != filters.tag ? `tag=${filters.tag}` : "" }${filters.min ? `&min=${filters.min}` : ""}${filters.max ? `&max=${filters.max}` : ""}`
      const res = await newRequest.get(url);
      console.log("test1");
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
        {
          gigs ? <CardList rates={gigs}/> : <Load/>
        }
        
    </>
  )
}

export default Home
import React, { useEffect, useState } from 'react';
import Back from '../../components/Back/Back';
import "./Search.css";
import Cross from '../../icons/cross/Cross';
import NavSearch from '../../components/NavSearch/NavSearch';
import { Link } from 'react-router-dom';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import LikeCounter from '../../components/LikeCounter/LikeCounter';
import newRequest from '../../utils/newRequest';

function Search() {

  const [isSearching, setIsSearching] = useState(false);
  const [type, setType] = useState("gig");
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setIsSearching(e.target.value !== '');
    console.log(e.target.value);
  }

  const handleDelete = () => {
    setSearch("");
    setIsSearching(false);
  }

  // Définir loadGigs en tant que callback memoisé
  const loadGigs = async () => {
    try {
      const url = `/gigs?search=${search}`
      const res = await newRequest.get(url);
      setResult(res.data);
      console.log(url);
      console.log(res.data); // This should log the data fetched from the API
    } catch (err) {
      console.log(err);
    }
  }; 

  // Définir loadUsers en tant que callback memoisé
  const loadUsers = async () => {
    try {
      const url = `users/search-users?search=${encodeURIComponent(search)}`;
      const res = await newRequest.get(url);
      setResult(res.data);
      console.log(url);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadSearchResults = async () => {
    setResult([]); // Clear the previous search results

    if (type === "gig") {
        if (search !== "") {
            await loadGigs();
        }
    } else if (type === "user") {
        if (search !== "") {
            await loadUsers();
        }
    }
};

  useEffect(() => {
    loadSearchResults();
  }, [type, search]);


  return (
    <div className="search">
      <div className="top-bar">
        <Back />
        <div className='searchbar-ctn'>
          <input onChange={handleSearch} value={search} className='searchbar' type="text" placeholder='Rechercher' />
          <button onClick={handleDelete} className={`delete ${isSearching ? "active" : ""}`}>
            <Cross />
          </button>
        </div>
      </div>
      <NavSearch setType={setType} activeType={type} />
      {
        type === "gig" ? (
          <div className="gigs">
            {
              result ? (
              result.map(gig=>(
                <div key={gig._id} className='gig-result'>
                  <Link to={`gig/${gig._id}`} className="gig">
                    <p className="title">{gig.title}</p>
                    <p className='desc'>{gig.desc}</p>
                    <div className="infos">
                      <span className="info">{gig.price}€</span>
                      <span className="info">{gig.deliveryTime} jours</span>
                      <span className="info">{gig.revisionNumber} modifications</span>
                      <span className="info">{gig.tag}</span>
                    </div>
                  </Link>
                  <div className="user">
                    <Link to={`/creator/`}>
                      <ProfilePicture photo="/img/pp/user1.jpg" badge="pro" />
                    </Link>
                    <LikeCounter nbr={12} />
                  </div>
                  <Link className='btn' to={`/work/chat/`}>Contacter Name</Link>
                </div>
              )
              )) : null
            }
          </div>
        ) : (
          <div className="users">
            <Link className='user-result'>
              <div className="profile">
                <ProfilePicture photo="/img/pp/user1.jpg" badge="pro" />
                <p className="name">Prénom Nom</p>
              </div>
              <LikeCounter nbr={12} />  
            </Link>
            <Link className='user-result'>
              <div className="profile">
                <ProfilePicture photo="/img/pp/user1.jpg" badge="pro" />
                <p className="name">Prénom Nom</p>
              </div>
              <LikeCounter nbr={12} />  
            </Link>
            <Link className='user-result'>
              <div className="profile">
                <ProfilePicture photo="/img/pp/user1.jpg" badge="pro" />
                <p className="name">Prénom Nom</p>
              </div>
              <LikeCounter nbr={12} />  
            </Link>
            <Link className='user-result'>
              <div className="profile">
                <ProfilePicture photo="/img/pp/user1.jpg" badge="pro" />
                <p className="name">Prénom Nom</p>
              </div>
              <LikeCounter nbr={12} />  
            </Link>
          </div>
        )
      }
    </div >
  )
}

export default Search
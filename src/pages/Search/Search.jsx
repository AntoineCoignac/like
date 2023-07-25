import React, { useState } from 'react';
import Back from '../../components/Back/Back';
import "./Search.css";
import Cross from '../../icons/cross/Cross';
import NavSearch from '../../components/NavSearch/NavSearch';
import { Link, useActionData } from 'react-router-dom';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import LikeCounter from '../../components/LikeCounter/LikeCounter';

function Search() {

  const [isSearching, setIsSearching] = useState(false);
  const [type, setType] = useState("gig");
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setIsSearching(e.target.value !== '');
    console.log(e.target.value);
  }

  const handleDelete = () => {
    setSearch("");
    setIsSearching(false);
  }


  return (
    <div className="search">
      <div className="top-bar">
        <Back />
        <div className='searchbar-ctn'>
          <input onChange={handleSearch} defaultValue={search} className='searchbar' type="text" placeholder='Rechercher' />
          <button onClick={handleDelete} className={`delete ${isSearching ? "active" : ""}`}>
            <Cross />
          </button>
        </div>
      </div>
      <NavSearch setType={setType} activeType={type} />
      {
        type === "gig" ? (
          <div className="gigs">
            <div className='gig-result'>
              <Link to={`gig/123`} className="gig">
                <p className="title">Title</p>
                <p className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat unde suscipit fugiat odit blanditiis saepe optio corporis reprehenderit vitae sed est accusamus quo hic, voluptatibus, exercitationem temporibus nihil quae aliquid fugit ex, tempore eligendi. Vero id explicabo repudiandae possimus suscipit nihil assumenda, natus rem ut quis, rerum in fuga exercitationem!</p>
                <div className="infos">
                  <span className="info">100€</span>
                  <span className="info">6 jours</span>
                  <span className="info">influenceur</span>
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
            <div className='gig-result'>
              <Link to={`gig/123`} className="gig">
                <p className="title">Title</p>
                <p className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat unde suscipit fugiat odit blanditiis saepe optio corporis reprehenderit vitae sed est accusamus quo hic, voluptatibus, exercitationem temporibus nihil quae aliquid fugit ex, tempore eligendi. Vero id explicabo repudiandae possimus suscipit nihil assumenda, natus rem ut quis, rerum in fuga exercitationem!</p>
                <div className="infos">
                  <span className="info">100€</span>
                  <span className="info">6 jours</span>
                  <span className="info">influenceur</span>
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
          </div >
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
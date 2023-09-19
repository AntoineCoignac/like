import React, { useEffect, useState } from 'react';
import Back from '../../components/Back/Back';
import "./Search.css";
import Cross from '../../icons/cross/Cross';
import NavSearch from '../../components/NavSearch/NavSearch';
import { Link } from 'react-router-dom';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import LikeCounter from '../../components/LikeCounter/LikeCounter';
import newRequest from '../../utils/newRequest';
import Enterprise from '../../icons/enterprise/Enterprise';
import BackArrow from '../../icons/back/BackArrow';

function Search() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
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
          <input onChange={handleSearch} value={search} className='searchbar' type="text" placeholder='Rechercher' autoFocus />
          <button onClick={handleDelete} className={`delete ${isSearching ? "active" : ""}`}>
            <Cross />
          </button>
        </div>
      </div>
      {search !== "" ? <NavSearch setType={setType} activeType={type} /> : null}
      {type === "gig" ? (
        <div className="gigs">
          {result ? (
            result.map(gig => (
              gig.user ?
              <div className="gig-result">
                  <Link to={`gig/${gig._id}`} className="card-content">
                      <Link to={`/user/${gig.user._id}`}>
                          <ProfilePicture photo={gig.user.img} badge={gig.user.sub ? gig.user.sub : 0} />
                      </Link>
                      <div className="gig">
                          <p className="gig-title">
                              {gig.title}
                          </p>
                          <p className="gig-name">
                              {`${gig.user.name} ${gig.user.lastname.charAt(0)}.`}
                          </p>
                          <div className="infos">
                              <span className="info">{gig.price}€</span>
                              <span className="info">{gig.tag}</span>
                          </div>
                      </div>
                  </Link>
              </div> : null
            ))
          ) : null}
        </div>
      ) : (
        <div className="users">
          {result ? (
            result.map(user => (
              <Link key={user._id} to={`/user/${user._id}`} className='user-result'>
                <div className="profile">
                  <ProfilePicture photo={user.img} badge={user.sub} />
                  <p className="name">{user.name} {user.isSeller ? `${user.lastname.charAt(0)}.` : ""}</p>
                </div>
                {user.isSeller ? <LikeCounter nbr={user.like} /> : <Enterprise />}
              </Link>
            ))
          ) : null}
        </div>
      )}
    </div>
  );

}

export default Search
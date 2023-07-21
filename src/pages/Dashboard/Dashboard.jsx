import React from 'react'
import Nav from '../../components/Nav/Nav'
import { Link } from 'react-router-dom'
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture'
import BackArrow from '../../icons/back/BackArrow';
import './Dashboard.css';

function Dashboard() {

  return (
    <>
      <Nav />
      <div className="dashboard">
        <div className="recap">
          <div>
            <span className='big'>1260€</span>
            <p>Au total</p>
          </div>
          <div>
            <span className='big'>75</span>
            <p>Likes</p>
          </div>
        </div>
        <Link className='edit-link' to=''>
          <div className="profile">
            <ProfilePicture />
            <p className="name">Test</p>
          </div>
          <div className="arrow-button">
            <span>Modifier</span>
            <BackArrow />
          </div>
        </Link>
        <div className="section">
          <span className='section-title'>Commandes en cours</span>
          <Link key={1} className='order-item' to={`/work/order/${1}`}>
            <ProfilePicture photo={"/img/pp/user1.jpg"} badge={1} />
            <div>
              <p className="title">{"Lorem ipsum"}</p>
              <div className="infos">
                <span className="info">{100}€</span>
                <span className="info">{6} jours</span>
                <span className="info">{"influence"}</span>
              </div>
            </div>
          </Link>
        </div>
        <div className="section">
          <span className='section-title'>Mes tarifs <Link to="/newgig" className='add'></Link></span>
          <Link className="rate">
            <div>
              <p className="title">{"Lorem Ipsum"}</p>
              <div className="infos">
                <span className="info">{100}€</span>
                <span className="info">{5} jours</span>
                <span className="info">{"influence"}</span>
              </div>
            </div>
            <div className="arrow-button">
              <span>Modifier</span>
              <BackArrow />
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Dashboard
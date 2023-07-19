import React from 'react'
import "./Creator.css"
import Nav from '../../components/Nav/Nav';
import { Link, useParams } from 'react-router-dom';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import Back from '../../components/Back/Back';
import LocationIcon from '../../icons/location/LocationIcon';
import InstagramIcon from '../../icons/social/InstagramIcon';
import YoutubeIcon from '../../icons/social/YoutubeIcon';
import TwitterIcon from '../../icons/social/TwitterIcon';
import TiktokIcon from '../../icons/social/TiktokIcon';
import Media from '../../components/Media/Media';
import Accordion from '../../components/Accordion/Accordion';
import Like from '../../icons/like/Like';

function Creator() {

  const { id } = useParams();

  return (
    <>
      <div className="top-bar">
        <Back />
        <p className="name">{"Lorem Ipsum"}</p>
      </div>
      <div className="profile-ctn">
        <div className="top">
          <ProfilePicture photo={"/img/pp/user1.jpg"} badge={1} />
          <p className="name">{"Lorem Ipsum"}</p>
          <Link className='btn' to={`/work/chat/${1}`}>Contacter {"Lorem"}</Link>
          <p className="desc">
            {"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse ratione molestias illum et, error adipisci animi cumque numquam quas aliquam."}
          </p>
          <div className="infos">
            <span className="info">
              <Like/>
              <span>{12}</span>
            </span>
            <span className="info">
              <LocationIcon />
              <span>{"Paris, Ille de France, France"}</span>
            </span>
            <span key={"insta"} className="info">
              <InstagramIcon />
              <span>{"10k"}</span>
            </span>
            <span key={"ytb"} className="info">
              <YoutubeIcon />
              <span>{"5k"}</span>
            </span>
            <span key={"twitter"} className="info">
              <TwitterIcon />
              <span>{"2k"}</span>
            </span>
            <span key={"tiktok"} className="info">
              <TiktokIcon />
              <span>{"10k"}</span>
            </span>
          </div>
        </div>
        <div className="section">
          <span className='section-title'>Prestations</span>
          <div className="gallery">
            <div className='gig-result'>
              <Media key={1} type={"video"} src={"/img/post/video"} />
              <Link to={`gig/123`} className="gig">
                <p className="title">{"Lorem Ipsum"}</p>
                <p className='desc'>{"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quaerat temporibus exercitationem tenetur totam ab voluptates dolorum. Perferendis, sequi facere."}</p>
                <div className="infos">
                  <span className="info">{100}€</span>
                  <span className="info">{6} jours</span>
                  <span className="info">{"influence"}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Creator;
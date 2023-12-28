import React from 'react'
import { Link } from 'react-router-dom'
import ProfilePicture from '../ProfilePicture/ProfilePicture'
import MessageIcon from '../../icons/noti/MessageIcon'
import LikeIcon from '../../icons/noti/LikeIcon'
import TimeIcon from '../../icons/noti/TimeIcon'
import WorkIcon from '../../icons/noti/WorkIcon'
import "./Notification.scss"

function Notification({ type, from, order }) {
  if (type === "like") {
    return (
      <Link to={`/work/chat/${from}`} className='notification'>
        <div className="noti-icon-ctn">
          <LikeIcon/>
        </div>
        <div className='noti-content'>
          <ProfilePicture photo={"/img/pp/user4.jpg"} badge='premium' />
          <p><span className='name'>Test</span> a liké votre prestation.</p>
        </div>
      </Link>
    )
  } else if (type === "message") {
    return (
      <Link to={`/work/chat/${from}`} className='notification'>
        <div className="noti-icon-ctn">
          <MessageIcon/>
        </div>
        <div className='noti-content'>
          <ProfilePicture photo={"/img/pp/user5.jpg"} badge=''/>
          <p><span className='name'>Test</span> vous a envoyé un message.</p>
        </div>
      </Link>
    )
  } else if (type === "time") {
    return (
      <Link to={`/work/order/${order}`} className='notification'>
        <div className="noti-icon-ctn">
          <TimeIcon/>
        </div>
        <div className='noti-content'>
          <ProfilePicture photo={"/img/pp/user6.jpg"} badge='starter'/>
          <p>Il vous reste 1 jour pour rendre la commande de <span className='name'>Test</span>.</p>
        </div>
      </Link>
    )
  } else if (type === "order") {
    return (
      <Link to={`/work/order/${order}`} className='notification'>
        <div className="noti-icon-ctn">
          <WorkIcon/>
        </div>
        <div className='noti-content'>
          <ProfilePicture photo={"/img/pp/user7.jpg"} badge='pro' />
          <p><span className='name'>Test</span> a commandé.</p>
        </div>
      </Link>

    )

  }
}

export default Notification
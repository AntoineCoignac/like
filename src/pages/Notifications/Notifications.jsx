import React from 'react';
import Nav from '../../components/Nav/Nav';
import Notification from '../../components/Notification/Notification';
import "./Notifications.scss"

function Notifications() {
  return (
    <>
      <Nav/>
      <div className="notifications">
        <Notification type="like" from="1"/>
        <Notification type="message" from="2"/>
        <Notification type="time" order="1"/>
        <Notification type="order" order="2"/>
      </div>
    </>
  )
}

export default Notifications;
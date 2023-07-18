import React from 'react'
import Nav from '../../components/Nav/Nav';
import "./EditAccount.css";
import EditBrand from '../../components/EditBrand/EditBrand';
import EditCreator from '../../components/EditCreator/EditCreator';

function EditAccount() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <>
      <Nav></Nav>
      <div className='me'>
        {
          currentUser.isSeller ? (
            <EditCreator/>
          ) : (
            <EditBrand/>
          )
        }
      </div>
    </>
  )
}

export default EditAccount;
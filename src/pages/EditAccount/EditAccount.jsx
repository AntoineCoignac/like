import React from 'react'
import Nav from '../../components/Nav/Nav';
import "./EditAccount.css";
import EditBrand from '../../components/EditBrand/EditBrand';
import EditCreator from '../../components/EditCreator/EditCreator';
import { useNavigate } from 'react-router-dom';
import Back from '../../components/Back/Back';

function EditAccount() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  if (currentUser) {
    return (
      <>
        <div className="top-bar">
          <Back/>
          <p className='name big-title'>Modifier mon compte</p>
        </div>
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
  }else{
    navigate("/login");
  }
}

export default EditAccount;
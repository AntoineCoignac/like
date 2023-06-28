import React from 'react'
import Nav from '../../components/Nav/Nav';
import "./EditAccount.css";
import EditBrand from '../../components/EditBrand/EditBrand';
import EditCreator from '../../components/EditCreator/EditCreator';
import { useState } from 'react';

function EditAccount() {
  const [isBrand, setIsBrand] = useState(false);
  return (
    <>
      <Nav></Nav>
      <div className='me'>
        {
          isBrand ? (
            <EditBrand/>
          ) : (
            <EditCreator/>
          )
        }
      </div>
    </>
  )
}

export default EditAccount;
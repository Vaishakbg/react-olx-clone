import { collection, getDocs, where } from 'firebase/firestore/lite';
import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';
import { PostContext } from '../../store/PostContext';

import './View.css';
function View() {
  const {postDetails} = useContext(PostContext);
  const {firebase} = useContext(FirebaseContext);
  const [userDetails, setUserDetails] = useState()
  useEffect(() => {
    const {userId} = postDetails
    const getUserDetails = async () => {
      const querySnapshot = await getDocs(collection(firebase, "users"), where('id', '==', userId));
      querySnapshot.forEach(doc => {
        setUserDetails(doc.data());
      });
    };
    getUserDetails();
    console.log(userDetails);
  }, [])
  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;

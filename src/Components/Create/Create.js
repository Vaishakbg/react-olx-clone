import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore/lite";
import { AuthContext, FirebaseContext } from "../../store/FirebaseContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { firebase, storage } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const date = new Date();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    const storageRef = ref(storage, `/images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          // setImage(downloadURL)
          const data = {
            name,
            category,
            price,
            url: downloadURL,
            userId: user.uid,
            createdAt: date.toDateString(),
          };
          console.log(user, data);
          addDoc(collection(firebase, "products"), data).then(() => {
            console.log("product added!");
            navigate("/");
          });
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Fragment>
      <Header />
      <div>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="price"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>
          <br />
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <br />
          <button className="uploadBtn" onClick={handleSubmit}>
            upload and Submit
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;

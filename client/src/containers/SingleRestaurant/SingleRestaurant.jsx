import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";

const SingleRestaurant = () => {
  const [restaurant, setRestaurant] = useState({});
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/api/restaurants/${id}`)
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleDeleteClick = () => {
    axios
      .delete(`/api/restaurants/${id}`)
      .then((response) => {
        console.log(response.data);
        history.push("/restaurants");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s6">
          <h1>{restaurant.name}</h1>
          <Link
            to={`/restaurants/${id}/edit`}
            className="waves-effect waves-light btn"
          >
            Edit
          </Link>
          <button
            className="waves-effect waves-light btn"
            onClick={handleDeleteClick}
          >
            DELETE
          </button>
        </div>
        <div className="col s6">
          <img
            src={restaurant.featuredImageUrl}
            alt={restaurant.name}
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <p>{restaurant.address}</p>
          <p>{restaurant.city}</p>
          <p>{restaurant.state}</p>
          <p>{restaurant.zip}</p>
          <p>{restaurant.phone}</p>
          <p>{restaurant.cuisine}</p>
        </div>
      </div>
      <div className="row">
        <div className="col s12">TODO: ADD MENU ITEMS HERE.</div>
      </div>
    </div>
  );
};

export default SingleRestaurant;

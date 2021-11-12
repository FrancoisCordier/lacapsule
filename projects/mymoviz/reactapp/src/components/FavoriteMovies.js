import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { Button, Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FavoriteMovies = ({
  favoriteMoviesCount,
  favoriteMovies,
  removeMovieFromFavorite,
}) => {
  const favoriteMoviesList = favoriteMovies.map((el, index) => {
    return (
      <div
        className="card mb-3 text-white"
        key={index}
        style={{ backgroundColor: "#17191A" }}
      >
        <div className="row g-0 d-flex align-items-center">
          <div className="col-md-4">
            <img src={el.img} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title m-0">{el.title}</h5>
            </div>
          </div>
          <div className="col-md-1">
            <FontAwesomeIcon
              className="text-danger"
              icon={faTrash}
              style={{ cursor: "pointer" }}
              onClick={() => removeMovieFromFavorite(el.title)}
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <button
        className="btn btn-danger fw-bold"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <FontAwesomeIcon icon={faHeart} /> {favoriteMoviesCount}
      </button>

      <div
        className="offcanvas offcanvas-end bg-dark"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header text-white">
          <h5 id="offcanvasRightLabel">Mes films favoris</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">{favoriteMoviesList}</div>
      </div>
    </>
  );
};

export default FavoriteMovies;

import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Badge,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as faStarSolid,
  faVideo,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import {
  faStar as faStarRegular,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";

const MovieCard = (props) => {
  // States
  const [rating, setRating] = useState(0);
  const [globalRating, setGlobalRating] = useState(props.globalRating);
  const [voteCounter, setVoteCounter] = useState(props.voteCounter);
  const [viewCounter, setViewCounter] = useState(Math.round(props.viewCounter));

  // Calculate average global rating
  const calculateAverage = (i) => {
    setRating(i + 1);
    setVoteCounter(voteCounter + 1);

    const newAvg = (voteCounter * globalRating + i + 1) / (voteCounter + 1);
    setGlobalRating(newAvg);

    console.log("---------- NEW DATA ---------");
    console.log("Votes : ", voteCounter);
    console.log("Global : ", globalRating);
    console.log("Rating : ", i + 1);
    console.log(
      "Moyenne : ",
      (voteCounter * globalRating + i + 1) / (voteCounter + 1)
    );
    console.log(
      "Moyenne ROUND: ",
      Math.round((voteCounter * globalRating + i + 1) / (voteCounter + 1))
    );

    return newAvg;
  };

  // Change like status
  const changeLike = (name, img) => {
    props.isFavorite
      ? props.removeMovieFromFavorite(name)
      : props.addMovieToFavorite(name, img);
  };

  // Display like
  let likeButton;
  if (props.isFavorite) {
    likeButton = { icon: faHeartSolid, color: "text-danger" };
  } else {
    likeButton = { icon: faHeartRegular, color: "" };
  }

  // Display stars my rating
  const myRatingStars = [];
  for (let i = 0; i < 10; i++) {
    let icon = faStarRegular;
    let color = "";
    if (i < rating) {
      icon = faStarSolid;
      color = "text-warning";
    }
    myRatingStars.push(
      <FontAwesomeIcon
        key={i}
        icon={icon}
        className={color}
        onClick={() => {
          calculateAverage(i);
        }}
        style={{ cursor: "pointer" }}
      />
    );
  }

  // Display stars global rating
  const globalRatingStars = [];
  for (let i = 0; i < 10; i++) {
    let icon = faStarRegular;
    let color = "";
    if (i < Math.round(globalRating)) {
      icon = faStarSolid;
      color = "text-warning";
    }
    globalRatingStars.push(
      <FontAwesomeIcon key={i} icon={icon} className={color} />
    );
  }

  return (
    <Card
      className="mb-3 h-100 text-white"
      style={{ backgroundColor: "#17191A" }}
    >
      <CardImg alt="Card image cap" src={props.movieImg} top width="100%" />
      <CardBody>
        <CardTitle tag="h5">{props.movieName}</CardTitle>
        <CardText className="text-start">{props.movieDesc}</CardText>
      </CardBody>
      <div className="card-footer">
        <CardText className="small text-start">
          <FontAwesomeIcon
            icon={faVideo}
            style={{ cursor: "pointer" }}
            onClick={() => setViewCounter(viewCounter + 1)}
          />{" "}
          Nombre de vues : <Badge pill>{viewCounter}</Badge>
        </CardText>
        <CardText className="small text-start">
          <FontAwesomeIcon icon={faStarSolid} /> Mon avis : {myRatingStars}
        </CardText>
        <CardText className="small text-start">
          <FontAwesomeIcon icon={faStarSolid} /> Moyenne : {globalRatingStars} (
          {voteCounter} avis)
        </CardText>
        <div className="text-end">
          <FontAwesomeIcon
            size="lg"
            className={likeButton.color}
            icon={likeButton.icon}
            style={{ cursor: "pointer" }}
            onClick={() => {
              changeLike(props.movieName, props.movieImg);
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default MovieCard;

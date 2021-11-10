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
  const [viewCounter, setViewCounter] = useState(0);

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

  // Display like
  let likeButton;
  if (props.isFavorite) {
    likeButton = (
      <FontAwesomeIcon
        size="lg"
        className="text-danger"
        icon={faHeartSolid}
        style={{ cursor: "pointer" }}
        onClick={() => {
          props.removeMovieFromFavorite(props.movieName);
        }}
      />
    );
  } else {
    likeButton = (
      <FontAwesomeIcon
        size="lg"
        icon={faHeartRegular}
        style={{ cursor: "pointer" }}
        onClick={() => {
          props.addMovieToFavorite(props.movieName, props.movieImg);
        }}
      />
    );
  }

  // Display stars my rating
  const myRatingStars = [];
  for (let i = 0; i < 5; i++) {
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
  for (let i = 0; i < 5; i++) {
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
    <Card className="mb-3 h-100">
      <CardImg alt="Card image cap" src={props.movieImg} top width="100%" />
      <CardBody>
        <CardTitle tag="h5">{props.movieName}</CardTitle>
        <CardText className="text-start">{props.movieDesc}</CardText>
      </CardBody>
      <div className="card-footer">
        <CardText className="text-muted small text-start">
          <FontAwesomeIcon
            icon={faVideo}
            style={{ cursor: "pointer" }}
            onClick={() => setViewCounter(viewCounter + 1)}
          />{" "}
          Nombre de vues : <Badge pill>{viewCounter}</Badge>
        </CardText>
        <CardText className="text-muted small text-start">
          <FontAwesomeIcon icon={faStarSolid} /> Mon avis : {myRatingStars}
        </CardText>
        <CardText className="text-muted small text-start">
          <FontAwesomeIcon icon={faStarSolid} /> Moyenne : {globalRatingStars} (
          {voteCounter} avis)
        </CardText>
        <div className="text-end">{likeButton}</div>
      </div>
    </Card>
  );
};

export default MovieCard;

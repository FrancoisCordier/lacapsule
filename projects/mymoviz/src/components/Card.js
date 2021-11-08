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
  faCaretSquareUp,
  faCaretSquareDown,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import {
  faStar as faStarRegular,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";

const MovieCard = (props) => {
  const [like, setLike] = useState(false);
  const [rating, setRating] = useState(props.myRating);
  let likeButton;
  if (like) {
    likeButton = (
      <FontAwesomeIcon
        size="lg"
        className="text-danger"
        icon={faHeartSolid}
        style={{ cursor: "pointer" }}
        onClick={() => setLike(!like)}
      />
    );
  } else {
    likeButton = (
      <FontAwesomeIcon
        size="lg"
        icon={faHeartRegular}
        style={{ cursor: "pointer" }}
        onClick={() => setLike(!like)}
      />
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
          <FontAwesomeIcon icon={faVideo} /> Nombre de vues :{" "}
          <Badge pill>0</Badge>
        </CardText>
        <CardText className="text-muted small text-start">
          <FontAwesomeIcon icon={faStarSolid} /> Mon avis :{" "}
          {[...Array(rating)].map((index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStarSolid}
              className="text-warning"
            />
          ))}
          {[...Array(5 - rating)].map((index) => (
            <FontAwesomeIcon key={index} icon={faStarRegular} />
          ))}{" "}
          <FontAwesomeIcon
            icon={faCaretSquareUp}
            style={{ cursor: "pointer" }}
            onClick={() => setRating(rating < 5 ? rating + 1 : rating)}
            className="text-success"
          />{" "}
          <FontAwesomeIcon
            icon={faCaretSquareDown}
            style={{ cursor: "pointer" }}
            onClick={() => setRating(rating > 0 ? rating - 1 : rating)}
            className="text-danger"
          />
        </CardText>
        <CardText className="text-muted small text-start">
          <FontAwesomeIcon icon={faStarSolid} /> Moyenne :{" "}
          {[...Array(props.globalRating)].map((index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStarSolid}
              className="text-warning"
            />
          ))}
          {[...Array(5 - props.globalRating)].map((index) => (
            <FontAwesomeIcon key={index} icon={faStarRegular} />
          ))}
        </CardText>
        <div className="text-end">{likeButton}</div>
      </div>
    </Card>
  );
};

export default MovieCard;

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Collapse, Card, CardBody } from "reactstrap";

const FavoriteMovies = () => {
  return (
    <>
      <Button
        color="primary"
        onClick={function noRefCheck() {}}
        style={{
          marginBottom: "1rem",
        }}
      >
        Toggle
      </Button>
      <Collapse>
        <Card>
          <CardBody>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
            labore wes anderson cred nesciunt sapiente ea proident.
          </CardBody>
        </Card>
      </Collapse>
    </>
  );
};

export default FavoriteMovies;

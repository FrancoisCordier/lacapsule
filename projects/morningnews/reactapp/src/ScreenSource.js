import React, { useEffect, useState } from "react";
import "./App.css";
import { List, Avatar } from "antd";
import Nav from "./Nav";
import axios from "axios";
import { Link } from "react-router-dom";

const newsAPI = axios.create({
  baseURL: "https://newsapi.org/v2/",
});

function ScreenSource() {
  const [sourceList, setSourceList] = useState([]);

  useEffect(() => {
    newsAPI
      .get("/top-headlines/sources", {
        params: { apiKey: "f349b8c728944e15b3bf505ea1ec4cea", country: "fr" },
      })
      .then((response) => setSourceList(response.data.sources));
  }, []);

  return (
    <div>
      <Nav />
      <div className="Banner" />
      <div className="HomeThemes">
        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`../images/${item.category}.png`} />}
                title={
                  <Link to={`/screenarticlesbysource/${item.id}`}>
                    {item.name}
                  </Link>
                }
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default ScreenSource;

import React, { useEffect, useState } from "react";
import "./App.css";
import { Card, Icon } from "antd";
import Nav from "./Nav";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "antd";

const { Meta } = Card;

const newsAPI = axios.create({
  baseURL: "https://newsapi.org/v2/",
});

function ScreenArticlesBySource() {
  const [articleList, setArticleList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({});
  const { id } = useParams();

  useEffect(() => {
    newsAPI
      .get("/everything", {
        params: {
          apiKey: "f349b8c728944e15b3bf505ea1ec4cea",
          sources: id,
        },
      })
      .then((response) => setArticleList(response.data.articles));
  }, []);

  const showModal = (article) => {
    setIsModalVisible(true);
    setSelectedArticle(article);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  console.log(articleList, selectedArticle);
  return (
    <div>
      <Nav />
      <div className="Banner" />
      <div className="Card">
        {articleList.map((article, index) => {
          return (
            <div
              key={index}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                style={{
                  width: 300,
                  margin: "15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                cover={
                  <img
                    alt="example"
                    src={
                      article.urlToImage
                        ? article.urlToImage
                        : "../images/back02.jpg"
                    }
                  />
                }
                actions={[
                  <Icon
                    index={index}
                    type="read"
                    key="ellipsis2"
                    onClick={() => showModal(article)}
                  />,
                  <Icon type="like" key="ellipsis" />,
                ]}
              >
                <Meta title={article.title} description={article.description} />
              </Card>
            </div>
          );
        })}
      </div>
      <Modal
        title={selectedArticle.title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedArticle.content}
      </Modal>
    </div>
  );
}

export default ScreenArticlesBySource;

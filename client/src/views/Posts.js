import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup
} from "reactstrap";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PostsController } from "../sdk/postsController.sdk.js";


export default (props) => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await PostsController.getAllPosts(
        {token: localStorage.getItem("apiToken")}
      );
      if (res.success) {
        setPosts(res.data);
      }
    }
    fetchPosts();
  }, []);


  return (
    <>
      <Container className="mt-2">
			<Card className="p-4 mt-2">

        <Row className="mt-2">
          <Col sm="11">
              <h3>All Posts</h3>
              <Row>
                  {posts.map((post) => (
                <Col sm="12" key={post._id}>
                  <h3>{post.post_title}</h3>
                  <p><b>author: </b>{post.post_author} | {post.post_date}</p>
                  <p>{post.post_excerpt}</p>

                      <p>{post.post_content}</p>
                      <p><b>tags: </b>{post.post_tags}</p>
                      </Col>
                  ))}
              </Row>
          </Col>
        </Row>
				</Card>

      </Container>
    </>
  );
};
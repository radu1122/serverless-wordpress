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
  const [modalAddPost, setModalAddPost] = useState(false);

  const [error, setError] = useState("");

  const [post_author, setPostAuthor] = useState("");
  const [post_content, setPostContent] = useState("");
  const [post_title, setPostTitle] = useState("");
  const [post_excerpt, setPostExcerpt] = useState("");
  const [post_tags, setPostTags] = useState(["capybara", "react", "nodejs"]);


  const toggleModalAddPost = () => {
    setModalAddPost(!modalAddPost);
    setOptionValue("");
    setOptionName("");
  };

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


  async function handleAdd(e) {
    e.preventDefault();
    if (!post_author || !post_content || !post_title || !post_excerpt) {
      setError("All fields are mandatory");
      return;
    }

    const res = await PostsController.createPost({
      token: localStorage.getItem("apiToken"),
      body: {
        post_author: post_author,
        post_content: post_content,
        post_title: post_title,
        post_excerpt: post_excerpt,
        post_tags: post_tags,
      }
    });
    if (res.success) {
      // refresh the page
      window.location.reload();
    }
  }

  return (
    <>
      <Modal isOpen={modalAddPost} toggle={toggleModalAddPost}>
        <ModalHeader toggle={toggleModalAddPost}>Add Post</ModalHeader>
        <form>
          <ModalBody>
            <span className="text-danger">{error}</span>
            <div className="mb-3">
              <label>Post Author</label>
              <Input
                className="form-control"
                placeholder="author"
                type="author"
                autoComplete="author"
                value={post_author}
                onChange={(e) => setPostAuthor(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Post Content</label>
              <textarea
                className="form-control"
                placeholder="content"
                type="content"
                autoComplete="content"
                value={post_content}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Post Title</label>
              <Input
                className="form-control"
                placeholder="title"
                type="title"
                autoComplete="title"
                value={post_title}
                onChange={(e) => setPostTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Post Excerpt</label>
              <Input
                className="form-control"
                placeholder="excerpt"
                type="excerpt"
                autoComplete="excerpt"
                value={post_excerpt}
                onChange={(e) => setPostExcerpt(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => handleAdd(e)} type="submit">
              Add
            </Button>
            <Button color="secondary" onClick={toggleModalAddPost}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
      <Container className="mt-2">
			<Card className="p-4 mt-2">

        <Row className="mt-2">
          <Col sm="11">
              <h3>All Posts</h3>

              <Row>
                <Col sm="12">
                  {posts.map((post) => (
                    <div key={post._id} className="mb-3">

                      <p><b>post_author: </b>{post.post_author}</p>
                      <p><b>post_date: </b>{post.post_date}</p>
                      <p><b>post_content: </b>{post.post_content}</p>
                      <p><b>post_title: </b>{post.post_title}</p>
                      <p><b>post_excerpt: </b>{post.post_excerpt}</p>
                      <p><b>post_status: </b>{post.post_status}</p>
                      <p><b>post_tags: </b>{post.post_tags}</p>
                      <p><b>comment_count: </b>{post.comment_count}</p>

                      <ButtonGroup aria-label="Basic example">
                        <Button
                          color="danger"
                          onClick={() => handleDelete(post._id)}
                        >
                          Delete post
                        </Button>
                      </ButtonGroup>
                    </div>
                  ))}
                </Col>

                <Col sm="3" className="mt-4">
                  <Button
                    color="primary"
                    onClick={() => {
                      toggleModalAddPost();
                    }}
                  >
                    Add Post
                  </Button>
                </Col>
              </Row>
          </Col>
          <Col sm="1" className="text-right">
            <Button
              color="primary"
              onClick={() => {
                localStorage.removeItem("apiToken");
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </Col>
        </Row>
				</Card>

      </Container>
    </>
  );
};
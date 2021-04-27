import { Button, Card, Form, Col, Modal, Container, Row, Image } from "react-bootstrap";
import { Trash, PencilSquare, Search } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./UserList.css";
import types from "../store/actions/types";
import actions from "../store/actions";
import Loader from './common/Loader'

const UserList = (props) => {
  let history = useHistory();
  const formRef = useRef(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchText, setSearchText] = useState("");
  const { users } = props;

  useEffect(() => {
    if (!users.length) {
      setLoading(true)
      props.getUserList();
      setLoading(false)
    }
  }, [users, props]);

  const deleteItem = (id) => {
    setLoading(true);
    props.deleteUserRecord(id);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const editItem = (id) => {
    history.push("/add/" + id);
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      props.setLoader(true);
      props.getUserList(searchText);
      setTimeout(() => {
        props.setLoader(false);
      }, 3000);
    }
  };

  const handleReset = () => {
    formRef.current.reset();
    setValidated(false);
  };

  const clearText = () => {
    setSearchText("");
    handleReset();
    props.getUserList(searchText);
  };

  const cardView = (obj) => {
    setSelected(obj);
    setShow(true)
  }

  return (
    <div>
      <div>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          validated={validated}
        >
          <Form.Row className="align-items-center" style={{marginLeft: '7px'}}>
            <Form.Group as={Col} xs="10" controlId="searchText">
              <Form.Control
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Enter search text"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter search text.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} xs="2">
            <Button type="submit">
              <Search></Search>
            </Button> &nbsp;
            <Button variant="secondary" onClick={clearText}>Clear</Button>
            </Form.Group>
          </Form.Row>

        </Form>
      </div>
      <div className="div-cardlist">
        {
          loading && <Loader/>
        }

        {!loading && !users.length && (
          <span style={{ marginLeft: "20px" }}>No Data !!</span>
        )}
        {!loading && users.map((r, index) => (
          <Card key={index} onClick={() => cardView(r)}>
            <div>
              <Card.Img variant="top" src={r.imgUrl} />
              <Button
                variant="link"
                className="edit-btn"
                onClick={() => editItem(r.id)}
                size="sm"
              >
                <PencilSquare />
              </Button>
              <Button
                variant="link"
                className="delete-btn"
                onClick={() => deleteItem(r.id)}
                size="sm"
              >
                <Trash />
              </Button>
            </div>
            <Card.Body>
              <Card.Title>
                {" "}
                Name :{" "}
                <span className="name">
                  {r.firstName} {r.lastName}
                </span>
              </Card.Title>
              <Card.Text>About : {r.desc}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      {
        show && 
        <Modal
        show={show}
        onHide={() => {
          setShow(false)
          setSelected(null)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
          <Row>
            <Col xs={12} md={2}>
              <Image src={selected.imgUrl} roundedCircle width="60px" height="40px"/>
            </Col>
            <Col xs={12} md={5}>
              <b>First Name :</b> {selected.firstName}
            </Col>
            <Col xs={12} md={5}>
              <b>Last Name :</b> {selected.lastName}
            </Col>
          </Row>
            <Row>
              <Col xs="auto">
                <b>About :</b> {selected.desc}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShow(false)
            setSelected(null)
          }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      }

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users || [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserList: (payload) => {
      dispatch(actions.userList(payload));
    },
    setLoader: (flag) => {
      dispatch(actions.setLoading(flag));
    },
    deleteUserRecord: (index) => {
      dispatch({ type: types.DELETE_USER, payload: index });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserList);

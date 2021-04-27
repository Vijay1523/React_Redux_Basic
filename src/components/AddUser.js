import { Button, Form, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import { connect, useSelector } from "react-redux";
import actions from "../store/actions";
import "./AddUser.css"

const AddUser = (props) => {
  let history = useHistory();
  const { id } = useParams();

  const user = useSelector((state) => {
      return state.users.find((r) => r.id === parseInt(id))
    }
  );
  const [validated, setValidated] = useState(false)
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [desc, setDesc] = useState(user?.desc || '')

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      let params = { firstName, lastName, desc };
      let key = id ?  'update' : 'addItem';
      if(id) {
        params['id'] = id;
      }
      props[key](params);
      history.push("/")
    }

  };

  return (
    <Form onSubmit={handleSubmit} noValidate validated={validated}>
      <Form.Group as={Col} controlId="firstName">
        <Form.Label column sm="2">
          First Name <span className="error">*</span>
        </Form.Label>
        <Col sm="10">
          <Form.Control
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter First Name"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter first name.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Col} controlId="lastName">
        <Form.Label column sm="2">
          Last Name <span className="error">*</span>
        </Form.Label>
        <Col sm="10">
          <Form.Control
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Last Name"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter last name.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Col} controlId="about">
        <Form.Label column sm="2">About (Optional)</Form.Label>
        <Col sm="10">
        <Form.Control
          as="textarea"
          rows={2}
          length={50}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter about text"
        />
        </Col>
      </Form.Group>
      <br />
      <Form.Group as={Col}>
        <Button variant="primary" type="submit">
          Submit
        </Button> &nbsp;
        <Button variant="secondary" onClick={history.goBack}>
          Cancel
        </Button>
      </Form.Group>
    </Form>
  );
};

const mapStateToProps = state => {
  return {
    userDetail: state.selectedUserDetail,
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (payload) => {
      dispatch(actions.addUser(payload));
    },
    getDetailById: (id) => {
      dispatch(actions.getUserById(id));
    },
    update: (payload) => {
      dispatch(actions.updateUser(payload))
    },
    setLoader: (flag) => { dispatch(actions.setLoading(flag)) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);

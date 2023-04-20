import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function CreateNote({ history }) {
  const [headline, setHeadline] = useState("");
  const [aboutYou, setAboutYou] = useState("");
  const [education, setEducation] = useState("");
  const [relevantExperience, setRelevantExperience] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;

  const resetHandler = () => {
    setHeadline("");
    setAboutYou("");
    setEducation("");
    setRelevantExperience("");
    setCategory("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('bruh')
    dispatch(createNoteAction(headline, aboutYou, education, relevantExperience, category));
    if (!headline || !aboutYou || !category) return;

    resetHandler();
    history.push("/home");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create a Task">
      <Card>
        <Card.Header>List your task</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Task Name*</Form.Label>
              <Form.Control
                type="title"
                value={headline}
                placeholder="Walk me home from Moffit"
                onChange={(e) => setHeadline(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="Description">
              <Form.Label>Task Details*</Form.Label>
              <Form.Control
                as="textarea"
                value={aboutYou}
                placeholder="I need someone to walk me home from Moffit to Unit 2 today 10pm"
                rows={4}
                onChange={(e) => setAboutYou(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Price*</Form.Label>
              <Form.Control
                value={relevantExperience}
                placeholder="$10.00"
                rows={4}
                onChange={(e) => setRelevantExperience(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Deadline/Timing*</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="4/18 10PM"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Post Your Task
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;

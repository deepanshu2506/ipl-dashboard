import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import PlayerRepository from "../../../../data/PlayerRepository";
import "./styles.scss";
const initFilterState = {
  dob: { from: undefined, to: undefined },
  Batting_Hand: [],
  Bowling_Skill: [],
  Country: [],
};

const convertOptionsToFormat = (items) =>
  items.map((item) => ({
    label: item,
    value: item,
  }));

const PlayerFilterPoints = PlayerRepository.getFilterPoints([
  "Batting_Hand",
  "Bowling_Skill",
  "Country",
]);

const animatedComponents = makeAnimated();

const PlayerFilterDialog = ({
  show,
  handleClose,
  applyFilters,
  existingFilters,
  ...props
}) => {
  const [filters, modifyFilters] = useState(initFilterState);
  useEffect(() => {
    modifyFilters({ ...initFilterState, ...existingFilters });
  }, [modifyFilters, existingFilters]);
  const onFilterChange = (filterName) => (event) => {
    modifyFilters({ ...filters, [filterName]: event.map((e) => e.value) });
  };

  const filterData = () => {
    applyFilters(filters);
    handleClose();
  };
  const clearFilters = () => {
    applyFilters({});
    handleClose();
  };

  return (
    <Modal size="lg" show={show} centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Filter Players</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            <Col xs={12}>
              <span className="lead">Date Of Birth</span>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Form.Group controlId="from-dob">
                    <Form.Label>From</Form.Label>
                    <Form.Control
                      type="date"
                      value={
                        filters.dob.from
                          ? new Date(filters.dob.from)
                              .toISOString()
                              .substring(0, 10)
                          : ""
                      }
                      onChange={(event) =>
                        modifyFilters({
                          ...filters,
                          dob: { ...filters.dob, from: event.target.value },
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="to-dob">
                    <Form.Label>To</Form.Label>
                    <Form.Control
                      type="date"
                      value={
                        filters.dob.to
                          ? new Date(filters.dob.to)
                              .toISOString()
                              .substring(0, 10)
                          : ""
                      }
                      onChange={(event) =>
                        modifyFilters({
                          ...filters,
                          dob: { ...filters.dob, to: event.target.value },
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
          <hr className="mt-1 mb-3" />
          <Row>
            <Col>
              <Form.Group controlId="batting-hand">
                <Form.Label>
                  <span className="lead">Batting Hand</span>
                </Form.Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  value={convertOptionsToFormat(filters.Batting_Hand)}
                  isMulti
                  onChange={onFilterChange("Batting_Hand")}
                  options={convertOptionsToFormat(
                    PlayerFilterPoints.Batting_Hand
                  )}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="bowling-skill">
                <Form.Label>
                  <span className="lead">Bowling Skill</span>
                </Form.Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  value={convertOptionsToFormat(filters.Bowling_Skill)}
                  isMulti
                  onChange={onFilterChange("Bowling_Skill")}
                  options={convertOptionsToFormat(
                    PlayerFilterPoints.Bowling_Skill
                  )}
                />
              </Form.Group>
            </Col>
          </Row>
          <hr className="mt-1 mb-3" />
          <Row>
            <Col>
              <Form.Group controlId="country">
                <Form.Label>
                  <span className="lead">Country</span>
                </Form.Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  value={convertOptionsToFormat(filters.Country)}
                  isMulti
                  onChange={onFilterChange("Country")}
                  options={convertOptionsToFormat(PlayerFilterPoints.Country)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Row>
          <Button variant="outline-danger" onClick={clearFilters}>
            CLEAR
          </Button>
          <Button
            className="ml-2"
            onClick={filterData}
            variant="outline-primary"
          >
            FILTER
          </Button>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default PlayerFilterDialog;

import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import TeamRepository from "../../../data/TeamRepository";
import "./styles.scss";

const MinMaxFilterInput = ({
  label,
  range,
  stepSize,
  currValues,
  onChange,
}) => {
  const onInputChange = (type) => (e) => {
    onChange({ ...currValues, [type]: e.target.value });
  };
  return (
    <Col xs={6}>
      <Form.Group>
        <Form.Label>
          <span className="lead">{label}</span>
        </Form.Label>
        <Row>
          <Col xs={6}>
            <Form.Group>
              <Form.Label>Min</Form.Label>
              <Form.Control
                value={currValues.min}
                min={range.min}
                max={range.max}
                onChange={onInputChange("min")}
                type="number"
                stepSize={stepSize}
              />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group>
              <Form.Label>max</Form.Label>
              <Form.Control
                value={currValues.max}
                min={range.min}
                max={range.max}
                type="number"
                onChange={onInputChange("max")}
                stepSize={stepSize}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form.Group>
    </Col>
  );
};

const filterPoints = TeamRepository.getFilterPoints();
const initFilterState = {
  homeMatchWins: { min: 0, max: undefined },
  awayMatchWins: { min: 0, max: undefined },
  homeMatches: { min: 0, max: undefined },
  awayMatches: { min: 0, max: undefined },
  homeWinPer: { min: 0, max: undefined },
  awayWinPer: { min: 0, max: undefined },
};

const TeamFilterDialog = ({
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
        <Modal.Title>Filter Teams</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            <MinMaxFilterInput
              label="Home Wins"
              currValues={filters.homeMatchWins}
              range={filterPoints.homeMatchWins}
              stepSize={1}
              onChange={(values) =>
                modifyFilters((prev) => ({ ...prev, homeMatchWins: values }))
              }
            />
            <MinMaxFilterInput
              label="Away Wins"
              currValues={filters.awayMatchWins}
              range={filterPoints.awayMatchWins}
              stepSize={1}
              onChange={(values) =>
                modifyFilters((prev) => ({ ...prev, awayMatchWins: values }))
              }
            />
          </Row>
          <Row>
            <MinMaxFilterInput
              label="Home Matches"
              currValues={filters.homeMatches}
              range={filterPoints.homeMatches}
              stepSize={1}
              onChange={(values) =>
                modifyFilters((prev) => ({ ...prev, homeMatches: values }))
              }
            />
            <MinMaxFilterInput
              label="Away Matches"
              currValues={filters.awayMatches}
              range={filterPoints.awayMatches}
              stepSize={1}
              onChange={(values) =>
                modifyFilters((prev) => ({ ...prev, awayMatches: values }))
              }
            />
          </Row>
          <Row>
            <MinMaxFilterInput
              label="Home win %"
              currValues={filters.homeWinPer}
              range={filterPoints.homeWinPer}
              stepSize={1}
              onChange={(values) =>
                modifyFilters((prev) => ({ ...prev, homeWinPer: values }))
              }
            />
            <MinMaxFilterInput
              label="Away win %"
              currValues={filters.awayWinPer}
              range={filterPoints.awayWinPer}
              stepSize={1}
              onChange={(values) =>
                modifyFilters((prev) => ({ ...prev, awayWinPer: values }))
              }
            />
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Row>
          <Button variant="danger" onClick={clearFilters}>
            CLEAR
          </Button>
          <Button className="ml-2" onClick={filterData} variant="primary">
            FILTER
          </Button>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default TeamFilterDialog;

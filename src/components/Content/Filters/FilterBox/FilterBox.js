import { Col, Row } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import { BsFillCaretDownFill, BsFilter } from "react-icons/bs";
import PropTypes from "prop-types";
import { IoCloseOutline } from "react-icons/io5";
import MatchRepository from "../../../../data/MatchRepository";
import MatchFilterDialog from "../FilterDialogs/MatchesFilterDialog";
import PlayerFilterDialog from "../FilterDialogs/PlayerFilterDialog";
import PlayerRepository from "../../../../data/PlayerRepository";
import Repository from "../../../../data/Repository";

const FilterLabel = ({ label, removeFilter }) => {
  return (
    <Col md="auto" className="filter-label">
      <span>{label}</span>
      <IoCloseOutline
        onClick={removeFilter}
        className="ml-auto"
        size={20}
        color="#0f6fff"
      />
    </Col>
  );
};

const FilterButton = ({ onClick }) => (
  <Col onClick={onClick} className="text-center filter-button">
    <BsFilter color="#0f6fff" size={25} />
    <span>Filter</span>
    <BsFillCaretDownFill className="mt-1" size={12} />
  </Col>
);

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FilterBox = ({ FilterDialog, dataRepository, setFilteredData }) => {
  const [showFilterDialog, setShowFiltersDialog] = useState(false);
  const [filters, setFilters] = useState({});
  const [formattedFilters, setFormattedFilters] = useState([]);
  const prevFilters = usePrevious(filters);
  useEffect(() => {
    if (prevFilters !== undefined) {
      setFilteredData(dataRepository.filter(filters));
      const formattedFilters = dataRepository.formatFilterLabels(filters);
      setFormattedFilters(formattedFilters);
    }
  }, [filters]);
  function openFiltersDialog() {
    setShowFiltersDialog(true);
  }
  function closeFiltersDialog() {
    setShowFiltersDialog(false);
  }
  function removeFilter(key) {
    return function () {
      const newFilters = Object.keys(filters)
        .filter((k) => k !== key)
        .reduce((prev, key) => ({ ...prev, [key]: filters[key] }), {});
      setFilters(newFilters);
    };
  }
  return (
    <React.Fragment>
      <FilterDialog
        show={showFilterDialog}
        handleClose={closeFiltersDialog}
        applyFilters={setFilters}
        existingFilters={filters}
        dataRepository={dataRepository}
      />
      <Col className="filter-box">
        <Row className="applied-filters">
          {formattedFilters.length > 0 ? (
            formattedFilters.map((filter) => (
              <FilterLabel
                label={filter.label}
                removeFilter={removeFilter(filter.key)}
              />
            ))
          ) : (
            <span className="no-filters">No filters Applied</span>
          )}
        </Row>
        <Row>
          <FilterButton onClick={openFiltersDialog} />
        </Row>
      </Col>
    </React.Fragment>
  );
};

FilterBox.propTypes = {
  FilterDialog: PropTypes.element.isRequired,
  dataRepository: PropTypes.instanceOf(Repository).isRequired,
  setFilteredData: PropTypes.func.isRequired,
};

export const MatchFilterBox = (props) => (
  <FilterBox
    FilterDialog={MatchFilterDialog}
    dataRepository={MatchRepository}
    setFilteredData={props.setFilteredData}
  />
);

export const PlayerFilterBox = (props) => (
  <FilterBox
    FilterDialog={PlayerFilterDialog}
    dataRepository={PlayerRepository}
    {...props}
  />
);

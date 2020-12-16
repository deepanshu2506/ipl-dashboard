import { Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import { BsFillCaretDownFill, BsFilter } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import PlayerFilterDialog from "../FilterDialogs/PlayerFilterDialog";
import PlayerRepository from "../../../../data/PlayerRepository";
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

const FilterBox = (props) => {
  const [showFilterDialog, setShowFiltersDialog] = useState(false);
  const [filters, setFilters] = useState({});
  const [formattedFilters, setFormattedFilters] = useState([]);
  useEffect(() => {
    const formattedFilters = PlayerRepository.formatFilterLabels(filters);
    setFormattedFilters(formattedFilters);
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
      <PlayerFilterDialog
        show={showFilterDialog}
        handleClose={closeFiltersDialog}
        applyFilters={setFilters}
        existingFilters={filters}
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

export default FilterBox;

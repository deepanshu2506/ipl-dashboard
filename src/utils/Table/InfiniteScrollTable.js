import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Table as TableBase } from "react-bootstrap";
import PropTypes from "prop-types";
import _ from "lodash";
import "./styles.scss";
const InfiniteScrollTable = ({
  data,
  headerCols,
  renderRow,
  renderEmpty,
  keyExtractor,
  dataModifier,
  selectable = true,
  ...props
}) => {
  React.useEffect(() => {
    const tableContainer = document.querySelector(".table-container");
    const scrollListener = tableContainer.addEventListener(
      "scroll",
      _.throttle((e) => {
        if (props.hasMore) {
          const lastRow = document.querySelector(".table tbody tr:last-child");
          const scrollHeight =
            tableContainer.scrollTop + tableContainer.clientHeight + 1;
          const lastRowOffset = lastRow.offsetTop + lastRow.clientHeight;
          if (scrollHeight >= lastRowOffset) {
            props.nextPage();
          }
        } else {
        }
      }, 100)
    );
    return () => {
      tableContainer.removeEventListener("scroll", scrollListener);
    };
  }, []);
  const [selectedCount, setSelectedCount] = useState(0);

  function selectAllItems(selected) {
    const newItems = data.map((item) => ({ ...item, selected: selected }));
    dataModifier(newItems);
    setSelectedCount(selected ? data.length : 0);
  }

  function selectItem(id, selected) {
    const newItems = data.map((lead) =>
      lead.id === id ? { ...lead, selected } : lead
    );

    setSelectedCount(selected ? selectedCount + 1 : selectedCount - 1);
    dataModifier(newItems);
  }

  return (
    <Row className="table-container flex-grow-1 ">
      <Col className="px-0">
        <TableBase hover className="table">
          <thead className="bg-primary">
            <tr>
              {selectable && (
                <th>
                  <Form.Check
                    type="checkbox"
                    disabled={data.length === 0}
                    checked={data.length !== 0 && selectedCount === data.length}
                    onChange={(event) => {
                      selectAllItems(event.target.checked);
                    }}
                  />
                </th>
              )}
              {headerCols.map((item, idx) => (
                <th key={idx}>{item}</th>
              ))}
            </tr>
          </thead>
          {data.length > 0 ? (
            <tbody>
              {data.map((item, idx) => (
                <tr
                  key={keyExtractor(item, idx)}
                  className={item.selected ? "bg-lightgray" : ""}
                  onClick={() => {
                    props.onRowClick && props.onRowClick(item);
                  }}
                >
                  {selectable && (
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={item.selected || false}
                        onChange={(event) => {
                          selectItem(
                            keyExtractor(item, idx),
                            event.target.checked
                          );
                        }}
                      />
                    </td>
                  )}
                  {renderRow(item).map((cell, idx) => (
                    <td key={idx}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colspan="100%">{renderEmpty()}</td>
              </tr>
            </tbody>
          )}
        </TableBase>
      </Col>
    </Row>
  );
};

InfiniteScrollTable.propTypes = {
  data: PropTypes.array.isRequired,
  headerCols: PropTypes.array.isRequired,
  renderRow: PropTypes.func.isRequired,
  renderEmpty: PropTypes.func.isRequired,
  keyExtractor: PropTypes.func.isRequired,
  dataModifier: PropTypes.func,
  selectable: PropTypes.bool,
  onRowClick: PropTypes.func,
  nextPage: PropTypes.func,
};

export default InfiniteScrollTable;

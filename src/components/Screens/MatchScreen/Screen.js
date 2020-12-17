import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import MatchRepository from "../../../data/MatchRepository";
import { MatchFilterBox } from "../../Content/FilterBox/FilterBox";
import InfiniteScrollTable from "../../Content/Table/InfiniteScrollTable";
import "./styles.scss";
const MatchScreen = (props) => {
  const matchHeaders = MatchRepository.getKeys();
  const [MatchesPaginator, setMatchesPaginator] = useState(
    MatchRepository.getAll()
  );
  const renderRow = (match) => [
    match.season,
    match.venue,
    match.team1,
    match.team2,
    match.tossDecision,
    match.winner,
    match.winMargin,
    match.umpire1,
    match.umpire2,
  ];
  return (
    <Container className="screen matchscreen  pt-3 pl-4 " fluid>
      <Row>
        <MatchFilterBox
          setFilteredData={setMatchesPaginator}
          filterQuery={props.location.search}
        />
      </Row>
      <Row>
        <span className="row-count">{`${MatchesPaginator.length} entries`}</span>
      </Row>
      <InfiniteScrollTable
        dataPaginator={MatchesPaginator}
        keyExtractor={(match, idx) => match.id}
        headerCols={matchHeaders}
        renderRow={renderRow}
        renderEmpty={(props) => <p>No Matches Match your search</p>}
      />
    </Container>
  );
};

export default MatchScreen;

import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import MatchRepository from "../../../data/MatchRepository";
import InfiniteScrollTable from "../../../utils/Table/InfiniteScrollTable";
import { MatchFilterBox } from "../../Content/Filters/FilterBox/FilterBox";
import "./styles.scss";
const MatchScreen = (props) => {
  const matchHeaders = MatchRepository.getKeys();
  const [MatchesPaginator, setMatchesPaginator] = useState(
    MatchRepository.getAll()
  );
  return (
    <Container className="matchscreen  pt-3 pl-4 " fluid>
      <Row>
        <MatchFilterBox setFilteredData={setMatchesPaginator} />
      </Row>
      <InfiniteScrollTable
        dataPaginator={MatchesPaginator}
        keyExtractor={(match, idx) => match.id}
        headerCols={matchHeaders}
        renderRow={(match) =>
          matchHeaders.map(
            (header) =>
              match[header] || <span className="not-available">-</span>
          )
        }
        renderEmpty={(props) => <p>No Matches Match your search</p>}
      />
    </Container>
  );
};

export default MatchScreen;

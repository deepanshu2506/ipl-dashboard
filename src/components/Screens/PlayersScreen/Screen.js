import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import PlayerRepository from "../../../data/PlayerRepository";
import { PlayerFilterBox } from "../../Content/FilterBox/FilterBox";
import InfiniteScrollTable from "../../Content/Table/InfiniteScrollTable";
import "./styles.scss";
const PlayerScreen = (props) => {
  const playerHeaders = PlayerRepository.getKeys();
  const [PlayersPaginator, setPlayersPaginator] = useState(
    PlayerRepository.getAll()
  );

  return (
    <Container className="playerScreen pt-3 pl-4 " fluid>
      <Row>
        <PlayerFilterBox setFilteredData={setPlayersPaginator} />
      </Row>
      <Row>
        <span className="row-count">{`${PlayersPaginator.length} entries`}</span>
      </Row>
      <InfiniteScrollTable
        dataPaginator={PlayersPaginator}
        keyExtractor={(player, idx) => idx}
        headerCols={playerHeaders}
        renderRow={(player) =>
          playerHeaders.map(
            (header) =>
              player[header] || <span className="not-available">-</span>
          )
        }
        renderEmpty={(props) => <p>No Players</p>}
      />
    </Container>
  );
};

export default PlayerScreen;

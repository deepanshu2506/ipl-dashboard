import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PlayerRepository from "../../../data/PlayerRepository";
import InfiniteScrollTable from "../../../utils/Table/InfiniteScrollTable";
import "./styles.scss";
const PlayerScreen = (props) => {
  const playerHeaders = PlayerRepository.getKeys();
  const PlayersPaginator = PlayerRepository.getAllPlayers();
  const [players, setPlayers] = useState(PlayersPaginator.getNextPage());
  return (
    <Container className="playerScreen p-3 pl-4 pr-0" fluid>
      <Row>
        <FilterBox />
      </Row>
      <InfiniteScrollTable
        data={players}
        keyExtractor={(player, idx) => idx}
        headerCols={playerHeaders}
        renderRow={(player) =>
          playerHeaders.map(
            (header) => player[header] || <span class="not-available">-</span>
          )
        }
        nextPage={() => {
          const newPlayers = PlayersPaginator.getNextPage();
          setPlayers((players) => [...players, ...newPlayers]);
        }}
        hasMore={PlayersPaginator.hasMore()}
        selectable={false}
      />
    </Container>
  );
};

export default PlayerScreen;

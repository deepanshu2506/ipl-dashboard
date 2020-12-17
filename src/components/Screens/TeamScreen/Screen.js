import { useState } from "react";
import { Container, Image, Row } from "react-bootstrap";
import TeamRepository from "../../../data/TeamRepository";
import InfiniteScrollTable from "../../../utils/Table/InfiniteScrollTable";
import { TeamFilterBox } from "../../Content/FilterBox/FilterBox";
import "./styles.scss";

const TeamsScreen = (props) => {
  const TeamHeaders = TeamRepository.getKeys();
  const [TeamsPaginator, setTeamsPaginator] = useState(TeamRepository.getAll());
  const renderRow = (team) => [
    <Image className="avatar" src={team.avatar} />,
    team.team,
    team.home_wins,
    team.away_wins,
    team.home_matches,
    team.away_matches,
    (Number(team.home_win_percentage) || 0).toFixed(2),
    (Number(team.away_win_percentage) || 0).toFixed(2),
  ];

  return (
    <Container className="teamScreen pt-3 pl-4 " fluid>
      <Row>
        <TeamFilterBox setFilteredData={setTeamsPaginator} />
      </Row>
      <Row>
        <span className="row-count">{`${TeamsPaginator.length} entries`}</span>
      </Row>
      <InfiniteScrollTable
        dataPaginator={TeamsPaginator}
        keyExtractor={(player, idx) => idx}
        headerCols={TeamHeaders}
        renderRow={renderRow}
        renderEmpty={(props) => <p>No Teams</p>}
      />
    </Container>
  );
};

export default TeamsScreen;

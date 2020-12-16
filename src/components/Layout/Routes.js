import { Image } from "react-bootstrap";
import Avatar from "react-avatar";
import PlayerScreen from "../Screens/PlayersScreen/Screen";
import MatchScreen from "../Screens/MatchScreen/Screen";

const routes = [
  {
    title: "Players",
    path: "/players",
    exact: true,
    icon: {
      component: () => (
        <Avatar
          src="https://www.flaticon.com/svg/static/icons/svg/1193/1193274.svg"
          round={true}
          size={35}
        />
      ),
      size: 28,
    },
    component: PlayerScreen,
  },
  {
    title: "TEAMS",
    path: "/teams",
    exact: true,
    icon: {
      component: () => <Avatar src="/teams-icon.png" round={true} size={35} />,
      size: 28,
    },
    component: () => {
      return <h1>home</h1>;
    },
  },
  {
    title: "matches",
    path: "/matches",
    exact: true,
    icon: {
      component: () => <Avatar src="bats-man.svg" round={true} size={35} />,
      size: 28,
    },
    component: MatchScreen,
  },
];

export default routes;

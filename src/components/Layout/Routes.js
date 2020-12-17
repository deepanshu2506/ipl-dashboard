import Avatar from "react-avatar";
import PlayerScreen from "../Screens/PlayersScreen/Screen";
import MatchScreen from "../Screens/MatchScreen/Screen";
import TeamScreen from "../Screens/TeamScreen/Screen";
import VenueScreen from "../Screens/Venues/Screen";

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
    title: "teams",
    path: "/teams",
    exact: true,
    icon: {
      component: () => <Avatar src="/teams-icon.png" round={true} size={35} />,
      size: 28,
    },
    component: TeamScreen,
  },
  {
    title: "matches",
    path: "/matches",
    icon: {
      component: () => <Avatar src="bats-man.svg" round={true} size={35} />,
      size: 28,
    },
    component: MatchScreen,
  },
  {
    title: "venues",
    path: "/venues",
    icon: {
      component: () => <Avatar src="venue-icon.svg" round={true} size={35} />,
      size: 28,
    },
    component: VenueScreen,
  },
];

export default routes;

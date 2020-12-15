import { Image } from "react-bootstrap";
import Avatar from "react-avatar";

const routes = [
  {
    title: "home",
    path: "/home",
    exact: true,
    icon: {
      component: () => <Avatar src="/ipl-icon.svg" round={true} size={35} />,
      size: 28,
    },
    component: () => {
      return (
        <div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 34, 34, 34, 43, 34, 34].map(
            (item) => (
              <h1>home</h1>
            )
          )}
        </div>
      );
    },
  },
];

export default routes;

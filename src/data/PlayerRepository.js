import Players from "./db/players";
import Paginator from "./Paginator";

class PlayersRepository {
  constructor(players) {
    this.players = players;
  }

  getKeys() {
    return Object.keys(this.players[0]);
  }

  getAllPlayers() {
    return new Paginator(this.players, 20);
  }
}

export default new PlayersRepository(Players);

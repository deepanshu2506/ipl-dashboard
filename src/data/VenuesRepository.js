import venues from "./db/venues";
import Paginator from "./Paginator";
import Repository from "./Repository";

class VenuesRepository extends Repository {
  constructor(venues) {
    super();
    this.venues = venues;
  }

  getAll() {
    return new Paginator(this.venues);
  }
  getKeys() {
    return ["venue", "city", "matches Played"];
  }
  formatFilterLabels() {
    return [];
  }
  getFilterPoints() {
    return {};
  }
  filter() {
    return new Paginator(this.venues);
  }
}

export default new VenuesRepository(venues);

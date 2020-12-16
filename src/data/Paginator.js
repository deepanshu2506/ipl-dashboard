class Paginator {
  constructor(data = [], size = 20) {
    this.start = 0;
    this.size = size;
    this._data = data;
  }

  getNextPage() {
    const nextPage = this._data.slice(this.start, this.start + this.size);
    this.start = this.start + this.size;
    return nextPage;
  }

  getFirstPage() {
    this.start = 0;
    return this.getNextPage();
  }
  hasMore() {
    return this._data.length > this.start;
  }
}

export default Paginator;

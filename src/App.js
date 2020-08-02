import React from "react";

import http from "./utils/http";
import Item from "./components/Item";
import Pagination from "./components/Pagination";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: true,
      page: {
        pageNumber: 0,
        numberOfItemsPerPage: 10,
      },
      error: "",
    };
  }

  componentDidMount() {
    http
      .get("/topstories.json")
      .then((jsonReponse) => {
        this.setState(() => ({ isLoading: false, items: jsonReponse }));
      })
      .catch((error) => {
        this.setState(() => ({ error: error.message }));
      });
  }

  setPageNumber = (pageNumber) => {
    this.setState(() => ({ page: { ...this.state.page, pageNumber } }));
  };

  setItemsPerPage = (numberOfItemsPerPage) => {
    this.setState(() => ({
      page: { ...this.state.page, numberOfItemsPerPage, pageNumber: 0 },
    }));
  };

  render() {
    if (this.state.error)
      return (
        <div>Something went wrong... Refresh the page and try again!!!</div>
      );
    if (this.state.isLoading) return <div>Loading...</div>;

    const ITEMS_PER_PAGE = this.state.page.numberOfItemsPerPage;
    const PAGE_NUMBER = this.state.page.pageNumber;
    const START = PAGE_NUMBER * ITEMS_PER_PAGE;
    const END = START + ITEMS_PER_PAGE;

    return (
      <div className="container">
        <Pagination
          offSet={ITEMS_PER_PAGE}
          pageNumber={PAGE_NUMBER}
          setPageNumber={this.setPageNumber}
          setItemsPerPage={this.setItemsPerPage}
          totalItems={this.state.items.length}
        />
        <ol className="list" start={START + 1}>
          {this.state.items.slice(START, END).map((itemId) => (
            <Item className="list__item" key={itemId} id={itemId} />
          ))}
        </ol>
      </div>
    );
  }
}

export default App;

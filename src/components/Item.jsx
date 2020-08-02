import React from 'react';
import { Link } from "react-router-dom";

import http from "./../utils/http";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      error: ''
    };
  }

  componentDidMount() {
    http
      .get(`/item/${this.props.id}.json`)
      .then((jsonReponse) => {
        this.setState(() => ({ isLoading: false, data: jsonReponse }));
      })
      .catch((error) => {
        this.setState(() => ({error: error.message}));
      });
  }

  render() {
    if (this.state.isLoading) return <div>Loading...</div>;

    return (
      <li className={this.props.className}>
        <Link className="list__link" to={`/item/${this.props.id}`}>{this.state.data.title}</Link>
      </li>
    );
  }
}

export default Item;
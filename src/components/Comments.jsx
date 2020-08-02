import React from "react";
import http from "../utils/http";
import Comment from "./Comment";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      comments: {},
      isLoading: true,
      error: "",
    };
  }

  loadItem = (itemId) => {
    http
      .get(`/item/${itemId}.json`)
      .then((response) => {
        this.setState(
          () => ({ comments: { ...this.state.comments, [itemId]: response } }),
          () => {
            this.state.comments[itemId].kids &&
              this.state.comments[itemId].kids.forEach((kidId) =>
                this.loadItem(kidId)
              );
          }
        );
      })
      .catch((error) => {
        this.setState(() => ({ error: error.message }));
      });
  };

  componentDidMount() {
    http
      .get(`/item/${this.props.match.params.itemId}.json`)
      .then((jsonReponse) => {
        jsonReponse.kids &&
          jsonReponse.kids.forEach((kidId) => this.loadItem(kidId));
        return jsonReponse;
      })
      .then((jsonReponse) => {
        this.setState(() => ({ isLoading: false, data: jsonReponse }));
      })
      .catch((error) => {
        this.setState(() => ({ error: error.message }));
      });
  }

  renderCommentsRecursively = (commentId, isSubComment = false) => {
    const commentData = this.state.comments[commentId];

    return commentData && !commentData.deleted && (
      <div key={commentId} className={"comments__wrapper"+ (isSubComment ? " comments__sub-item": "") }>
        <Comment
          by={commentData.by}
          text={commentData.text}
          time={commentData.time}
        />

        {commentData &&
          commentData.kids &&
          commentData.kids.map((kidId) =>
            this.renderCommentsRecursively(kidId, isSubComment = true)
          )}
      </div>
    );
  };

  render() {
    if (this.state.isLoading) return <div>Loading...</div>;

    return (
      <div className="container">
        <div className="btn-wrapper">
          <button
            className="btn btn--secondary comments__btn"
            onClick={(e) => this.props.history.goBack()}
          >
            Back
          </button>
        </div>
        <div className="comments">
          <h1 className="comments__heading">
            <a
              className="comments__link"
              href={this.state.data.url}
              title={this.state.data.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              {this.state.data.title}
            </a>
          </h1>
          <h2 className="comments__title">
            Comments ({this.state.data.descendants})
          </h2>
          {this.state.data.kids &&
            this.state.data.kids.map((kidId) =>
              this.renderCommentsRecursively(kidId)
            )}
        </div>
      </div>
    );
  }
}

export default Comments;

import React from "react";

function Pagination(props) {
  const onClick = (e) => {
    setPageNumber(window.parseInt(e.target.value));
  };

  const onChange = (e) => {
    setItemsPerPage(window.parseInt(e.target.value));
  }

  const { offSet, pageNumber, totalItems, setPageNumber, setItemsPerPage } = props;
  const currentPageNumber = pageNumber + 1;
  const finalPageNumber =
    totalItems % offSet === 0
      ? Math.floor(totalItems / offSet) - 1
      : Math.floor(totalItems / offSet);

  return (
    <div className="pagination">
      <div className="pagination__info">
        Showing{" "}
        <span className="pagination__info-number">
          {pageNumber * offSet + 1}
        </span>{" "}
        to{" "}
        <span className="pagination__info-number">
          {(pageNumber + 1) * offSet <= totalItems? (pageNumber + 1) * offSet: totalItems}
        </span>{" "}
        of <span className="pagination__info-number">{totalItems}</span> entries
      </div>

      <div className="pagination__items-count">
        <label className="pagination__label">Show: </label>
        <select className="pagination__select" name="itemsPerPage" onChange={onChange} defaultValue="10">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
          <option value="35">35</option>
          <option value="40">40</option>
          <option value="45">45</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <div className="pagination__buttons">
        <button onClick={onClick} className="pagination__button" value={0}>
          &laquo;
        </button>
        {pageNumber - 2 >= 0 && (
          <button
            onClick={onClick}
            className="pagination__button"
            value={pageNumber - 2 >= 0 ? pageNumber - 2 : 0}
          >
            {currentPageNumber - 2}
          </button>
        )}
        {pageNumber - 1 >= 0 && (
          <button
            onClick={onClick}
            className="pagination__button"
            value={pageNumber - 1 >= 0 ? pageNumber - 1 : 0}
          >
            {currentPageNumber - 1}
          </button>
        )}
        <button className="pagination__button pagination__button--active">
          {currentPageNumber}
        </button>
        {pageNumber + 1 <= finalPageNumber && (
          <button
            onClick={onClick}
            className="pagination__button"
            value={
              pageNumber + 1 <= finalPageNumber
                ? pageNumber + 1
                : finalPageNumber
            }
          >
            {currentPageNumber + 1}
          </button>
        )}
        {pageNumber +2 <= finalPageNumber && (
          <button
            onClick={onClick}
            className="pagination__button"
            value={
              pageNumber + 2 <= finalPageNumber
                ? pageNumber + 2
                : finalPageNumber
            }
          >
            {currentPageNumber + 2}
          </button>
        )}
        <button
          onClick={onClick}
          className="pagination__button"
          value={finalPageNumber}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
}

export default Pagination;

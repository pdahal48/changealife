import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import "./SearchForm.css";

const element = <FontAwesomeIcon icon={faSearch} size="2x"/>

/** Search widget.
 *
 * Appears on people list so that these can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
*/

function SearchForm({ searchFor }) {
  console.debug("SearchForm", "searchFor=", typeof searchFor);

  const [searchTerm, setSearchTerm] = useState("");

  /** Tell parent to filter */
  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  /** Update form fields */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    
      <div className="SearchForm mb-3 text-center">
        <form className="form-outline search" onSubmit={handleSubmit}>
          <input
              className="form-control form-control-lg flex-grow-1"
              name="searchTerm"
              placeholder="Enter persons name.."
              value={searchTerm}
              onChange={handleChange}
          />
        </form>
        <button type="submit" className="searchBtn btn btn-primary  mb-2" onClick={handleSubmit}>
          {element}
        </button>
        <div>
        </div>
      </div>
      
  );
}

export default SearchForm;

import React, { useState, useEffect } from 'react';
import { getCategories, list } from '../apiCore/apiCore';
import Card from '../Card/Card';

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    // console.log(category, search);
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `${results.length} products found`;
    }

    if (searched && results.length < 1) {
      return ` No Product found`;
    }
  };

  const searchedProduct = (results = []) => {
    return (
      <div>
        <h5 className="center home">{searchMessage(searched, results)}</h5>
        <div className="row center">
          {results.map((product, i) => {
            return (
              <div className=" col s12 m6 l4">
                <Card key={i} product={product} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <span>
          <div className="search container ">
            {/* <div className="search-grp"></div> */}
            <select
              className="sel col s3  "
              onChange={handleChange('category')}
            >
              <option value="All">All</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className="input-field col s9 black-text input-search">
              <input
                className="browserDefault"
                id="input"
                onChange={handleChange('search')}
                type="text"
                autoComplete="off"
              />
              <label className=" inpt" htmlFor="input">
                <i
                  class="blue-grey-text text-darken-2 material-icons left"
                  onClick={searchSubmit}
                >
                  search
                </i>
                Search
              </label>
            </div>
          </div>
        </span>
      </form>
    );
  };

  return (
    <div className="row container">
      <div className="col s12">{searchForm()}</div>
      <div className="col s12 ">{searchedProduct(results)}</div>
    </div>
  );
};

export default Search;

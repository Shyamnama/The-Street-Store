import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import Card from '../Card/Card';
import { getCategories, getFilteredProducts } from '../apiCore/apiCore';
import Checkbox from './Checkbox';
import PriceRange from './PriceRange';
import { prices } from './fixedPrices';

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [limit, setLimit] = useState(12);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  if (error) {
    console.log(error);
  }

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilterResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;

    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="loadMore btn hoverable">
          Load More...
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilterResults(skip, limit, myFilters.filters);
    // eslint-disable-next-line
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log('SHOP', filters, filterBy);

    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === 'price') {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilterResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <div>
      <Layout title="" description="Our Products" className="shop">
        <div className="cat col s5 m4 l2 z-depth-3 ">
          <div className="catHead">Categories</div>
          <ul className="ml">
            <Checkbox
              handleFilters={(filters) => handleFilters(filters, 'category')}
              categories={categories}
            />
          </ul>
          <div className="catHead">Price</div>
          <div className="mb ml price">
            <PriceRange
              handleFilters={(filters) => handleFilters(filters, 'price')}
              prices={prices}
            />
          </div>
        </div>
        <div className="pro col s7 m8 l10">
          {filteredResults.map((product, i) => {
            return (
              <div key={i} className=" col s12 m6 l3">
                <Card product={product} />
              </div>
            );
          })}
          <div className=" col s12 ">{loadMoreButton()}</div>
        </div>
      </Layout>
    </div>
  );
};

export default Shop;

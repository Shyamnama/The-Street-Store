import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { getProducts } from '../apiCore/apiCore';
import Card from '../Card/Card';
import Search from './Search';
import CarouselImage from '../Layout/CarouselImage';

const Home = () => {
  const [productBySell, setProductBySell] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);

  if (error) {
    console.log(error);
  }

  const loadProductBySell = () => {
    getProducts('sold').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductBySell(data);
      }
    });
  };

  const loadProductByArrival = () => {
    getProducts('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductByArrival();
    loadProductBySell();
  }, []);

  return (
    <div>
      <Layout title="The Street Store" description="">
        <Search />
        <section className="singlePro">
          <h4 className="home">Best Sellers</h4>
          <div className="row">
            {productBySell.map((product, i) => {
              return (
                <div key={i} className="col s12 m6 l3 ">
                  <Card product={product} />
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <CarouselImage />
        </section>

        <section className="singlePro">
          <h4 className=" home">New Arrivals</h4>
          <div className="row">
            {productByArrival.map((product, i) => {
              return (
                <div key={i} className="col s12 m6 l3 ">
                  <Card product={product} />
                </div>
              );
            })}
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default Home;

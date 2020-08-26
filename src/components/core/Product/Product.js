import React, { useState, useEffect } from 'react';
import './Product.css';
import Layout from '../Layout/Layout';
import { read, listRelated } from '../apiCore/apiCore';
import Card from '../Card/Card';
import Details from '../ProductDetails/Details';

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  if (error) {
    console.log(error);
  }

  const loadingSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);

        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadingSingleProduct(productId);
  }, [props]);

  return (
    <Layout title="" description="" className="mt-4 ">
      <div className="singlePro">
        {product && product.description && (
          <Details product={product} showViewProductButton={false} />
        )}


        <div className="section ">
          <h4 className="home">Related Products</h4>
          {relatedProduct.map((product, i) => {
            // console.log(p);
            return (
              <div key={i} className=" col s12 m6 l3">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Product;

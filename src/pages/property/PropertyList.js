
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/Layout';
import './PropertyList.css';

const PropertyList = () => {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchProducts();
      }, []);
      const fetchProducts = () => {
        axios
          .get('https://shoppingapiacme.herokuapp.com/shopping')
          .then((res) => {
            console.log(res);
            setProducts(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
  return (
    <DashboardLayout>
      <h2>PropertyList</h2>
      <h1> This is PropertyList Page </h1>
      <div>
      <h1>Featured Products</h1>
      <div className='item-container'>
        {products.map((product) => (
          <div className='card' key={product.id}>
            <img src={product.image} alt='' />
            <h3>{product.brand}</h3>
            <p>{product.item}</p>
          </div>
        ))}
      </div>
    </div>
    </DashboardLayout>
  )
}

export default PropertyList;
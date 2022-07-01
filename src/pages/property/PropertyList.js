
import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { DashboardLayout } from '../../components/Layout';
import './PropertyList.css';

const PropertyList = () => {

  const [properties, setProperties] = useState([]);

  const columns = [
    {
        name: 'Title',
        selector: row => row.name,
    },
    {
        name: 'Year',
        selector: row => row.code,
    },
];

const data = properties;
    useEffect(() => {
        fetchProducts();
      }, []);
      const fetchProducts = () => {
        const api = 'https://faptl.americanbestit.com/api/v1/properties'; 
        const token = localStorage.getItem('access_token');
        axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
          setProperties(res.data);
          console.log(res.data);
       
        }).catch((error) => {
          console.log(error);
      });

    }


  return (
    <DashboardLayout>
      <h2>PropertyList</h2>
      <DataTable
        columns={columns}
        data={data}
        pagination
      />
      
    </DashboardLayout>
  )
}

export default PropertyList;
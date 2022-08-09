
import Button from '@mui/material/Button';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Link, useParams } from "react-router-dom";
import styled from 'styled-components';
import { DashboardLayout } from "../../../components/Layout";

    
  const TextField = styled.input`
  	height: 32px;
  	width: 200px;
  	border-radius: 3px;
  	border-top-left-radius: 5px;
  	border-bottom-left-radius: 5px;
  	border-top-right-radius: 0;
  	border-bottom-right-radius: 0;
  	border: 1px solid #e5e5e5;
  	padding: 0 32px 0 16px;
  
  	&:hover {
  		cursor: pointer;
  	}
  `;
  
  const ClearButton = styled(Button)`
  	border-top-left-radius: 0;
  	border-bottom-left-radius: 0;
  	border-top-right-radius: 5px;
  	border-bottom-right-radius: 5px;
  	height: 34px;
  	width: 32px;
  	text-align: center;
  	display: flex;
  	align-items: center;
  	justify-content: center;
  `;
  
  const FilterComponent = ({ filterText, onFilter, onClear }) => (
  	<>
  		<TextField
  			id="search"
  			type="text"
  			placeholder="Filter By Name"
  			aria-label="Search Input"
  			value={filterText}
  			onChange={onFilter}
  		/>
  		<ClearButton type="button" onClick={onClear}>
  			X
		</ClearButton>
  	</>
  );
  
    
  
   export const Filtering = () => {


  	const [filterText, setFilterText] = React.useState('');
  	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

    const [properties, setProperties] = useState([]);
	const [property, setProperty]     = useState([]);

	
	



	const editPropertyHandler = (event) => {
		event.preventDefault();
        window.location.href = "/product";
	}

    let { id } = useParams();


  const columns = [
    {
        name: 'Type',
        selector: row => row.type,
    },
	{
		name: 'Name',
		selector: row =>  row.name,
		
	},
	{
		name: 'Floor',
		selector: row =>  row.floor,
	},
	{
		name: 'Reant Amount',
		selector: row =>  row.rent,
	},
	{
		name: 'Total Room',
		selector: row => row.total_room,
		
    },
	{
		name: 'IsActive',
		selector: row => row.isActive,
		
    },
	{
		name: "Actions",
		selector: row =>{
			return <div><Link to={"/propertyunit/" + row.id} >Edit</Link>  || <Link to={"/propertyunit/delete/" + row.id} >Delete</Link></div>
		}
	  }
];

const data = properties;
    useEffect(() => {
        fetchProperty();
		fetchProperties();
      }, []);
      const fetchProperties = () => {
        const api = 'http://127.0.0.1:8000/api/v1/property/units/' + id; 
        const token = localStorage.getItem('access_token');
        axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
          setProperties(res.data);
          console.log(res.data);
       
        }).catch((error) => {
          console.log(error);
      });

    }
    
	
	// Load Property Lists
	const fetchProperty = async () => {
		const api = 'http://127.0.0.1:8000/api/v1/properties/' + id; 
		const token = localStorage.getItem('access_token');
		await axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
		.then(res => {
			console.log(res.data);
			setProperty( res.data );	
		}).catch((error) => {
			console.log(error);
		});
	}

  	const filteredItems = data.filter(
  		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
  	);
  
  	const subHeaderComponentMemo = React.useMemo(() => {
  		const handleClear = () => {
  			if (filterText) {
  				setResetPaginationToggle(!resetPaginationToggle);
  				setFilterText('');
  			}
  		};
  
  		return (
  			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
  		);
  	}, [filterText, resetPaginationToggle]);
  
  	return (
      <DashboardLayout>

			<h1 className="page-main-heading">Units of property : {property.name != null && property.name}</h1>
			<table class="table">
				<tbody>
				<tr>
						<td>Property Name : </td>
						<td>{property.name != null && property.name}</td>
					</tr>
					<tr>
						<td>Type : </td>
						<td>{property.type != null && property.type}</td>
					</tr>
					<tr>
						<td>City : </td>
						<td>{property.city != null && property.city}</td>
					</tr>
					<tr>
						<td>State : </td>
						<td>{property.state != null && property.state}</td>
					</tr>
					<tr>
						<td>Address : </td>
						<td>{property.address != null && property.address}</td>
					</tr>
					<tr>
						<td>Size : </td>
						<td>{property.size != null && property.size}</td>
					</tr>
					<tr>
						<td>Is Featured : </td>
						<td>{property.isFeatured != null && property.isFeatured}</td>
					</tr>
				</tbody>
			</table>
			<Link to={"/propertyunit/"+ id + "/add/"} className="add-new-btn"> All New Unit</Link>
			<Link to={"/propertyunit/list"} className="all-list-btn"> All Units</Link>
  		<DataTable
  			columns={columns}
  			data={filteredItems}
  			pagination
  			paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
  			subHeader
  			subHeaderComponent={subHeaderComponentMemo}
  			persistTableHead
  		/>
      </DashboardLayout>
	);
  };
  
   
 

export default Filtering;
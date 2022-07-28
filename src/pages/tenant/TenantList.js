
import Button from '@mui/material/Button';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { DashboardLayout } from '../../components/Layout';
import './TenantList.css';

    
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

    const [tenants, setTenants] = useState([]);

	const editPropertyHandler = (event) => {
		event.preventDefault();
        window.location.href = "/product";
	}

  const columns = [
    {
        name: 'Name',
        selector: row => row.name,
    },
	{
		name: 'phone',
		selector: row =>  row.phone,
	},
	{
		name: 'Id Number',
		selector: row =>  row.id_number,
		
	},
	{
		name: 'Gender',
		selector: row =>  row.gender,
	},
	
	{
		name: 'City',
		selector: row => row.city,
		
    },
	{
		name: 'Country',
		selector: row => row.country,
		
    },
	{
		name: "Actions",
		selector: row =>{
			return <div><Link to={"/tenant/" + row.id} >Edit</Link>  || <Link to={"/tenant/delete/" + row.id} >Delete</Link></div>
		}
	  }
];

const data = tenants;
    useEffect(() => {
        fetchTenant();
      }, []);
      const fetchTenant = () => {
        const api = 'https://faptl.americanbestit.com/api/v1/tenants'; 
        const token = localStorage.getItem('access_token');
        axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
          setTenants(res.data);
          console.log(res.data);
       
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
		<div className="tenant-list-section">
  		<div className="container">
		  <DataTable
  			title="Tenant List"
  			columns={columns}
  			data={filteredItems}
  			pagination
  			paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
  			subHeader
  			subHeaderComponent={subHeaderComponentMemo}
  			persistTableHead
  		/>
		</div></div>
      </DashboardLayout>
	);
  };
  
   
 

export default Filtering;
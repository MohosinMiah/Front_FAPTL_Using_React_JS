
import Button from '@mui/material/Button';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { DashboardLayout } from '../../components/Layout';
import TopBar from '../global/TopBar';
import './LeaseList.css';

    
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
  			placeholder="Filter By Tenant"
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

    const [leases, setleases] = useState([]);

	const editPropertyHandler = (event) => {
		event.preventDefault();
        window.location.href = "/product";
	}

  const columns = [
    {
        name: 'ID',
        selector: row => row.id,
    },

		
	{
		name: 'Tenant Name',
        selector: row => row.tenant.name,
	},

	{
		name: 'Property Name',
        selector: row => row.property.name,
		
	},

	{
		name: 'Property Unit',
		selector: row => row.property_unit.name,
		
    },
	{
		name: 'Lease Start',
        selector: row => row.lease_start,
		
    },
	{
		name: 'Lease End',
        selector: row => row.lease_end,
    },
	{
		name: 'Rent Amount',
        selector: row => row.rent_amount,
    },


	{
		name: "Actions",
		selector: row => {
			return <div><Link to={"/lease/" + row.id} className="theme-btn-edit">Edit</Link> </div>
		}
	  }
];

const data = leases;
    useEffect(() => {
        fetchLease();
      }, []);
      const fetchLease = () => {
        const api = 'https://api.americanbestit.com/api/v1/leases'; 
        const token = localStorage.getItem('access_token');
        axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
          setleases(res.data);
          console.log(res.data);
       
        }).catch((error) => {
          console.log(error);
      });

    }
    
  	const filteredItems = data.filter(
  		item => item.tenant.name && item.tenant.name.toLowerCase().includes(filterText.toLowerCase()),
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
			<TopBar />
			<div className="padding-top-bottom">
				<div className="container">
					<div className="">
						<h1 className="large-heading mb-5 theme-page-heading">Lease List</h1>
						<Link to={"/lease/add"} className="theme-btn"> Add New Lease</Link>
						
					</div>
			<DataTable
				columns={columns}
				data={filteredItems}
				pagination
				paginationPerPage={30}
				paginationRowsPerPageOptions={[10, 25, 50, 100]}
				paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
				subHeader
				subHeaderComponent={subHeaderComponentMemo}
				persistTableHead
			/>
		</div>
	</div>
      </DashboardLayout>
	);
  };
  
   
 

export default Filtering;
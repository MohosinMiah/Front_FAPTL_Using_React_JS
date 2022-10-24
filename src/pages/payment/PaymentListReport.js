import Button from '@mui/material/Button';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import swal from 'sweetalert';
import { DashboardLayout } from '../../components/Layout';
import TopBar from '../global/TopBar';
import './PaymentList.css';

    
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

    const [payments, setPayments] = useState([]);

	let data = payments;


	// Filter Start **********************************************************************  START FILTER ****************************************************************


	const [properties, setProperties] = useState('');
	const [units, setUnits] = useState('');
	const [tenants, setTenants] = useState('');
	
	const [property_id, setPropertyID]         = useState( '' );
	const [unit_id, setUnitID]                 = useState( '' );
	const [tenant_id, setTenantID]             = useState( '' );
	
	const [paymentStartDate, setpaymentStartDate]         = useState( '' );
	const [paymentEndDate, setpaymentEndDate]             = useState( '' );
	
	const [status, setStatus]             = useState( '' );
	

	// Selected Option Dropdown Types

	const statusOption = [
		{value: '',      text: '-- Select Payment Status --'},
		{value: 'PENDING',   text: 'PENDING'},
		{value: 'COMPLETE',   text: 'COMPLETE'},
		];

	const paymentPurpose = [
		{value: '',      text: '-- Select Payment Status --'},
		{value: 'Rent',   text: 'Rent'},
		{value: 'Damage',   text: 'Damage'},
		{value: 'Others',   text: 'Others'},
		];

		
useEffect(() => {
	fetchProperties();
	fetchTenants();
}, []);

// Load Property Lists
const fetchProperties = async () => {
	const api = 'http://127.0.0.1:8000/api/v1/properties'; 
	const token = localStorage.getItem('access_token');
	await axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
	.then(res => {
		console.log("Property List");
		console.log(res.data);
		let modifyPropertyList = [{id: '', name: '--Select Property--'}, ...res.data];
		setProperties( modifyPropertyList );	

	}).catch((error) => {

	console.log(error);
});

}
	
// Load Tenant Lists
const fetchTenants = async () => {
	const api = 'http://127.0.0.1:8000/api/v1/tenants'; 
	const token = localStorage.getItem('access_token');
	await axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
	.then(res => {
		console.log("Tenant List");
		console.log(res.data);
		let modifyTenantList = [{id: '', name: '--Select Tenant--'}, ...res.data];
		setTenants( modifyTenantList );	

	}).catch((error) => {

	console.log(error);
});

}





const handleSubmit = async (e) => {
	// store the states in the form data
	e.preventDefault();

	try {
		
		filterPaymentList();
	} catch (error) {

	}

}


const filterPaymentList = () => {

	const api = 'http://127.0.0.1:8000/api/v1/payments/search';
	const token = localStorage.getItem('access_token');
	axios({
		method: 'post',
		url: api,
		data: {
			property_id: property_id,
			unit_id: unit_id,
			// tenant_id: tenant_id,
			paymentStartDate: paymentStartDate,
			paymentEndDate: paymentEndDate,
			// status: status,
		},
		headers: { "Authorization": `Bearer ${token}` }
	})
		.then(res => {
			console.log(res.data);
			setPayments(res.data);
			
		}).catch((error) => {

			swal("Failed", "PPayment Enter Required Field Data.", "error");

			console.log(error.response.data.errors);

			console.log(error.response.status);
			console.log(error.response.headers);
		});
}

// Load Property Unit List Based On Property ID
const fetchUnitsByPropertyID = async ( propertyID ) => {
	const api = 'http://127.0.0.1:8000/api/v1/payment/unit_list/property/' + propertyID; 
	const token = localStorage.getItem('access_token');
	await axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
	.then(res => {
		console.log("Unit List");
		console.log(res.data);
		let modifyPropertyUnitList = [{id: '', name: '--Select Type--'}, ...res.data];
		setUnits( modifyPropertyUnitList );	

	}).catch((error) => {
		setUnits( [ {id: '', name: '--Select Unit--'} ] );	

	// console.log(error);
});

}



const propertyIDHandleChange = ( e ) => {
	console.log("Property Id Changed " + e.target.value);
	const propertyID = e.target.value;
	setPropertyID( e.target.value );
	// After Changed PropertyIDHandleChange We Have To Load Associate Property Unit List
	
	fetchUnitsByPropertyID( propertyID );
}
	// Filter End **********************************************************************  END FILTER ****************************************************************

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
		name: 'Property Name',
        selector: row => row.property.name,
		
	},

	{
		name: 'Utit Name',
        selector: row => row.property_unit.name,
	},	
	{
		name: 'Tenant Name',
        selector: row => row.tenant.name,
	},



	{
		name: 'Payment Amount',
        selector: row => '$ ' + row.payment_amount + '.00',
    },

	{
		name: 'Payment Date',
        selector: row => row.payment_date,
		
    },
	
	{
		name: 'Status',
		selector: row => row.status,
		
    },	
	
	{
		name: "Actions",
		selector: row => {
			return <div> <Link to={"/payment/" + row.id} className="theme-btn-edit">Edit</Link> </div>
		}
	  }
];

	function reSetFilter() {
		fetchPayments();
	}

    useEffect(() => {
        fetchPayments();
      }, []);
      const fetchPayments = () => {
        const api = 'http://127.0.0.1:8000/api/v1/payments'; 
        const token = localStorage.getItem('access_token');
        axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
          setPayments(res.data);
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
			<h2 className="large-heading mb-5 theme-page-heading">Payment Report</h2>
				<Link to={"/payment/add"} className="form-btn"> Collect New Payment</Link>
				<div className="padding-bottom-style" ></div>
				<form noValidate onSubmit={handleSubmit}>
					<div className="form-oneline" >
						<div className="form-outline">
							<label className="form-label">Select Property</label>
							<select  name="property_id" className="form-control"  value={property_id} onChange={propertyIDHandleChange}>
								{ properties != '' && properties.map(option => (
								<option key={option.id} value={option.id}>
									{option.id} - {option.name}
								</option>
								))}
							</select>
						</div>
	
						<div className="form-outline">
							<label className="form-label">Select Property  Unit</label>
							<select  name="unit_id" className="form-control"  value={unit_id} onChange={e => setUnitID(e.target.value)}>
								{ units != '' && units.map(option => (
								<option key={option.id} value={option.id}>
									{option.id} - {option.name}
								</option>
								))}
							</select>
						</div>

						<div className="form-outline">
							<label className="form-label">From Date</label>
							<input type="date" name="paymentStartDate" className="form-control" value={paymentStartDate} onChange={e => setpaymentStartDate(e.target.value)} />
						</div>

						<div className="form-outline">
							<label className="form-label">To Date</label>
							<input type="date" name="paymentEndDate" className="form-control" value={paymentEndDate} onChange={e => setpaymentEndDate(e.target.value)} />
						</div>
					</div>
						<button type="submit" className="form-btn-submit">Filter</button>
						<button onClick={reSetFilter} className="form-btn-submit">Reset</button>
				</form>

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
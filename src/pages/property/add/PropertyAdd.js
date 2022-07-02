import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { DashboardLayout } from "../../../components/Layout";

const PropertyAdd = () => {

	const [name, setName] = useState();
	const [code, setCode] = useState();
	const [type, setType] = useState();
	const [rent_amount, setRentAmount] = useState();
	const [size, setSize] = useState();
		
	async function loginUser(credentials) {
		const token = localStorage.getItem('access_token');
		return fetch('https://faptl.americanbestit.com/api/v1/properties', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization' : `Bearer ${token}`


		},
		body: JSON.stringify(credentials)
		})
		.then(data => data.json())
	}

		const handleSubmit = async e => {
		e.preventDefault();
		const response = await loginUser({
			name,
			code,
			type,
			rent_amount,
			size
		});

	
	}



	// const [formValue, setformValue] = useState({
	// 	name: '',
	// 	code: '',
	// 	type: '',
	// 	address: '',
	// 	city: '',
	// 	state: '',
	// 	zip: '',
	// 	note: '',
	// 	rent_amount: '',
	// 	size: '',
	// 	link: '',
	// 	has_parking: '',
	// 	has_security_gard: '',
	// 	isActive: '',
	// });

	// const handleSubmit = async (event) => {
	// event.preventDefault();
	
	// 	const token = localStorage.getItem('access_token');
	// 	const api = 'https://faptl.americanbestit.com/api/v1/properties'; 


	// 	// store the states in the form data
	// 	const loginFormData = new FormData();
	// 	loginFormData.append("name", formValue.name)
	// 	loginFormData.append("code", formValue.code)
	// 	loginFormData.append("type", formValue.type)
	// 	loginFormData.append("address", formValue.address)
	// 	loginFormData.append("city", formValue.city)
	// 	loginFormData.append("state", formValue.state)
	// 	loginFormData.append("zip", formValue.zip)
	// 	loginFormData.append("note", formValue.note)
	// 	loginFormData.append("rent_amount", formValue.rent_amount)
	// 	loginFormData.append("size", formValue.size)
	// 	loginFormData.append("link", formValue.link)
	// 	loginFormData.append("has_parking", formValue.has_parking)
	// 	try {
	// 		console.log(loginFormData);
	// 	// make axios post request
	// 	const response = await axios({
	// 		method: "post",
	// 		url: api,
	// 		body: loginFormData,
	// 		headers: {"Authorization" : `Bearer ${token}`}
	// 	});
	// 		console.log( response );
	// 	swal("Success", "You Logged In", "success", {
	// 		buttons: false,
	// 		timer: 2024343000,
	// 		})

	// 	//    window.location.href = "/property/add";

	// 	} catch(error) {
	// 	console.log(error);
	// 	swal("Failed", 'Error', "error");

	// 	}

	// }
	
	// const handleChange = (event) => {
	// 	setformValue({
	// 	...formValue,
	// 	[event.target.name]: event.target.value
	// 	});
	// }


    //   const addProduct = () => {

    //     const api = 'https://faptl.americanbestit.com/api/v1/properties'; 
    //     const token = localStorage.getItem('access_token');
    //     axios({
    //         method: 'post',
    //         url: api,
    //         data: {
    //             name: 'Fred',
    //             code: '444',
    //             type: 'residentila',
    //             address: 'residentila',
    //             city: 'residentila',
    //             state: 'residentila',
    //             zip: 123,
    //             note: 'residentila',
    //             rent_amount: 2565,
    //             size: 111,
    //         },
    //         headers: {"Authorization" : `Bearer ${token}`}
    //       })
    //     .then(res => {
    //       console.log(res.data);
       
    //     }).catch((error) => {
    //       console.log(error);
    //   });

    // }

  return (
    <DashboardLayout>
      <h2>Property Add</h2>
      <form
        noValidate
		onSubmit={handleSubmit}
	>
		<TextField
			variant="outlined"
			margin="normal"
			required
			fullWidth
			id="name"
			name="name"
			label="Property Name"
			onChange={e => setName(e.target.value)}
		/>
		<TextField
			variant="outlined"
			margin="normal"
			required
			fullWidth
			id="code"
			name="code"
			label="Property Code"
			onChange={e => setCode(e.target.value)}
		/>
		<TextField
			variant="outlined"
			margin="normal"
			fullWidth
			id="type"
			name="type"
			label="type"
			onChange={e => setType(e.target.type)}

		/>

		<TextField
			variant="outlined"
			margin="normal"
			fullWidth
			type="number"
			id="rent_amount"
			name="rent_amount"
			label="rent_amount"
			onChange={e => setRentAmount(e.target.rent_amount)}

		/>
		<TextField
			variant="outlined"
			margin="normal"
			fullWidth
			type="number"
			id="size"
			name="size"
			label="size"
			onChange={e => setSize(e.target.size)}
		/>
		
		<Button
			type="submit"
			fullWidth
			variant="contained"
			color="primary"
		>
			Sign In
		</Button>
	</form>

 
    </DashboardLayout>
  )
}

export default PropertyAdd;
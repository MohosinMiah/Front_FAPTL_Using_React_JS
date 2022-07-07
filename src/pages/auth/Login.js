import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Container } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import swal from 'sweetalert';
import { DashboardLayout } from '../../components/Layout';

  
const Login = () => {

	const [email, setEmail] = useState();
		const [password, setPassword] = useState();
		
	async function loginUser(credentials) {
		console.log(process.env.PRODUCTION_DEV_URL);
		return fetch( "https://faptl.americanbestit.com/api/v1/login", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(credentials)
		})
		.then(data => data.json())
	}

		const handleSubmit = async e => {
		e.preventDefault();
		const response = await loginUser({
			email,
			password
		});
		if ('access_token' in response)
		{
			console.log("Success");
			swal("Success", "You Logged In", "success", {
			buttons: false,
			timer: 2000,
			})
			.then((value) => {
				console.log(value);
				console.log("SET VALUE STORAGE");
				localStorage.setItem('myName', "MOHOSIN");

				localStorage.setItem('access_token', response['access_token']);
				localStorage.setItem('first_name', JSON.stringify(response['first_name']));
				window.location.href = "/home";
			});
		}
		else
		{
			swal("Failed", response.message, "error");
		}
	}
			
	return (
		<DashboardLayout>

			<Container maxWidth="sm">

				<Grid container >
				<CssBaseline />
				<Grid item xs={false} md={12}  />
				<Grid item xs={12} md={12} component={Paper}  square>
					<div xs={8} md={8} >
					<Avatar >
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form  noValidate onSubmit={handleSubmit}>
						<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						name="email"
						label="Email Address"
						onChange={e => setEmail(e.target.value)}
						/>
						<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="password"
						name="password"
						label="Password"
						type="password"
						onChange={e => setPassword(e.target.value)}
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
					</div>
				</Grid>
				</Grid>
			</Container>
		</DashboardLayout>
	)
}

export default Login;
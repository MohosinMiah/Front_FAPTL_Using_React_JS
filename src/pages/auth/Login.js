import { useState } from 'react';
import swal from 'sweetalert';
import { DashboardLayoutLogin } from '../../components/LayoutLogin';


const Login = () => {

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	async function loginUser(credentials) {
		localStorage.removeItem('access_token' );

		console.log(process.env.PRODUCTION_DEV_URL);
		return fetch("https://api.americanbestit.com/api/v1/login", {
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
		if ('access_token' in response) {
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
		else {
			swal("Failed", response.message, "error");
		}
	}

	return (
		<DashboardLayoutLogin>
			{localStorage.removeItem('access_token')}
			<div className="login-page">
				<div className="container">
					<div className="login-box">
						<div id="circle">
							<div className="circle-ripple"></div>
						</div>
						<div className="row align-items-center">
							<div className="col-sm-6">
								<div className="text-center"><img src="/logo.png" alt="Logo" className="mx-auto"/>
								<p className="large-heading">Dashboard Login</p></div>
							</div>
							<div className="col-sm-6">
								<div className="wrap-login">
									<form className="login-form validate-form">
										<div className="wrap-input">
											<input className="input" type="email" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
										</div>
										<div className="wrap-input validate-input">
											<input className="input" type="password" name="Password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
										</div>
										<button className="login-btn" onClick={handleSubmit}>Login</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</DashboardLayoutLogin>
	)
}

export default Login;
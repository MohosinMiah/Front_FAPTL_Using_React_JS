
import axios from 'axios';
import { useEffect, useState } from "react";
import { Bars } from 'react-loader-spinner';
import { Redirect, useParams } from "react-router-dom";

import swal from 'sweetalert';
const PaymentStatusChangeDeposited = () => {

	let { id } = useParams();
  const [ spinner, setSpinner ] = useState(true);

    useEffect(() => { 
        updateDepositedStatus();
        setTimeout(() => setSpinner(false), 2000)
      }, []);
      const updateDepositedStatus = async () => {
        const api = 'https://api.americanbestit.com/api/v1/payment/change/deposited/'+id; 
        const token = localStorage.getItem('access_token');
        await axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
          console.log(res.data);
          swal("Success", "Payment Deposited", "success", {
			buttons: false,
			timer: 2000,
			})

        }).catch((error) => {
            swal("Failed", "Fail To Deposited", "error");
      });

    }

    function handleBackNav()  {
        // history.back();
        window.location.href = "/payment/list/recorded";

    }

  return(

        <div>
              { spinner && 
				<div className="spinner-container">
				<div className="loading-spinner">
					<Bars
						height="200"
						width="400"
						color="#4fa94d"
						ariaLabel="bars-loading"
						wrapperStyle={{}}
						wrapperClass=""
						visible={true}
					/>
					</div>
				</div> }
             { !spinner && <Redirect to={"/payment/list/recorded"} />}
        </div>
  )
}

export default PaymentStatusChangeDeposited;
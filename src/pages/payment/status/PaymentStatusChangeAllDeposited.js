
import axios from 'axios';
import { useEffect, useState } from "react";
import { Bars } from 'react-loader-spinner';
import { Redirect } from "react-router-dom";
import swal from 'sweetalert';


const PaymentStatusChangeAllDeposited = () => {

  const [ spinner, setSpinner ] = useState(true);

    useEffect(() => { 
        deleteAllRecordedToDeposited();
        setTimeout(() => setSpinner(false), 2000)

      }, []);
      const deleteAllRecordedToDeposited = async () => {
        const api = 'http://127.0.0.1:8000/api/v1/payments/mark/all/deposited'; 
        const token = localStorage.getItem('access_token');
        await axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
          console.log(res.data);
          swal("Success", "All Pending Payment Status Changed To Deposited", "success", {
        buttons: false,
        timer: 2000,
			})

        }).catch((error) => {
            swal("Failed", "Fail To Mark Deposited", "error");
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
             { !spinner &&<Redirect to={"/payment/list/recorded"} />}
        </div>
  )
}

export default PaymentStatusChangeAllDeposited;
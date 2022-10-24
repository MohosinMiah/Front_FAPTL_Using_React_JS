
import axios from 'axios';
import { useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";

import swal from 'sweetalert';
const PaymentStatusChangeDeposited = () => {

	let { id } = useParams();

    useEffect(() => { 
        deleteProperty();
      }, []);
      const deleteProperty = async () => {
        const api = 'http://127.0.0.1:8000/api/v1/payment/change/deposited/'+id; 
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
            { <Redirect to={"/payment/list/recorded"} />}
        </div>
  )
}

export default PaymentStatusChangeDeposited;
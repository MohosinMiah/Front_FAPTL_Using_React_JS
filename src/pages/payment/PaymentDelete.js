
import axios from 'axios';
import { useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";

import swal from 'sweetalert';
const PaymentDelete = () => {

	let { id } = useParams();

    useEffect(() => { 
        deletePayment();
      }, []);
      const deletePayment = async () => {
        const api = 'http://127.0.0.1:8000/api/v1/payments/'+id; 
        const token = localStorage.getItem('access_token');
        await axios.delete(api , { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
          console.log(res.data);
          swal("Success", "Lease Deleted", "success", {
			buttons: false,
			timer: 2000,
			})

        }).catch((error) => {
            swal("Failed", "Fail To Delete", "error");
      });

    }

    function handleBackNav()  {
        // history.back();
        window.location.href = "/payment/list";

    }

  return(

        <div>
            { <Redirect to={"/payment/list"} />}
        </div>
  )
}

export default PaymentDelete;
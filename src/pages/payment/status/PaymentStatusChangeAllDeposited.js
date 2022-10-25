
import axios from 'axios';
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import swal from 'sweetalert';


const PaymentStatusChangeAllDeposited = () => {


    useEffect(() => { 
        deleteAllRecordedToDeposited();
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
            { <Redirect to={"/payment/list/recorded"} />}
        </div>
  )
}

export default PaymentStatusChangeAllDeposited;
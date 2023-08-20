import axios from "axios";

 export function postFsbu25Calculator(leasingContract,setResponseData) {

        const config = {
            method: "post",
            url: "http://localhost:8080/api/fsbu25-calculator",
            data: leasingContract,
            //  paymentFormData: paymentList,
        };

     axios(config)
         .then((response) => {
             if (response.data && response.data.discountedFlows) {
                 const responseData = {
                     percent: response.data.percent,
                     discountedFlows: response.data.discountedFlows
                 };
                 setResponseData(responseData);
                 console.log(responseData);
             } else {
                 console.log('Ответ сервера не содержит поля "discountedFlows"');
             }
         })
         .catch((error) => {
             console.log(error);
         });

    }




import axios from "axios";

 export function postCreateLoan(loan,setLoanResponseData) {

        const config = {
            method: "post",
            url: "http://localhost:8080/api/new-loan",
            data: loan,
        };

     axios(config)
         .then((response) => {
             if (response.data ) {
                 const responseData = {
                     loanResponse: response.data,
                 };
                 console.log(responseData);
                 setLoanResponseData(responseData)
             } else {
                 console.log('Ответ сервера не содержит поля "discountedFlows"');
             }
         })
         .catch((error) => {
             console.log(error);
         });

    }




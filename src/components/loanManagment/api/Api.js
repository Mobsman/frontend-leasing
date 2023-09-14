import axios from "axios";

export function postCreateLoan(loan, setResponseData) {

    const config = {
        method: "post",
        url: "http://localhost:8080/api/new-loan",
        data: loan,
    };

    axios(config)
        .then((response) => {
            if (response.data) {
                const responseData = {
                    loanResponse: response.data,
                };
                console.log(responseData);
                setResponseData(responseData)
            } else {
                console.log('Ответ сервера не содержит поля "discountedFlows"');
            }
        })
        .catch((error) => {
            console.log(error);
        });

}

export function deleteLoan(id, setLoanResponse) {

    const config = {
        method: "delete",
        url: "http://localhost:8080/api/delete-loan/" + id,
    };

    return axios(config)
        .then(response => {
            axios.get("http://localhost:8080/api/get-all-loans")
                .then(response => {
                    setLoanResponse({
                        loanResponse: response.data,
                    });
                    console.log("Loan deleted successfully", response.data);
                })
                .catch(error => {
                    // Обработка ошибок при удалении
                    console.error("Error deleting loan", error);
                    throw error; // Пробрасываем ошибку дальше
                });


        })
}

export function updateLoan(loan, setLoanResponse) {

    const config = {
        method: "put",
        url: "http://localhost:8080/api/update-loan/" + loan.id,
        data: loan,
    };

    console.log(loan)

    return axios(config)
        .then(response => {
            axios.get("http://localhost:8080/api/get-all-loans")
                .then(response => {
                    setLoanResponse({
                        loanResponse: response.data,
                    });
                    console.log("Loan deleted successfull", response.data);
                })
                .catch(error => {
                    // Обработка ошибок при удалении
                    console.error("Error deleting loan", error);
                    throw error; // Пробрасываем ошибку дальше
                });


        })
}

export function postPayment(payment, id, setPaymentResponse) {
    console.log("Отправка", payment);

    const config = {
        method: "post",
        url: `http://localhost:8080/api/new-payment/${id}`,
        data: payment,
    };

    return axios(config)
        .then(response => {
            if (response.data) {
                setPaymentResponse({
                    paymentResponse: response.data
                });
                console.log("Loan deleted successfully", response.data);
            } else {
                console.log('Ответ сервера не содержит поля "discountedFlows"');
            }
        })
        .catch(error => {
            console.error("Ошибка при удалении займа", error);
        });
}

export function getAllPayment(id,setPaymentResponse) {
    const config = {
        method: "get",
        url: `http://localhost:8080/api/get-all-payments/${id}`,
    };

    return axios(config)
        .then(response => {
            if (response.data) {
                setPaymentResponse({
                    paymentResponse: response.data
                });
                console.log("Loan deleted successfully", response.data);
            } else {
                console.log('Ответ сервера не содержит поля "discountedFlows"');
            }
        })
        .catch(error => {
            console.error("Ошибка при удалении займа", error);
        });
}

export function getAllPercents(id,setCalculatorPercentResponse) {

    const config = {
        method: "get",
        url: `http://localhost:8080/api/get-all-percents/${id}`,
    };

    return axios(config)
        .then(response => {
            if (response.data) {
                setCalculatorPercentResponse({
                    percentResponse: response.data
                });
                console.log("Loan deleted successfully", response.data);
            } else {
                console.log('Ответ сервера не содержит поля "discountedFlows"');
            }
        })
        .catch(error => {
            console.error("Ошибка при удалении займа", error);
        });
}
import LoanTable from "./LoanTable";
import LoanForm from "./LoanForm";
import {useEffect, useState} from "react";
import {postCreateLoan} from "./api/Api";
import axios from "axios";

function LoanManagement() {

    const [responseData, setLoanResponseData] = useState({loanResponse: []})
    const [loan, setLoan] = useState({})

    useEffect(() => {
        axios.get("http://localhost:8080/api/get-all-loans")
            .then(response => {
                setLoanResponseData({
                    loanResponse: response.data,
                });

            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);


    useEffect(() => {
        if (Object.keys(loan).length > 0) {
            postCreateLoan(loan, setLoanResponseData);
        }
    }, [loan]);

    return (<div>
        <LoanForm setLoan={setLoan}/>
        <LoanTable responseData={responseData} setLoanResponseData={setLoanResponseData} />
    </div>)
}

export default LoanManagement;
import {Button, DatePicker, Form, Input, Space} from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";
import {useEffect, useState} from "react";
import {postCreateLoan} from "./api/Api";


function LoanForm({setLoan}) {
    const dateFormat = "DD.MM.YYYY";
    const onFinish = (values) => {

        const loan = {
            loanContractName: values.loanContractName ? values.loanContractName : "",
            dateOfIssue: values.dateOfIssue ? values.dateOfIssue.format(dateFormat) : "",
            endDate: values.endDate ? values.endDate.format(dateFormat) : "",
            borrower: values.borrower ? values.borrower : "",
            loanAmount: values.loanAmount ? values.loanAmount : "",
            percent: values.percent ? values.percent : "",
        }
        console.log(loan)
        setLoan(loan)

    };

    return (<div style={{marginTop: 20}}>

        <Form onFinish={onFinish} labelCol={{flex: '125px'}} style={{marginBottom: 20}} >
            <Form.Item label="Договор займа:" name="loanContractName" style={{width: 400, display: "inline-block"}}>
                <Input placeholder="№  от  "/>
            </Form.Item>

            <Form.Item label="Дата выдачи:" name="dateOfIssue"
                       style={{width: 250, display: "inline-block", margin: '0 8px'}}>
                <DatePicker locale={locale} format={dateFormat} placeholder="Дата"/>
            </Form.Item>

            <Form.Item label="Дата завершения:" name="endDate"
                       style={{width: 250, display: "inline-block", margin: '0 8px'}}>
                <DatePicker locale={locale} format={dateFormat} placeholder="Дата"/>
            </Form.Item>


            <Form.Item label="Заемщик" >
                <Form.Item name="borrower" style={{display: 'inline-block', width: 273,}}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Процент" name="percent"
                           style={{display: 'inline-block', width: 131, margin: '0  30px',}}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Сумма" name="loanAmount" style={{display: 'inline-block', width: 165,margin: '0  25px'}}>
                    <Input/>
                </Form.Item>
                <Button type="primary" htmlType="submit"
                        style={{display: 'inline-block', width: 120, margin: '0  10px',}}>
                    Добавить
                </Button>
            </Form.Item>

        </Form>
    </div>)
}

export default LoanForm

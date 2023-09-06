import {getAllPayment, postPayment, updateLoan} from "./api/Api";
import {Button, DatePicker, Form, Input, Modal, Table} from "antd";
import React, {useEffect, useState} from "react";
import locale from "antd/es/date-picker/locale/ru_RU";


function LoanRepayment(props) {

    const dateFormat = "DD.MM.YYYY";
    const [paymentSend, setPayment] = useState({})
    const [paymentResponse, setPaymentResponse] = useState([])


    const onFinish = (values) => {

        const payment = {
            paymentDay: values.paymentDay ? values.paymentDay.format(dateFormat) : "",
            paymentSum: values.paymentSum ? values.paymentSum : ""
        }

        setPayment(payment)
        postPayment(payment, props.record.id, setPaymentResponse).then()
    };


    const dataSourcePayment = (paymentResponse.paymentResponse && Array.isArray(paymentResponse.paymentResponse)) ?
        paymentResponse.paymentResponse.map((item, index) => {
        const number = index + 1;
        const paymentDay = item.paymentDay ? new Date(item.paymentDay).toLocaleDateString() : null;
        const paymentSum = item.paymentSum ? item.paymentSum.toFixed(2) : null;

        return {
            number,
            paymentDay,
            paymentSum
        };
    }) : [];


    useEffect(() => {
        if (paymentResponse.length === 0) {
            getAllPayment(props.record.id, setPaymentResponse).then();
        }
    }, [paymentResponse]);


    const columns = [
        {
            title: '№',
            dataIndex: 'number',
            editable: true,
        },
        {
            title: 'Дата платежа',
            dataIndex: 'paymentDay',
            editable: true,
        },
        {
            title: 'Сумма',
            dataIndex: 'paymentSum',
            editable: true,
        }
    ]

    return (
        <>
            <Modal
                width={650}
                height={650}
                footer={null}
                visible={props.percentVisible}
                onCancel={() => {
                    props.setPercentVisible(false)
                }}>

                <Form onFinish={onFinish} labelCol={{flex: '95px'}}>

                    <Form.Item label="Дата платежа:" name="paymentDay"
                               style={{width: 214, display: "inline-block"}}>
                        <DatePicker locale={locale} format={dateFormat} placeholder="Дата"/>
                    </Form.Item>
                    <Form.Item label="Платеж" name="paymentSum" style={{width: 200, display: "inline-block"}}>
                        <Input placeholder="платеж"/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit"
                            style={{display: 'inline-block', width: 100, marginLeft: 30}} onClick={() => {
                    }}>
                        Добавить
                    </Button>
                </Form>
                <Table dataSource={dataSourcePayment} columns={columns} size={"small"}/>
            </Modal>
        </>)
}


export default LoanRepayment
import {Button, Checkbox, DatePicker, Form, Input} from "antd";
import "../../App.css"
import {useState} from "react";
import ResultFSBU25Table from "./ResultFSBU25Table";
import {postFsbu25Calculator} from "./api/Api";
import CustomPayment from "./CustomPayment";
import 'dayjs/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';


function CalculatorFSBU25Form() {

    const dateFormat = "YYYY-MM-DD";
    const [form] = Form.useForm();
    const [monthlyChecked, setCheckedMonthly] = useState(false);
    const [differentPaymentsChecked, setCheckedDifferentPayments] = useState(false);
    const [leasingContract, setLeasingContract] = useState({});
    const [responseData, setResponseData] = useState({});
    const [paymentInputs, setPaymentInputs] = useState([{ date: "", payment: "" }]);


    const onMonthlyChange = (e) => {
        setCheckedMonthly(e.target.checked);
    };

    const onDifferentPaymentsChange = (e) => {
        setCheckedDifferentPayments(e.target.checked);
    };

    const onFinish = (values) => {
        const leasingContract = {
            propertyPrice: values.propertyPrice ? values.propertyPrice : "",
            transferDate: values.transferDate ? values.transferDate.format(dateFormat) : "",
            monthly: values.monthly ? values.monthly : false,
            differentPayments: values.differentPayments ? values.differentPayments : false,
            lastDay: values.lastDay ? values.lastDay : false,
            monthlyPayment: values.monthlyPayment ? values.monthlyPayment : "",
            firstPaymentDate: values.firstPaymentDate ? values.firstPaymentDate.format(dateFormat) : "",
            numberOfPayments: values.numberOfPayments ? values.numberOfPayments : "",
            redemptionPayment: values.redemptionPayment ? values.redemptionPayment : "",
            paymentList: paymentInputs ? paymentInputs : []
        }
        setLeasingContract(leasingContract)

        postFsbu25Calculator(leasingContract, setResponseData)

    };

    const handleUpdatePaymentInputs = (updatedInputs) => {
        setPaymentInputs(updatedInputs);
    };

    console.log(leasingContract)

    return (
        <div style={{
            display: "flex",
            flexDirection: "row"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "white",
                borderRadius: 20,
                marginTop: 10,
                width: 430
            }}>

                <Form onFinish={onFinish} form={form}
                      style={{marginTop: 10}} wrapperCol={{span: 7}}
                      labelCol={{flex: '280px',}}
                >
                    <Form.Item label="Стоимость имущества без НДС" name="propertyPrice">
                        <Input/>
                    </Form.Item>

                    <Form.Item label="Дата передачи имущества" name="transferDate">
                        <DatePicker  locale={locale} format={dateFormat} placeholder="Дата"/>
                    </Form.Item>

                    <Form.Item style={{visibility: differentPaymentsChecked ? "hidden" : "visible"}}
                               label="Равные ежемесячные платежи" name="monthly" valuePropName="checked"
                               onChange={onMonthlyChange}>
                        <Checkbox/>
                    </Form.Item>

                    <Form.Item style={{visibility: monthlyChecked ? "hidden" : "visible"}}
                               label="Указать свой график платежей" name="differentPayments" valuePropName="checked"
                               onChange={onDifferentPaymentsChange}>
                        <Checkbox/>
                    </Form.Item>

                    {differentPaymentsChecked && (
                        <div>
                            <CustomPayment paymentInputs={paymentInputs} onUpdatePaymentInputs={handleUpdatePaymentInputs}/>
                        </div>)}

                    {monthlyChecked && (
                        <>
                            <Form.Item label="Каждый платеж последним днем месяца" name="lastDay"
                                       valuePropName="checked">
                                <Checkbox/>
                            </Form.Item>

                            <Form.Item label="Ежемесячный платеж без НДС" name="monthlyPayment">
                                <Input/>
                            </Form.Item>

                            <Form.Item label="Дата первого платежа" name="firstPaymentDate">
                                <DatePicker  locale={locale} format={dateFormat} placeholder="Дата"/>
                            </Form.Item>

                            <Form.Item label="Количество платежей" name="numberOfPayments">
                                <Input/>
                            </Form.Item>

                            <Form.Item label="Выкупная стоимость" name="redemptionPayment">
                                <Input/>
                            </Form.Item>
                        </>
                    )}

                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 16,
                        }}
                    >
                        <Button  type="primary" htmlType="submit">
                            Рассчитать
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div>
                <ResultFSBU25Table data={responseData}/>
            </div>

        </div>
    )


}

export default CalculatorFSBU25Form;
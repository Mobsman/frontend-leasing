import {Button, Space} from "antd";
import CustomPaymentInput from "./CustomPaymentInput";

function CustomPayment(props) {

    const {paymentInputs, onUpdatePaymentInputs} = props;

    function handleCreatePayment() {
        onUpdatePaymentInputs([...paymentInputs, {date: "", payment: ""}]);
    }

    function handleDeletePayment() {
        onUpdatePaymentInputs(paymentInputs.slice(0, -1));
    }

    const handleUpdateData = (index, newData) => {
        const updatedInputs = paymentInputs.map((input, i) => (i === index ? newData : input));
        onUpdatePaymentInputs(updatedInputs);
    };

    return (
        <div style={{marginBottom: 20}}>
            <Space direction="vertical" size="middle" style={{display: "flex"}}>
                <Button style={{marginLeft: 180}} type="primary" onClick={handleCreatePayment}>
                    Добавить
                </Button>

                {paymentInputs.map((input, index) => (
                    <CustomPaymentInput
                        key={index}
                        data={input}
                        index={index}
                        onUpdateData={newData => handleUpdateData(index, newData)}
                    />
                ))}

                <Button style={{marginLeft: 184}} type="primary" onClick={handleDeletePayment}>
                    Удалить
                </Button>
            </Space>
        </div>
    );
}

export default CustomPayment;
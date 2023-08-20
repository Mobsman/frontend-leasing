import Input from "antd/es/input/Input";
import {DatePicker, Space} from "antd";
import moment from "moment";
import 'dayjs/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';

function CustomPaymentInput (props) {

    const dateFormat = "YYYY-MM-DD";

    const handleDateChange = date => {
        const newDate = date ? date.format(dateFormat) : "";
        props.onUpdateData({ ...props.data, date: newDate });
    };

    const handlePaymentChange = payment => {
        props.onUpdateData({ ...props.data, payment: payment.target.value });
    };


    return (
        <div style={{ marginLeft: 20, marginRight: 10 }}>
            <Space size={20}>
                {props.index+1}
                <DatePicker
                    locale={locale}
                    format={dateFormat}
                    value={props.data.date ? moment(props.data.date, dateFormat) : ""}
                    placeholder="Дата"
                    onChange={handleDateChange}
                />
                <Input
                    value={props.data.payment}
                    placeholder="Платеж"
                    onChange={handlePaymentChange}
                />
            </Space>
        </div>
    );
}

export default CustomPaymentInput;
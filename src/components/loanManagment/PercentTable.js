import { Modal, Table} from "antd";
import React, {useEffect, useState} from "react";
import { getAllPercents} from "./api/Api";

function PercentTable(props) {

    const [calculatorPercentResponse, setCalculatorPercentResponse] = useState([])

    const dataSource = (calculatorPercentResponse.percentResponse && Array.isArray(calculatorPercentResponse.percentResponse)) ?
        calculatorPercentResponse.percentResponse.map((item, index) => {
            const number = index + 1;
            const month = item.month ? item.month : null;
            const percent = item.percent ? item.percent: null;

            return {
                number,
                month,
                percent
            };
        }) : [];


    useEffect(() => {
        if (props.percentCalculationVisible) {
            getAllPercents(props.record.id, setCalculatorPercentResponse).then();
        }
    }, [props.percentCalculationVisible]);


console.log(calculatorPercentResponse)
    const columns = [
        {
            title: 'Номер',
            dataIndex: 'number',
        },
        {
            title: 'Месяц',
            dataIndex: 'month',
        },
        {
            title: 'Проценты',
            dataIndex: 'percent',
        },
    ]

    return(  <>
        <Modal
            width={350}
            height={350}
            footer={null}
            visible={props.percentCalculationVisible}
            onCancel={() => {
                props.setPercentCalculationVisible(false)
            }}>

            <Table  columns={columns} dataSource={dataSource} size={"small"}/>
        </Modal>
    </>)

}

export default PercentTable;
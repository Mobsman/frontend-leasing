import "../../App.css"
import { Table, Typography } from 'antd';

const { Text } = Typography;
function ResultFSBU25Table(props) {

    const columns = [

        {
            title: '№',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Дата',
            dataIndex: 'paymentDay',
            key: 'paymentDay',
        },
        {
            title: 'Месячный платеж',
            dataIndex: 'monthlyPayment',
            key: 'monthlyPayment',
        },
        {
            title: 'Процентный доход',
            dataIndex: 'interestExpense',
            key: 'interestExpense',
        },
        {
            title: 'Уменьшение обязательств',
            dataIndex: 'reductionOfLiability',
            key: 'reductionOfLiability',
        },
        {
            title: 'Остаток задолженности',
            dataIndex: 'outstandingBalance',
            key: 'outstandingBalance',
        }
    ];

    const data = props.data.discountedFlows || [];
    const percent = props.data.percent;
    const dataSource = data.map((item, index) => {
        const number = index + 1;
        const paymentDay = item.paymentDay ? new Date(item.paymentDay).toLocaleDateString() : null;
        const monthlyPayment = item.monthlyPayment ? item.monthlyPayment.toFixed(2) : null;
        const interestExpense = item.interestExpense ? item.interestExpense.toFixed(2) : null;
        const reductionOfLiability = item.reductionOfLiability ? item.reductionOfLiability.toFixed(2) : null;
        const outstandingBalance = item.outstandingBalance ? item.outstandingBalance.toFixed(2) : null;

        return {
            number,
            paymentDay,
            monthlyPayment,
            interestExpense,
            reductionOfLiability,
            outstandingBalance,
        };
    });

    const locale = {
        emptyText: 'Заполните форму',
    };

    return (
        <div style={{marginTop: 10, paddingLeft: 20}}>

            <Table
                locale={locale}
                size={"middle"}
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                title={() => <>Годовая ставка: {percent} %</>}
                bordered
                summary={(pageData) => {
                    let paymentTotal = 0;
                    let expenseTotal = 0;
                    pageData.forEach(({ monthlyPayment, interestExpense }) => {
                        paymentTotal += parseFloat(monthlyPayment);
                        expenseTotal += parseFloat(interestExpense);
                    });
                    return (
                        <>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}> </Table.Summary.Cell>
                                <Table.Summary.Cell index={2}>Итого</Table.Summary.Cell>
                                <Table.Summary.Cell index={2}>
                                    <Text >{paymentTotal.toFixed(2)}</Text>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={3}>
                                    <Text>{expenseTotal.toFixed(2)}</Text>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        </>
                    );
                }}
             />

        </div>
    )

}

export default ResultFSBU25Table;

// <Table  size={"middle"} dataSource={dataSource} columns={columns} pagination={false}/>
import React, {useEffect, useState} from 'react';
import {Button, Popconfirm, Table, Modal, Input} from 'antd';
import {DeleteOutlined, EditOutlined, PercentageOutlined, PlusOutlined, PlusSquareOutlined} from "@ant-design/icons";
import {deleteLoan, postCreateLoan, postPayment, updateLoan} from "./api/Api";
import LoanRepayment from "./LoanRepayment";
import PercentTable from "./PercentTable";


function LoanTable({responseData, setLoanResponseData}) {

    const dataSource = (responseData.loanResponse && Array.isArray(responseData.loanResponse))
        ? responseData.loanResponse.map((loan) => {
            const id = loan.id ? loan.id : null;
            const loanContractName = loan.loanContractName ? loan.loanContractName : null;
            const dateOfIssue = loan.dateOfIssue ? new Date(loan.dateOfIssue).toLocaleDateString() : null;
            const endDate = loan.endDate ? new Date(loan.endDate).toLocaleDateString() : null;
            const borrower = loan.borrower ? loan.borrower : null;
            const loanAmount = loan.loanAmount ? loan.loanAmount : null;
            const percent = loan.percent ? loan.percent : null;
            const percentageAmount = loan.percentageAmount ? loan.percentageAmount : null;

            return {
                id,
                loanContractName,
                dateOfIssue,
                endDate,
                borrower,
                loanAmount,
                percent,
                percentageAmount,
            };
        })
        : [];

    const [editing, setEdit] = useState(false)

    const [editingLoan, setEditingLoan] = useState({})

    const [send, setSending] = useState({})

    const [updateData, setUpdateData] = useState([])



    console.log("editing", editingLoan)

    useEffect(() => {
        setUpdateData(dataSource);
    }, [responseData]);

    const resetEditing = () => {
        setEdit(false)
        setEditingLoan(null)
    }

    const handleEdit = (record) => {
        console.log("handleEdit", record)
        setEdit(true)
        setEditingLoan({...record})
        setSending({...record})
    }

    console.log("send", send)

    const handleDelete = (id) => {
        deleteLoan(id, setLoanResponseData).then()
    };

   // const [percentVisible, setPercentVisible] = useState(false)

    const [percentVisible, setPercentVisible] = useState(Array(dataSource.length).fill(false));
    const [percentCalculationVisible, setPercentCalculationVisible] = useState(Array(dataSource.length).fill(false));

    const handlePercentVisible = (index) => {
        const updatedVisibleStates = [...percentVisible];
        updatedVisibleStates[index] = !updatedVisibleStates[index];
        setPercentVisible(updatedVisibleStates);
    };

    const handlePercentVisibilityChange = (index, value) => {
        const updatedVisibleStates = [...percentVisible];
        updatedVisibleStates[index] = value;
        setPercentVisible(updatedVisibleStates);
    };



    const handlePercentCalculationVisible = (index) => {
        const updatedVisibleStates = [...percentCalculationVisible];
        updatedVisibleStates[index] = !updatedVisibleStates[index];
        setPercentCalculationVisible(updatedVisibleStates);
    };

    const handlePercentCalculationVisibilityChange = (index, value) => {
        const updatedVisibleStates = [...percentCalculationVisible];
        updatedVisibleStates[index] = value;
        setPercentCalculationVisible(updatedVisibleStates);
    };

    const columns = [
        {
            title: 'Договор займа',
            dataIndex: 'loanContractName',
            editable: true,
        },
        {
            title: 'Дата выдачи',
            dataIndex: 'dateOfIssue',
            align: 'center',
            editable: true,
        },
        {
            title: 'Дата завершения',
            dataIndex: 'endDate',
            align: 'center',
            editable: true,
        },

        {
            title: 'Заемщик',
            dataIndex: 'borrower',
            editable: true,
        },
        {
            title: 'Сумма займа',
            dataIndex: 'loanAmount',
            align: 'center',
            editable: true,
        },

        {
            title: 'Ставка %',
            dataIndex: 'percent',
            align: 'center',
            editable: true,
        },

        {
            title: 'Проценты к получению',
            dataIndex: 'percentageAmount',
            align: 'center',
            editable: true,
        },
        {
            title: 'Расчет процентов',
            dataIndex: 'percentCalculation',
            align: 'center',
            render: (_, record,index) => {
                return (
                    <>
                        <PercentageOutlined onClick={() => handlePercentCalculationVisible(index)} style={{marginLeft: 20, color: "green"}}/>
                        <PercentTable  record={record} percentCalculationVisible={percentCalculationVisible[index]}
                                       setPercentCalculationVisible={value => handlePercentCalculationVisibilityChange(index, value)}/>
                    </>
                )
            }
        },
        {
            title: 'Погашение',
            dataIndex: 'repayment',
            render: (_, record,index) => {
                return (
                    <>
                         <PlusSquareOutlined onClick={() =>handlePercentVisible(index)} style={{marginLeft: 20, color: "green"}}/>
                         <LoanRepayment record={record} percentVisible={percentVisible[index]} setPercentVisible={value => handlePercentVisibilityChange(index, value)}/>
                    </>
                )
            }
        },

        {
            title: 'Редактирование',
            dataIndex: 'operation',
            render: (_, record) => {
                return (
                    <>
                        <EditOutlined onClick={() => {

                            handleEdit(record)

                        }} style={{marginLeft: 20,}}/>
                        <Popconfirm okText="да" cancelText="нет" title="Удалить?" onConfirm={() => {
                            handleDelete(record.id)
                        }}>
                            <DeleteOutlined style={{marginLeft: 30, color: "red"}}/>
                        </Popconfirm>

                    </>
                )
            }
        }

    ];


    return (

        <div>
            <Table dataSource={updateData} columns={columns} size={"middle"}/>
            <Modal
                open={editing}
                okText="Сохранить"
                cancelText="Отмена"
                onCancel={() => {
                    resetEditing()
                }}
                onOk={() => {
                    setSending(prevEditingLoan => {

                        if (JSON.stringify(prevEditingLoan) !== JSON.stringify(editingLoan)) {
                            return editingLoan;
                        } else {
                            return null;
                        }

                    });

                    if (editingLoan !== null) {
                        updateLoan(editingLoan, setLoanResponseData).then()
                    }
                    resetEditing();
                }}>
                <Input style={{marginTop: 20}} value={editingLoan?.loanContractName} onChange={(e) => {
                    setEditingLoan(pre => {
                        return {...pre, loanContractName: e.target.value}
                    })
                }}/>
                <Input style={{marginTop: 20}} value={editingLoan?.dateOfIssue} onChange={(e) => {
                    setEditingLoan(pre => {
                        return {...pre, dateOfIssue: e.target.value}
                    })
                }}/>
                <Input style={{marginTop: 20}} value={editingLoan?.endDate} onChange={(e) => {
                    setEditingLoan(pre => {
                        return {...pre, endDate: e.target.value}
                    })
                }}/>
                <Input style={{marginTop: 20}} value={editingLoan?.borrower} onChange={(e) => {
                    setEditingLoan(pre => {
                        return {...pre, borrower: e.target.value}
                    })
                }}/>
                <Input style={{marginTop: 20}} value={editingLoan?.loanAmount} onChange={(e) => {
                    setEditingLoan(pre => {
                        return {...pre, loanAmount: e.target.value}
                    })
                }}/>
                <Input style={{marginTop: 20}} value={editingLoan?.percent} onChange={(e) => {
                    setEditingLoan(pre => {
                        return {...pre, percent: e.target.value}
                    })
                }}/>
            </Modal>
        </div>

    );

}

export default LoanTable;
import React, {useEffect, useState} from 'react';
import {Button, Popconfirm, Table, Modal, Input} from 'antd';
import {DeleteOutlined, EditOutlined, PlusOutlined, PlusSquareOutlined} from "@ant-design/icons";
import {deleteLoan, postCreateLoan, postPayment, updateLoan} from "./api/Api";
import LoanRepayment from "./LoanRepayment";


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
                percentageAmount
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

    const [percentVisible, setPercentVisible] = useState(false)


    const columns = [
        {
            title: 'Договор займа',
            dataIndex: 'loanContractName',

            editable: true,
        },
        {
            title: 'Дата выдачи',
            dataIndex: 'dateOfIssue',

            editable: true,
        },
        {
            title: 'Дата завершения',
            dataIndex: 'endDate',

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

            editable: true,
        },

        {
            title: 'Ставка %',
            dataIndex: 'percent',

            editable: true,
        },

        {
            title: 'Проценты к получению',
            dataIndex: 'percentageAmount',

            editable: true,
        },
        {
            title: 'Погашение',
            dataIndex: 'repayment',
            render: (_, record) => {
                return (
                    <>
                         <PlusSquareOutlined onClick={() => setPercentVisible(true)} style={{marginLeft: 20, color: "green"}}/>
                         <LoanRepayment record={record} percentVisible={percentVisible} setPercentVisible={setPercentVisible}/>
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
                        // console.log("setEditingLoan",prevEditingLoan)
                        // console.log("editingLoan",editingLoan)

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
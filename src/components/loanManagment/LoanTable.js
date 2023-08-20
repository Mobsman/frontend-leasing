import React, {useEffect, useState} from 'react';
import {Button, Popconfirm, Table, Modal, Input} from 'antd';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {postCreateLoan} from "./api/Api";


function LoanTable() {

    const [editing, setEdit] = useState(false)
    const [editingLoan, setEditingLoan] = useState(null)

    const [data, setData] = useState([])

    const[responseData,setLoanResponseData]= useState([])

    useEffect(() => {
        postCreateLoan(setLoanResponseData);
    }, [])

    const dataSource = responseData.map((loan, index) => {
        const id = loan.id? loan.id : null;
        const contractName = loan.contractName ? loan.contractName : null;
        const dateOfIssue = loan.dateOfIssue ? new Date(loan.dateOfIssue).toLocaleDateString() : null;
        const dateOfEnd = loan.dateOfEnd ? new Date(loan.dateOfEnd).toLocaleDateString() : null;
        const borrower = loan.borrower ? loan.borrower : null;
        const loanSum = loan.loanSum ? loan.loanSum : null;
        const percent = loan.percent ? loan.percent : null;
        const interestReceivable = loan.interestReceivable ? loan.interestReceivable : null;

        return {
            id,
            contractName,
            dateOfIssue,
            dateOfEnd,
            borrower,
            loanSum,
            percent,
            interestReceivable
        }
    })



    const columns = [
        {
            title: 'Договор займа',
            dataIndex: 'contractName',

            editable: true,
        },
        {
            title: 'Дата выдачи',
            dataIndex: 'dateOfIssue',

            editable: true,
        },
        {
            title: 'Дата завершения',
            dataIndex: 'dateOfEnd',

            editable: true,
        },

        {
            title: 'Заемщик',
            dataIndex: 'borrower',

            editable: true,
        },
        {
            title: 'Сумма займа',
            dataIndex: 'loanSum',

            editable: true,
        },

        {
            title: 'Процентая ставка',
            dataIndex: 'percent',

            editable: true,
        },

        {
            title: 'Проценты к получению',
            dataIndex: 'interestReceivable',

            editable: true,
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
                            handleDelete(record.key)
                        }}>
                            <DeleteOutlined style={{marginLeft: 30, color: "red"}}/>
                        </Popconfirm>

                    </>
                )
            }
        }

    ];

    const resetEditing = () => {
        setEdit(false)
        setEditingLoan(null)
    }

    const handleEdit = (record) => {
        setEdit(true)
        setEditingLoan({...record})

    }

    const handleDelete = (key) => {
        console.log(key)
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
    };


    return (

        <div>
            <Table dataSource={dataSource} columns={columns}/>
            <Modal
                open={editing}
                okText="Сохранить"
                cancelText="Отмена"
                onCancel={() => {
                    resetEditing()
                }}
                onOk={() => {
                    setData(pre=>{
                        return pre.map(loanContract=>{
                            if(loanContract.key=== editingLoan.key){
                                return editingLoan
                            } else{
                                return loanContract;
                            }
                        })
                    })
                    resetEditing()
                }}>
                <Input style={{marginTop:20}} value={editingLoan?.nameContract} onChange={(e) => {
                    setEditingLoan(pre => {
                        return {...pre, nameContract: e.target.value}
                    })
                }}/>
                <Input style={{marginTop:20}} value={editingLoan?.dateOfIssue} onChange={(e) => {
                    setEditingLoan(pre => {
                        return {...pre, dateOfIssue: e.target.value}
                    })
                }}/>

            </Modal>
        </div>

    );

}

export default LoanTable;
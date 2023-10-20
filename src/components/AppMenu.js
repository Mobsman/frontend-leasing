import React, {useState} from 'react';
import {CalculatorOutlined, FolderOutlined,} from '@ant-design/icons';
import {Divider, Menu} from 'antd';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import CalculatorFSBU25Form from "./fsbu25calculator/CalculatorFSBU25Form";
import CalculatorLeasingContractForm from "./fsbu25calculator/CalculatorLeasingContractForm";
import LoanManagement from "./loanManagment/LoanManagement";
import LoginForm from "./login/loginForm";

function getItem(label, key, icon, children) {
    return {key, icon, children, label};
}

const items = [
    getItem('Калькуляторы', '/calculator', <CalculatorOutlined/>, [
        getItem('Расчет ФСБУ 25', '/calculator-25'),
        getItem('Займы', '/calculator-leasing-contract'),
    ]),
    getItem("Документы", "/docs", <FolderOutlined/>)
];

function AppMenu() {

    const navigate = useNavigate()
    const someVariable = false

    return (
        <div>
            {someVariable ? (
                <div style={{display: "flex", flexDirection: "row"}}>
                    <Divider type="vertical"/>
                    <Menu
                        style={{width: 300, borderRadius: 10, marginTop: 10, marginBottom: 10, marginRight: 20}}
                        mode="inline"
                        theme='light'
                        items={items}
                        onClick={({key}) => {
                            navigate(key)
                        }}
                    />
                    <Content/>
                </div>
            ) : (
                <LoginForm/>
            )}
        </div>
    );
}

function Content() {
    return <div style={{flex: 1}}>
        <Routes>
            <Route path="/calculator-25" element={<CalculatorFSBU25Form/>}/>
            <Route path="/calculator-leasing-contract" element={<LoanManagement/>}/>
        </Routes>
    </div>
}

export default AppMenu;
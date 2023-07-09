import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {CloseOutlined, EditOutlined } from '@ant-design/icons'


export function SearchBudget(){

  const [budgets, setBudgets] = useState([]);

  useEffect(()=>{
    fetchBudgets();
  },[])

  const fetchBudgets = () => {
    axios.get('http://localhost:8001/api/budgets')
      .then(res => {
        setBudgets(res.data.budgets);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteBudget = (budgetId) => {
    axios.delete(`http://localhost:8001/api/deletebudget/${budgetId}`)
      .then((res) => {
        fetchBudgets();

        toast.success(`${res.data.message}!`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 5000,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderContent = () => {
    if (budgets.length === 0) {
      return <span className="text-zinc-100 bg-slate-900 border border-orange-500 p-5 rounded-sm">Ops, nenhum orçamento encontrado! </span>;
    }
  };


  return(
    <div className=" flex flex-col items-center justify-center mt-10 w-full gap-8 mb-10">
      <h1 className="text-zinc-50 font-bold text-5xl">Orçamentos</h1>

      {renderContent()}

      <ul className="flex flex-col gap-10 w-full items-center">
        {budgets.map(budget =>{
          return(
            <li key={budget.id} className=" flex flex-col bg-slate-900 border border-orange-500 rounded-sm p-5 gap-2 w-11/12 sm:w-2/5 break-words relative">
              <div className="self-center">
                <span className="text-zinc-100 font-bold">Orçamento #{budget.id}</span>
                <button onClick={() => deleteBudget(budget.id)} className=" w-6 h-6 flex justify-center items-center border bg-slate-950 border-orange-500 rounded-full bg-sla outline-none text-zinc-100 font-bold text-sm absolute top-4 right-2 hover:bg-orange-500">
                <CloseOutlined />
                </button>

                <button className="w-6 h-6 flex justify-center items-center border bg-slate-950 border-orange-500 rounded-full bg-sla outline-none text-zinc-100 font-bold text-sm absolute top-4 right-9 hover:bg-orange-500">
                <Link className="flex items-center" to={{pathname:"/budget/edit/"+ budget.id}}>
                  <EditOutlined />
                </Link>
              </button>

              </div>
              <span className="bg-orange-500 outline-none border-none break-words rounded-sm p-1">Nome do cliente: {budget.nameClient}</span>
              <span className="bg-orange-500 outline-none border-none break-words rounded-sm p-1">Nome do vendedor: {budget.nameSeller}</span>
              <span className="bg-orange-500 outline-none border-none break-words rounded-sm p-1">Descrição do orçamento: {budget.description}</span>
              <span className="bg-orange-500 outline-none border-none break-words rounded-sm p-1">Valor orçado: {budget.value}R$</span>
              <span className="bg-orange-500 outline-none border-none break-words rounded-sm p-1">Data e hora: {budget.dateAndTime}</span>
            </li>
          )
        })}
      </ul>

      <ToastContainer
        theme="dark"
      />
    </div>
  )
}
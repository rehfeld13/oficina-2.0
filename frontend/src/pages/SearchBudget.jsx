import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { format } from "date-fns";
import {
  CloseOutlined,
  EditOutlined,
  CalendarOutlined,
  UserOutlined,
  UserSwitchOutlined,
  CommentOutlined,
  WalletOutlined,
  ClockCircleOutlined,
  RobotOutlined
} from "@ant-design/icons";

/*
  I used the following libraries:

  @ant-design/icons -  library for icons.
  react-toastify -  library for slide effects with success or error messages.
  react-datetime-picker - library to capture date and time in a custom way.
  date-fns - library to format date and time.
  axios - library for making API requests.
  react-router-dom -  Library used with 'Link', to navigate to the 'EditBudge' page.
*/

export function SearchBudget() {
  const [budgets, setBudgets] = useState([]);
  const [clientName, setClientName] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fetchBudgets();
  }, [clientName, sellerName, startDate, endDate]);

  const fetchBudgets = () => {
    const params = {
      clientName: clientName,
      sellerName: sellerName,
      startDate: startDate ? format(startDate, "yyyy-MM-dd'T'HH:mm:ss") : null,
      endDate: endDate ? format(endDate, "yyyy-MM-dd'T'HH:mm:ss") : null,
    };

    axios
      .get("http://localhost:8000/api/budgets", { params })
      .then((res) => {
        setBudgets(res.data.budgets);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteBudget = (budgetId) => {
    axios
      .delete(`http://localhost:8000/api/deletebudget/${budgetId}`)
      .then((res) => {
        fetchBudgets();

        toast.success(`${res.data.message}!`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 5000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderContent = () => {
    if (budgets.length === 0) {
      return (
        <span className="flex gap-1 items-center text-zinc-100 w-72 bg-zinc-900 border border-green-600 p-5 rounded-sm">
          Ops, nenhum orçamento encontrado!
          <RobotOutlined className="text-lg" />
        </span>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 w-full gap-8 mb-10">
      <h1 className="text-zinc-900 font-bold text-4xl">Orçamentos</h1>

      <div className="flex flex-wrap flex-col sm:flex-row gap-5 w-full items-center justify-center">
        <input
          type="text"
          placeholder="Nome do cliente"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="border border-zinc-400 text-sm  bg-transparent ease-in duration-150 outline-none text-zinc-900 rounded p-1 focus:border-green-700"
        />
        <input
          type="text"
          placeholder="Nome do vendedor"
          value={sellerName}
          onChange={(e) => setSellerName(e.target.value)}
          className="border border-zinc-400 text-sm  bg-transparent ease-in duration-150 outline-none text-zinc-900 rounded p-1 focus:border-green-700"
        />
        <div className="flex flex-col sm:flex-row gap-1 items-center">
          <label className="text-green-700 font-bold text-sm">Data inicial</label>
          <DateTimePicker
            className="w-full border border-zinc-400 bg-transparent ease-in duration-150 text-zinc-900 rounded focus:border-green-700"
            format="dd-MM-yyyy HH:mm"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            locale="pt-BR"
            calendarIcon={<CalendarOutlined className="hover:text-green-700 text-sm" />}
            calendarClassName="bg-zinc-100"
            clearIcon={<CloseOutlined className="hover:text-green-700 text-sm" />}
            disableClock={true}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-1 items-center">
          <label className="text-green-700 font-bold text-sm">Data final</label>
          <DateTimePicker
            className="w-full border border-zinc-400 bg-transparent ease-in duration-150 text-zinc-900 focus:border-green-700 rounded"
            format="dd-MM-yyyy HH:mm"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            locale="pt-BR"
            calendarIcon={<CalendarOutlined className="hover:text-green-700 text-sm" />}
            calendarClassName="bg-zinc-100"
            clearIcon={<CloseOutlined className="hover:text-green-700 text-sm" />}
            disableClock={true}
          />
        </div>
        <button onClick={fetchBudgets} className="border text-sm  bg-green-700 ease-in duration-150 text-zinc-50 rounded p-1 hover:bg-green-600">
          Pesquisar
        </button>
      </div>

      {renderContent()}

      <ul className="flex flex-col gap-10 w-full items-center">
        {budgets.map((budget) => {
          return (
            <li key={budget.id} className="flex flex-col bg-zinc-900 border border-green-600 rounded-sm p-5 gap-2 w-11/12 sm:w-2/5 break-words relative">
              <div className="self-center">
                <span className="text-zinc-100 font-bold">Orçamento #{budget.id}</span>
                <button onClick={() => deleteBudget(budget.id)} className="w-6 h-6 flex justify-center items-center border bg-slate-950 border-green-600 rounded-full bg-sla outline-none text-zinc-100 font-bold text-sm absolute top-4 right-2 hover:bg-green-600">
                  <CloseOutlined />
                </button>

                <button className="w-6 h-6 flex justify-center items-center border bg-slate-950 border-green-600 rounded-full bg-sla outline-none text-zinc-100 font-bold text-sm absolute top-4 right-9 hover:bg-green-600">
                  <Link className="flex items-center" to={{ pathname: "/budget/edit/" + budget.id }}>
                    <EditOutlined />
                  </Link>
                </button>
              </div>

              <span className="bg-green-600 text-zinc-100 flex gap-2 items-center outline-none border-none break-words rounded-sm p-1">
                <UserOutlined />
                Nome do cliente: {budget.nameClient}
              </span>

              <span className="bg-green-600 text-zinc-100 flex gap-2 items-center outline-none border-none break-words rounded-sm p-1">
                <UserSwitchOutlined />
                Nome do vendedor: {budget.nameSeller}
              </span>

              <span className="bg-green-600 text-zinc-100 flex gap-2 items-center outline-none border-none break-words rounded-sm p-1">
                <CommentOutlined />
                Descrição do orçamento: {budget.description}
              </span>

              <span className="bg-green-600 text-zinc-100 flex gap-2 items-center outline-none border-none break-words rounded-sm p-1">
                <WalletOutlined />
                Valor orçado: {budget.value}R$
              </span>

              <span className="bg-green-600 text-zinc-100 flex gap-2 items-center outline-none border-none break-words rounded-sm p-1">
                <ClockCircleOutlined />
                Data e hora: {budget.dateAndTime}
              </span>
            </li>
          );
        })}
      </ul>

      <ToastContainer theme="dark" />
    </div>
  );
}

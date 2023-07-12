import { useState } from "react";
import { Api } from "../components/Api";
import { CalendarOutlined, CloseOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { format } from 'date-fns';

/*
  I used the following libraries:

  @ant-design/icons -  library for icons.
  react-toastify -  library for slide effects with success or error messages.
  react-datetime-picker - library to capture date and time in a custom way.
  date-fns - library to format date and time.
*/



export function CreateBudget() {
  const { http } = Api();

  const [nameClient, setNameClient] = useState('');
  const [nameSeller, setNameSeller] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [dateAndTime, setDateAndTime] = useState(new Date());

  const [nameClientError, setNameClientError] = useState(false);
  const [nameSellerError, setNameSellerError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [valueError, setValueError] = useState(false);
  const [dateAndTimeError, setDateAndTimeError] = useState(false);


  const handleNameClient = (event) => {
    setNameClient(event.target.value);
    setNameClientError(false);
  };

  const handleNameSeller = (event) => {
    setNameSeller(event.target.value);
    setNameSellerError(false);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
    setDescriptionError(false);
  };

  const handleValue = (event) => {
    setValue(event.target.value);
    setValueError(false);
  };

  const handleDateAndTime = (date) => {
    setDateAndTime(date);
    setDateAndTimeError(false);
  };

  const handleForm = (event) => {
    event.preventDefault();

    if (!nameClient || !nameSeller || !description || !value || !dateAndTime) {
      if (!nameClient) setNameClientError(true);
      if (!nameSeller) setNameSellerError(true);
      if (!description) setDescriptionError(true);
      if (!value) setValueError(true);
      if (!dateAndTime) setDateAndTimeError(true);

      toast.error('Por favor, preencha todos os campos.', {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 5000
      });
      return;
    }

    const formattedDateAndTime = format(dateAndTime, 'yyyy-MM-dd\'T\'HH:mm:ss');

    http.post('/createbudget', { nameClient, nameSeller, description, value, dateAndTime: formattedDateAndTime })
      .then(res => {
        toast.success(res.data.msg, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 5000
        });

        setNameClient('');
        setNameSeller('');
        setDescription('');
        setValue('');
        setDateAndTime(new Date());
      })
      .catch(error => {
        toast.error('Ocorreu um erro ao criar o orçamento.', {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 5000
        });
      });
  };

  return (
    <div className="flex items-center justify-center mt-10 sm:m-auto w-full">
      <form className="flex flex-col bg-zinc-50 shadow-md shadow-zinc-500/50 items-start w-11/12 lg:w-1/4 gap-4 p-5 pb-8 pr-8 pl-8">

        <h1 className="text-zinc-800 text-center font-bold text-3xl">Cadastrar orçamento</h1>
        <div className="flex flex-col w-full gap-1">
          <label className="text-green-800 text-sm  font-bold">Nome do cliente:</label>
          <input
            type="text"
            value={nameClient}
            onChange={handleNameClient}
            placeholder="Nome do cliente"
            className={`outline-none border text-sm  text-zinc-900 p-2 placeholder:text-zinc-500 focus:border-green-700 ${nameClientError ? 'border-red-500' : 'border-zinc-400'} `}
          />
        </div>

        <div className="flex flex-col w-full  gap-1">
          <label className="text-green-800 text-sm  font-bold">Nome do vendedor:</label>
          <input
            type="text"
            value={nameSeller}
            onChange={handleNameSeller}
            placeholder="Nome do vendedor"
            className={ `outline-none text-sm  border   text-zinc-900 p-2   placeholder:text-zinc-500  focus:border-green-700 ${nameSellerError ? 'border-red-500' : 'border-zinc-400'} `}
          />
        </div>

        <div className="flex flex-col w-full  gap-1">
          <label className="text-green-800 text-sm  font-bold">Descrição do orçamento:</label>
          <textarea
            rows={3}
            value={description}
            onChange={handleDescription}
            placeholder="Descrição do orçamento"
            className={`outline-none border text-sm    text-zinc-900 p-2   placeholder:text-zinc-500  focus:border-green-700 ${descriptionError ? 'border-red-500' : 'border-zinc-400'} `}
          />
        </div>

        <div className="flex flex-col w-full  gap-1">
          <label className="text-green-800 text-sm  font-bold">Valor do orçamento (R$):</label>
          <input
            type="number"
            value={value}
            onChange={handleValue}
            placeholder="Valor do orçamento"
            className={`outline-none border text-sm  text-zinc-900 p-2   placeholder:text-zinc-500  focus:border-green-700 ${valueError ? 'border-red-500' : 'border-zinc-400'} `}
          />
        </div>

        <div className="flex flex-col w-full  gap-1">
          <label className="text-green-800 text-sm font-bold">Data e hora:</label>
          <div>
            <DateTimePicker
              className={`flex item-center p-3 justify-center border text-zinc-600   focus:border-green-700 ${dateAndTimeError ? 'border-red-500' : 'border-zinc-400'} `}
              onChange={handleDateAndTime}
              value={dateAndTime}
              format="dd-MM-yyyy  HH:mm"
              locale="pt-BR"
              calendarIcon={<CalendarOutlined className="hover:text-green-700" />}
              calendarClassName="bg-white"
              clearIcon={<CloseOutlined className= "hover:text-green-700 "  />}
              disableClock={true}
            />
          </div>
        </div>

        <button
          type="submit"
          onClick={handleForm}
          className="w-full border bg-green-700 ease-in duration-150 text-white  p-3 hover:bg-green-600">
          Cadastrar
        </button>
      </form>

      <ToastContainer theme="dark" />
    </div>
  );
}

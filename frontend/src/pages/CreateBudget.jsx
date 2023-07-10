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
  const [dateAndTimeError,setDateAndTimeError] = useState(false);


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
    setDateAndTimeError(false)
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
    <div className="flex flex-col items-center justify-center mt-10 w-full gap-8">
      <h1 className="text-zinc-50 text-center font-bold text-5xl">Cadastrar orçamento</h1>

      <form className="flex flex-col items-center w-10/12 gap-8">
        <div className=" flex flex-col w-full gap-1 ">
          <label className="text-zinc-50">Nome do cliente</label>
          <input type="text" value={nameClient} onChange={handleNameClient} placeholder="Nome do cliente" className={`outline-none border-2 text-zinc-100 p-2 rounded bg-slate-900 focus:border-orange-500 ${nameClientError ? 'border-red-500' : 'border-transparent'} `} />
        </div>

        <div className=" flex flex-col w-full gap-1 ">
          <label className="text-zinc-50">Nome do vendedor</label>
          <input type="text" value={nameSeller} onChange={handleNameSeller} placeholder="Nome do vendedor" className={`outline-none border-2 text-zinc-100 p-2 rounded bg-slate-900 focus:border-orange-500 ${nameSellerError ? 'border-red-500' : 'border-transparent'} `} />
        </div>

        <div className=" flex flex-col w-full gap-1 ">
          <label className="text-zinc-50">Descrição do orçamento</label>
          <textarea rows={3} value={description} onChange={handleDescription} placeholder="Descrição do orçamento" className={`outline-none border-2 text-zinc-100 p-2 rounded bg-slate-900 focus:border-orange-500 ${descriptionError ? 'border-red-500' : 'border-transparent'} `} />
        </div>

        <div className=" flex flex-col w-full gap-1 ">
          <label className="text-zinc-50">Valor do orçamento (R$)</label>
          <input type="number" value={value} onChange={handleValue} placeholder="Valor do orçamento" className={`outline-none border-2 text-zinc-100 p-2 rounded bg-slate-900 focus:border-orange-500 ${valueError ? 'border-red-500' : 'border-transparent'} `} />
        </div>

        <div className="flex flex-col w-full gap-1">
          <label className="text-zinc-50">Data e hora</label>
          <div className="border-2 border-transparent p-2 rounded bg-slate-900 focus:border-orange-500">
            <DateTimePicker
              className={`flex item-center justify-center border-2 text-zinc-100 bg-slate-950 rounded-sm ${dateAndTimeError ? 'border-red-500' : 'border-transparent'}   `}
              onChange={handleDateAndTime}
              value={dateAndTime}
              format="dd-MM-yyyy  HH:mm"
              locale="pt-BR"
              calendarIcon={<CalendarOutlined className="hover:text-orange-500" />}
              calendarClassName="bg-slate-950"
              clearIcon={<CloseOutlined className="hover:text-orange-500" />}
              disableClock={true}
            />
          </div>
        </div>

        <button type="submit" onClick={handleForm} className="w-full border border-orange-500 ease-in duration-150 text-zinc-50 rounded p-3 hover:bg-orange-500">
          Cadastrar
        </button>
      </form>

      <ToastContainer theme="dark" />
    </div>
  );
}

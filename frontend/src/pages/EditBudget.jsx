import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

/*
  I used the following libraries:

  axios - library for making API requests.
  react-router-dom - library used to navigate to another page and to get parameters(ID).

*/

export function EditBudget() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [budget, setBudget] = useState({
    nameClient: "",
    nameSeller: "",
    description: "",
    value: 0,
    dateAndTime: "",
  });

  useEffect(() => {
    fetchBudget();
  }, []);

  const fetchBudget = () => {
    axios
      .get(`http://localhost:8000/api/budget/` + id)
      .then((res) => {
        setBudget(res.data.budget);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBudget({ ...budget, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8000/api/editbudget/` + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameClient: budget.nameClient,
        nameSeller: budget.nameSeller,
        description: budget.description,
        value: budget.value,
        dateAndTime: budget.dateAndTime,
      }),
    })
      .then(() => {
        navigate("/searchbudget");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 w-full gap-8">
      <h1 className="text-zinc-900 font-bold text-center text-lg sm:text-4xl">Editar Orçamento #{budget.id}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col items-center w-10/12 gap-8">
        <div className="flex flex-col w-full sm:w-2/4  gap-1">
          <label className="text-green-700 font-bold">Editar nome do cliente</label>
          <input
            type="text"
            name="nameClient"
            value={budget.nameClient}
            onChange={handleChange}
            placeholder="Editar"
            className="outline-none border border-zinc-400 text-zinc-950  p-2 rounded  focus:border-green-600"
          />
        </div>

        <div className="flex flex-col w-full sm:w-2/4  gap-1">
          <label className="text-green-700 font-bold">Editar nome do vendedor</label>
          <input
            type="text"
            name="nameSeller"
            value={budget.nameSeller}
            onChange={handleChange}
            placeholder="Editar"
            className="outline-none border border-zinc-400 text-zinc-950  p-2 rounded  focus:border-green-600"
          />
        </div>

        <div className="flex flex-col w-full sm:w-2/4  gap-1">
          <label className="text-green-700 font-bold">Editar descrição</label>
          <textarea
            rows="3"
            value={budget.description}
            name="description"
            onChange={handleChange}
            placeholder="Editar"
            className="outline-none text-zinc-950  border border-zinc-400  p-2 rounded  focus:border-green-600"
          />
        </div>

        <div className="flex flex-col w-full sm:w-2/4  gap-1">
          <label className="text-green-700 font-bold">Editar valor orçado(R$)</label>
          <input
            type="number"
            name="value"
            value={budget.value}
            onChange={handleChange}
            placeholder="Editar"
            className="outline-none border text-zinc-950 border-zinc-400 p-2 rounded  focus:border-green-600"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-2/4 border bg-green-700 ease-in duration-150 text-white rounded p-3 hover:bg-green-600">
          Editar
        </button>
      </form>
    </div>
  );
}

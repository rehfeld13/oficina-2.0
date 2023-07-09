import {Routes, Route } from 'react-router-dom'

import { SearchBudget } from './pages/SearchBudget'
import { CreateBudget } from './pages/CreateBudget'
import { EditBudget } from './pages/EditBudget'


import { Header } from './components/Header'


export function App() {
  return(
    <main className='min-h-screen flex flex-col items-center'>

      <Header />

      <Routes>
        <Route path='/' element={<CreateBudget />} />
        <Route path='/searchbudget' element={<SearchBudget />} />
        <Route path='/budget/edit/:id' element={<EditBudget />} />
      </Routes>
    </main>
  )
}



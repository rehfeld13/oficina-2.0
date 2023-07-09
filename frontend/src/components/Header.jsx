import { Link } from 'react-router-dom'

import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons'


export function Header(){
  return(
    <header className='flex items-center justify-between bg-orange-500 w-full h-20 gap-4 p-8'>
        <Link to="/" className='flex items-center'>
          <span className='text-zinc-100 font-bold bg-slate-900 p-1 rounded-sm text-md text-center  sm:text-2xl'>
            Oficina 2.0
          </span>
        </Link>
        <ul className='flex gap-6'>
          <Link to="/" className=' flex items-center justify-center gap-1 text-zinc-50 text-sm sm:text-md opacity-80 hover:opacity-100 font-bold'>
            <PlusCircleOutlined className='font-bold' />
            Cadastrar orçamento
          </Link>

          <Link to="/searchbudget" className= 'flex items-center justify-center text-sm gap-1 text-zinc-50 opacity-80 hover:opacity-100 font-bold sm:text-md'>
            Pesquisar orçamento
            <SearchOutlined className='font-bold' />
          </Link>
        </ul>
    </header>
  )
}
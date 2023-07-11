import { Link } from 'react-router-dom';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';

/*
  I used the following libraries:

  @ant-design/icons -  library for icons.
  react-router-dom -  library using 'Link' to navigate Front-end application routes.

*/

export function Header() {
  return (
    <header className='flex items-center justify-between bg-zinc-900 w-full h-16 gap-4 p-8'>
      <Link to="/" className='flex items-center'>
        <span className='text-zinc-100 font-bold text-md text-center sm:text-2xl'>
          Oficina 2.0
        </span>
      </Link>
      <ul className='flex gap-6'>
        <Link to="/" className='flex items-center justify-center gap-1 text-zinc-50 text-sm sm:text-md opacity-80 hover:opacity-100 font-bold'>
          <PlusCircleOutlined className='font-bold text-lime-500' />
          Cadastrar orçamento
        </Link>

        <Link to="/searchbudget" className='flex items-center justify-center text-sm gap-1 text-zinc-50 opacity-80 hover:opacity-100 font-bold sm:text-md'>
          Pesquisar orçamento
          <SearchOutlined className='font-bold text-lime-500' />
        </Link>
      </ul>
    </header>
  );
}

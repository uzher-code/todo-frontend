import Image from 'next/image';

const Header = () => {
  return (
    <div className="w-full bg-headerbg py-12 text-center">
      <h1 className="text-3xl font-bold inline-flex items-center justify-center gap-3">
        <img
          src="/logo.svg"
          alt="Logo"
          className="w-[22px] h-[36px]"
        />
        <span className="text-todo-blue">TODO</span>
        <span className="text-todo-purple"> APP</span>
      </h1>
    </div>
  )
}

export default Header;
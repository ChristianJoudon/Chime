import { FC } from 'react';

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => (
  <header className="bg-mint-500 text-white py-3 px-4 shadow-md">
    <h1 className="text-xl font-semibold">{title}</h1>
  </header>
);

export default Header;

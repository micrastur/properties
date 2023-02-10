import { memo } from 'react';

const Header = (props) => {
  return (
    <header className="flex flex-col md:flex-row justify-between">
      <h1 className="text-8xl">
        Posh Properties
      </h1>

      {props.children}
    </header>
  );
};

export default memo(Header);

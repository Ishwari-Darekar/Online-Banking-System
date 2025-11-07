import React from "react";
import { NavLink } from "react-router-dom";


const NavItem = ({icon, text, isOpen, setIsOpen, path}) => {
  return (
    //<div className='flex items-center gap-4 cursor-pointer w-full hover:text-blue-400'>
    <NavLink to={path} className="flex items-center gap-4 cursor-pointer w-full hover:text-blue-400"> 
        
        <span
            onClick={() =>  setIsOpen((prev) => !prev)}
             data-tooltip-id={!isOpen ? 
            'sidebar-tooltip' : undefined} 
            data-tooltip-content={!isOpen ? text: undefined}
            
            className='text-xl'>{icon}</span>
        {isOpen && (<div>{text}</div>)}
    </NavLink>
        //</div>
  );
};

export default NavItem
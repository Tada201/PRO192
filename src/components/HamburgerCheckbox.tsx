import React from 'react';

interface HamburgerCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const Switch = ({ checked, onChange }: HamburgerCheckboxProps) => {
  return (
    <div className="hamburger-wrapper">
      <div>
        <input
          className="check-icon"
          id="check-icon"
          name="check-icon"
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <label className="icon-menu" htmlFor="check-icon">
          <div className="bar bar--1" />
          <div className="bar bar--2" />
          <div className="bar bar--3" />
        </label>
      </div>
    </div>
  );
}

export default Switch;

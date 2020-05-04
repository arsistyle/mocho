import React from 'react';

const Bg = ({ open, setOpen, responsive }) => <div className={`bg ${open ? 'bg--active' : ''}`} open={open} onClick={() => (responsive ? setOpen(!open) : setOpen(false))}></div>;

export default Bg;

import './MenuBar.css'
import { TermSelector } from './TermSelector';
import { useState } from 'react';

export const MenuBar = ({ options, selection, setSelection, openModal }) => {
    return (
        <div className='menubar'>
            <TermSelector options={options} selection={selection} setSelection={setSelection} />
            <button className='schedule-btn' onClick={openModal}>Schedule</button>
        </div>
    );
};

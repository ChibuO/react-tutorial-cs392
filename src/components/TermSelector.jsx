import './CourseList.css'

const TermButton = ({ term, selection, setSelection }) => (
    <div>
        <input type="radio" id={term} className="term-select-btn" checked={term === selection} autoComplete="off"
            onChange={() => setSelection(term)} />
        <label data-cy={term} className="term-select-label" htmlFor={term}>
            {term}
        </label>
    </div>
);

export const TermSelector = ({ options, selection, setSelection }) => {
    return (
        <div className="term-selector-div">
            {options.map(term => <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />)}
        </div>
    );
};

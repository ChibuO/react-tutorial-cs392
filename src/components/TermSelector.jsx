import './CourseList.css'

const TermButton = ({ term, selection, setSelection }) => (
    <div>
        <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
            onChange={() => setSelection(term)} />
        <label className="btn btn-success mb-1 p-2" htmlFor={term}>
            {term}
        </label>
    </div>
);

export const TermSelector = ({ options, selection, setSelection }) => {
    return (
        <div className="btn-group">
            {options.map(term => <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />)}
        </div>
    );
};

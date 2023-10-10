import { useFormData } from './utilities/useFormData';
import './CourseForm.css';
import { useNavigate, useParams } from 'react-router-dom';
import { parseTime } from './utilities/time_conflict';

const validateDate = (days, timeRange) => {
  const repeatedDays = days.split('').filter((num, index) => days.indexOf(num) !== days.lastIndexOf(num) && index <= days.indexOf(num))
  if (repeatedDays.length > 0) return 'no repeated days';
  const [startTime, endTime] = parseTime(timeRange);
  if (endTime - startTime <= 0) return 'invalid time range';
  return '';
}

const validateUserData = (key, val) => {
  switch (key) {
    case 'title':
      return /(^\w\w)/.test(val) ? '' : 'must be least two characters';
    case 'meets':
      if (val === '') return '';

      const regexp = /(^(\w+)\s(\d+:\d\d-\d+:\d\d))/;
      if (regexp.test(val)) {
        const match = val.match(regexp);
        return validateDate(match[2], match[3]);
      } else {
        return 'must contain days and start-end, e.g., MWF 12:00-13:20';
      }
    default: return '';
  }
};

const InputField = ({ name, text, state, change }) => (
  <div className="entry-div">
    <label htmlFor={name} className="entry-label">{text}</label>
    <input className={`text-input ${state.errors?.[name] ? 'error-input' : ''}`} id={name} name={name}
      defaultValue={state.values?.[name]} onChange={change} />
    <p className="invalid-feedback">{state.errors?.[name]}</p>
  </div>
);

const ButtonBar = ({ disabled }) => {
  const navigate = useNavigate();
  return (
    <div className="button-bar">
      <button type="button" className="courseform-btn" onClick={() => navigate(-1)}>Cancel</button>
      <button type="submit" className="courseform-btn" disabled={disabled}>Submit</button>
    </div>
  );
};

export const CourseForm = ({ courses }) => {
  const edit_id = useParams()["id"];
  const [course_id, courseInfo] = courses.filter((course) => (course[0] === edit_id))[0];
  // const [update, result] = useDbUpdate(`/users/${user.id}`);
  const [state, change] = useFormData(validateUserData, courseInfo);
  const submit = (evt) => {
    evt.preventDefault();
    if (!state.errors) {
      // update(state.values);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="course-form">
      <h2>Course Edit: {course_id}</h2>
      <InputField name="title" text="Course Title" state={state} change={change} />
      <InputField name="meets" text="Meeting Times" state={state} change={change} />
      <ButtonBar />
    </form>
  )
};

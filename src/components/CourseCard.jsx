import './CourseList.css'
import { RiEdit2Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom';

export const CourseCard = ({ id, course, selected, disabled, toggleSelected, profile }) => {
    return (
        <div className={`card-container ${selected.includes(id) ? 'container-selected' : (disabled.includes(id) ? 'container-disabled' : '')}`}>
            {profile?.isAdmin ? <Link to={`/course-form/${id}/edit`}><RiEdit2Fill className="edit-dot" /></Link> : null}
            <div className={`class-card ${selected.includes(id) ? 'selected-card' : (disabled.includes(id) ? 'disabled-card' : 'unselected-card')}`} onClick={() => toggleSelected(id)} >
                <div>
                    <h3 className='class-card-title'>{course.term} CS{course.number}</h3>
                    <p className='class-card-classname'>{course.title}</p>
                </div>
                <div>
                    <hr />
                    <p className='class-card-time'>{course.meets}</p>
                </div>
            </div>
        </div>

    );
};

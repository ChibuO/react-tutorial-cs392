import './CourseList.css'

export const CourseCard = ({ id, course, selected, toggleSelected}) => {
    return (
        <div className={`class-card ${selected.includes(id) ? 'selected-card' : 'unselected-card'}`} onClick={() => toggleSelected(id)}>
            <div>
                <h3 className='class-card-title'>{course.term} CS{course.number}</h3>
                <p className='class-card-classname'>{course.title}</p>
            </div>
            <div>
                <hr />
                <p className='class-card-time'>{course.meets}</p>
            </div>
        </div>

    );
};

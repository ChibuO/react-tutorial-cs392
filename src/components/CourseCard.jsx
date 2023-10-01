import './CourseList.css'

export const CourseCard = ({ id, course, selected, toggleSelected}) => {
    return (
        <div className={`class-card ${selected.includes(id) ? 'selected-card' : 'unselected-card'}`} onClick={() => toggleSelected(id)}>
            <div className='card-top'>
                <h3 className='card-title'>{course.term} CS{course.number}</h3>
                <p className='card-classname'>{course.title}</p>
            </div>
            <div className='card-bottom'>
                <hr />
                <p className='card-time'>{course.meets}</p>
            </div>
        </div>

    );
};

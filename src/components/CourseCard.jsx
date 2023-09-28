import './CourseList.css'

export const CourseCard = ({ course }) => {
    return (
        <div className='class-card'>
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

import './CourseList.css'
import { CourseCard } from './CourseCard';

export const CourseList = ({ courses, selected, toggleSelected}) => {
    return (
        <div className='class-list'>
            {Object.entries(courses).map(([id, course]) => 
                <CourseCard key={id} id={course[0]} course={course[1]} selected={selected} toggleSelected={toggleSelected}/>)}
        </div>
    );
};

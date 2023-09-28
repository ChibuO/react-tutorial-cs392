import './CourseList.css'
import { CourseCard } from './CourseCard';

export const CourseList = ({ courses }) => {
    return (
        <div className='class-list'>
            {Object.entries(courses).map(([id, course]) =>
                <CourseCard key={id} course={course} />)}
        </div>
    );
};

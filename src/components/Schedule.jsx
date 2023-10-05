import './Modal.css';

export const Schedule = ({ selectedCourses }) => {
    return <div className="schedule-modal">
        {
            selectedCourses.length === 0
                ? <p>No Courses selected. Select a course to add it to your schedule.</p>
                : <table>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Title</th>
                            <th>Meets</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(selectedCourses).map(([id, course]) =>
                            <tr key={id}>
                                <td>CS{course[1].number}</td>
                                <td>{course[1].title}</td>
                                <td>{course[1].meets}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
        }
    </div>
};
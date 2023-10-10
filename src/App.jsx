import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Banner } from './components/Banner'
import { CourseList } from './components/CourseList'
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import { MenuBar } from './components/MenuBar';
import { Modal } from './components/Modal';
import { Schedule } from './components/Schedule';
import { getDisabled } from './utilities/time_conflict';
import { CourseForm } from './CourseForm';


const queryClient = new QueryClient();
const termOptions = ["Fall", "Winter", "Spring"];

const Main = () => {
  const [termSelection, setSelection] = useState(termOptions[0]);
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [disabledCourses, setDisabledCourses] = useState([]);
  const [openSchedule, setOpenSchedule] = useState(false);

  if (error) return <h1>Error loading course data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading course data...</h1>;
  if (!data) return <h1>No course data found</h1>;

  let courses = Object.entries(data.courses).filter(course => course[1].term === termSelection);

  const toggleSelected = (item) => {
    if (disabledCourses.includes(item)) return;
    if (!selectedCourses.includes(item)) {
      setDisabledCourses(getDisabled([...selectedCourses, item], courses));
      setSelectedCourses([...selectedCourses, item]);
    } else {
      setDisabledCourses(getDisabled(selectedCourses.filter(x => x !== item), courses));
      setSelectedCourses(selectedCourses.filter(x => x !== item));
    }
  };

  const openModal = () => setOpenSchedule(true);
  const closeModal = () => setOpenSchedule(false);

  return <div className="App">
    <Modal title={`${termSelection} Class Schedule`} open={openSchedule} close={closeModal}>
      <Schedule selectedCourses={courses.filter(course => selectedCourses.includes(course[0]))} />
    </Modal>
    <Banner title={data.title} />
    <Router>
      <Routes>
        <Route path="/" element={<>
          <MenuBar options={termOptions} selection={termSelection} setSelection={setSelection} openModal={openModal} />
          <CourseList courses={courses} selected={selectedCourses} disabled={disabledCourses} toggleSelected={toggleSelected} />
        </>} />
        <Route path="/course-form/:id/edit" element={<CourseForm courses={Object.entries(courses).map(([id, course]) => course)} />} />
      </Routes>
    </Router>
  </div>
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
};

export default App;

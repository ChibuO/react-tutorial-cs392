import { useState } from 'react';
import { Banner } from './components/Banner'
import { CourseList } from './components/CourseList'
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import { MenuBar } from './components/MenuBar';
import { Modal } from './components/Modal';
import { Schedule } from './components/Schedule';


const queryClient = new QueryClient();
const termOptions = ["Fall", "Winter", "Spring"];

const Main = () => {
  const [termSelection, setSelection] = useState(termOptions[0]);
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [openSchedule, setOpenSchedule] = useState(false);

  if (error) return <h1>Error loading course data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading course data...</h1>;
  if (!data) return <h1>No course data found</h1>;

  let courses = Object.entries(data.courses).filter(course => course[1].term === termSelection);

  const toggleSelected = (item) => {
    setSelectedCourses(selectedCourses.includes(item)
      ? selectedCourses.filter(x => x !== item)
      : [...selectedCourses, item]
    )
  };

  const openModal = () => setOpenSchedule(true);
  const closeModal = () => setOpenSchedule(false);

  return <div className="App">
    <Modal title={`${termSelection} Class Schedule`} open={openSchedule} close={closeModal}>
      <Schedule selectedCourses={courses.filter(course => selectedCourses.includes(course[0]))} />
    </Modal>
    <Banner title={data.title} />
    <MenuBar options={termOptions} selection={termSelection} setSelection={setSelection} openModal={openModal} />
    <CourseList courses={courses} selected={selectedCourses} toggleSelected={toggleSelected} />
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

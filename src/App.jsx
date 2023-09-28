import { useState } from 'react';
import { Banner } from './components/Banner'
import { CourseList } from './components/CourseList'
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import { TermSelector } from './components/TermSelector';

const queryClient = new QueryClient();
const termOptions = ["Fall", "Winter", "Spring"];

const Main = () => {
  const [termSelection, setSelection] = useState(termOptions[0]);
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading course data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading course data...</h1>;
  if (!data) return <h1>No course data found</h1>;

  let courses = Object.entries(data.courses).map(entry => entry[1]).filter(course => course.term === termSelection)

  return <div className="App">
    <Banner title={data.title} />
    <TermSelector options={termOptions} selection={termSelection} setSelection={setSelection} />
    <CourseList courses={courses} />
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

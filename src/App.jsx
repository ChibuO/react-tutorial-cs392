import { useState } from 'react';
import {Banner} from './components/Banner'
import {CourseList} from './components/CourseList'
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';

const Main = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading course data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading course data...</h1>;
  if (!data) return <h1>No course data found</h1>;

  return <CourseList courses={data.courses} />;
}

const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="App">
      <Banner title={schedule.title} />
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </div>
  );
};

export default App;

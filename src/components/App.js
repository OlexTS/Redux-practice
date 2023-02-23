import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTasks } from "redux/operations";
import { Layout } from "components/Layout/Layout";
import { AppBar } from "components/AppBar/AppBar";
import { TaskForm } from "components/TaskForm/TaskForm";
import { TaskList } from "components/TaskList/TaskList";
import { selectIsLoading, selectError } from "redux/selectors";

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTasks())
  },[dispatch])

   return (    
    <Layout>
      <AppBar />
       <TaskForm />
        {isLoading && !error && <b>Request in progress...</b>}
      <TaskList />
    </Layout>
  );
};


// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getTasks } from 'redux/selectors';
// import { fetchTasks } from 'redux/operations';

// export const App = () => {
//   const dispatch = useDispatch();
//   const { items, isLoading, error } = useSelector(getTasks);

//   useEffect(() => {
//     dispatch(fetchTasks());
//   }, [dispatch]);

//   return (
//     <div>
//       {isLoading && <p>Loading tasks...</p>}
//       {error && <p>Error</p>}
//       {items.length > 0 && JSON.stringify(items, null, 2)}
//     </div>
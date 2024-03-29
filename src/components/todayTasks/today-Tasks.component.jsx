import React, { useContext, useEffect, useState } from 'react'
import { getTasksForToday } from '../../utils/task.utils';
import ListOfTasksCard from '../upcomingTasks/ListOfTasksCard.component';
import { TasksContext } from '../../contexts/tasks.context';
import { SearchContext } from '../../contexts/search.context';
import { TaskFilter } from '../../contexts/filter.context';
import ComputerTitleCard from '../category-title-card/computer-title-card';

const TodayTasks = () => {
  const {state} = useContext(TasksContext);
  const {state: filterState} = useContext(TaskFilter);
  const {state: searchState} = useContext(SearchContext);
  const [todayTasks, setTodayTasks] = useState([])
  useEffect(() => {
    setTodayTasks(getTasksForToday(state.tasks, filterState.listFilter, searchState.search));
  }, [state.tasks, filterState, searchState])

  return (
    <div className='sm: mx-4'>
      <ComputerTitleCard name={"Today"} numberOfNotifictaions={todayTasks.length > 0 ? todayTasks.length : "-"} />
      <ListOfTasksCard name={"Today"} tasks={todayTasks}/>
    </div>
  )
}

export default TodayTasks

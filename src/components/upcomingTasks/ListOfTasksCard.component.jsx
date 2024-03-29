import React from 'react'
import NewTaskButton from '../task-bar/new-task-button/new-task-button.component'
import TaskElement from '../task-bar/taskElement.component'
import { useSwipeable } from 'react-swipeable';



const ListOfTasksCard = ({tasks, name, addForTommorow, late}) => {

  return (
    <div className='border-2 border-bordercolor rounded-xl p-2 px-4 my-4 overflow-y-scroll max-h-96 overflow-x-hidden 
    sm:max-h-[40rem]'>
      <div className={`pb-2 font-semibold text-xl text-textcolor ${late ? 'border-b-2 border-bordercolor' : ''}`}><p>{name}</p></div>
      
      <div className='flex flex-col'>
        {!late && <NewTaskButton addForTommorow={addForTommorow}/>}
        <div className='my-2'>
          {tasks.map((task) => (
            task 
            ?
            <TaskElement key={task.id} taskName={task.taskName} id={task.id} listName={task.list} date={task.date}/> 
            :
            null
          ))}
          
        </div>
      </div>
    </div>
  )
}

export default ListOfTasksCard

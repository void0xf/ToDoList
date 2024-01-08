import React, { useContext, useEffect, useState } from 'react'
import { useTaskContext } from '../../../contexts/tasks.context';
import { v4 as uuidv4 } from 'uuid';
import { TaskFilter } from '../../../contexts/filter.context';
import axios from 'axios';
import { RiBardFill } from "react-icons/ri";
import { Plus } from 'lucide-react';
import { askAi } from '../../../suggestionAI/data';


const NewTaskButton = ({addForTommorow}) => {
  const uniqueId = uuidv4();
  const { state, dispatch } = useTaskContext();
  const {state:filterState} = useContext(TaskFilter)
  const [ counter, setCounter ] = useState(0);
  const [ inputValue, setInputValue] = useState('')
  const [ oldSuggestions, setOldSuggestions] = useState([]);
  const [ isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter' && inputValue.trim() !== '') {
      event.preventDefault();
      addNewTask();
      setInputValue('');
    }
  }

  const handleAISuggestion = async () => {
    setIsWaitingForResponse(true);
    const prompt = filterState.listFilter == 'None' 
    ? `Suggest Me RandomTask suggest 1 task based on that REPLY ONLY WITH TASK WITH NO SPECIAL CHARACTERS MAX CHARACTERS IS 20 HERE IS THE TASKS I ALREADY HAVE ${oldSuggestions}`
    : `Im Making ToDoList Called ${filterState.listFilter} suggest 1 task based on that REPLY ONLY WITH TASK IN PLAIN TEXT WITH NO SPECIAL CHARACTERS MAX CHARACTERS IS 20 LAST RESPOSNE HERE IS THE TASKS I ALREADY HAVE ${oldSuggestions}`
    console.log(oldSuggestions);
    const newSuggestion = await askAi(prompt);
    setOldSuggestions((prev) => [...prev, newSuggestion])
    setIsWaitingForResponse(false);
    setInputValue(oldSuggestions[oldSuggestions.length - 1])
    
  }


  const addNewTask = () => {
    const dateToSet =  new Date();
    if (addForTommorow) {
      dateToSet.setDate(dateToSet.getDate() + 1); 
    }
 
    const newTask = {
      id: uniqueId,
      taskName: inputValue,
      description: '',
      date: dateToSet,
      list: filterState.listFilter,
      createDate: new Date(),
      doneDate: null,
      tags: [],
    };
  
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className=''>
      <div className="relative w-full">
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleKeyPress(e)}
          placeholder='Add New Task'
          className='pl-10 pr-4 py-2 border rounded-lg border-bordercolor focus:outline-acent w-full placeholder-grey-200 border-opacity-40 bg-bkg'
        />
        </form>
       <div class="absolute inset-y-0 left-0 pl-3  
                    flex items-center  
                    pointer-events-none"> 
             <Plus color='grey'/>
      </div>
        <div className='absolute right-3 top-3'>
          <button onClick={() => {handleAISuggestion()}}>
            <RiBardFill className={`transition-colors duration-700 ${isWaitingForResponse ? 'text-acent' : 'text-gray-600'}`} />
          </button>
        </div> 
      </div>
      

    </div>
  );
}

export default NewTaskButton;
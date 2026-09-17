import React, { useState } from 'react'
import RateLimitedUI from '../components/RateLimitedUI';
import TaskCard from '../components/TaskCard';
import { useEffect } from 'react';
import api from "../lib/axios";
import toast from "react-hot-toast"
import TasksNotFound from "../components/TasksNotFound";
import Sidebar from '../components/Sidebar';

const TaskPage= () => {
  const [isRateLimited, setisRateLimited] = useState(false);


  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
  
    const fetchTasks = async ()=>{
      try{
        const res = await api.get("/tasks");
        console.log(res.data);
        setTask(res.data)
        setisRateLimited(false)
     
      }catch(error){
        console.log("Error fetching tasks");
        console.log(error);
        if(error.response?.status === 429){
          setisRateLimited(true)
        }
        else{
          toast.error("failed to load tasks")
        }
      }
      finally{
        setLoading(false);     
       }
    };
        fetchTasks();
       },[]);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
      
        {isRateLimited && <RateLimitedUI />}
        <div className="max-w-7xl mx-auto p-4 mt-6 w-full">
          {loading && <div className="text-center text-primary py-10">Loading tasks...</div>}
          {task.length === 0 && !isRateLimited && !loading && <TasksNotFound />}

          {task.length > 0 && !isRateLimited && (
            // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            //   {task.map((task) => (
            //     <TaskCard key={task._id} task={task} setTasks={setTask} />
            //   ))}
            // </div>
        <ul className="list bg-base-100 rounded-box shadow-md">
 <li className="p-4 pb-2 text-3xl font-bold text-base-content">
  My Tasks
</li>

  {task.map((task) => (
    <TaskCard
      key={task._id}
      task={task}
      setTasks={setTask}
    />
  ))}
</ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskPage
    

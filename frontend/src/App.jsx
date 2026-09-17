import { Route,Routes } from 'react-router'
import CreateNotePage from './pages/CreateNotePage'  
import Notedetail from './pages/Notedetail'
import Dashboard from './pages/Dashboard'
import NotePage from './pages/NotePage'
import CreateTaskPage from './pages/CreateTaskPage'
import TaskPage from './pages/TaskPage'
import BookmarksPage from './pages/BookmarksPage'

const App = () => { 
  return (
    <div data-theme="synthwave">

      <Routes>
        <Route path ="/" element ={<NotePage/>}/> 
        <Route path ="/create" element ={<CreateNotePage/>}/>
        <Route path ="/note/:id" element ={<Notedetail/>}/>
        <Route path ="/dashboard" element ={<Dashboard/>}/> 
        <Route path ="/createtask" element ={<CreateTaskPage/>}/>
        <Route path ="/taskpage" element ={<TaskPage/>}/> 
        <Route path = "/bookmarks" element = {<BookmarksPage/>}/>



      </Routes>
      
    </div>
  )
}

export default App;
  
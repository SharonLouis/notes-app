import { Route,Routes } from 'react-router'
import Homepage from './pages/Homepage'
import CreatePage from './pages/CreatePage'  
import Notedetail from './pages/Notedetail'
 


const App = () => { 
  return (
    <div data-theme="synthwave">

      <Routes>
        <Route path ="/" element ={<Homepage/>}/> 
        <Route path ="/create" element ={<CreatePage/>}/>
        <Route path ="/note/:id" element ={<Notedetail/>}/>
      </Routes>
      
    </div>
  )
}

export default App;
  
import React from 'react'
import Questions from './containers/Questions/Questions'
import Choose from './containers/Choise/Choose'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Finish from './components/finish/Finish'
export default function App() {
  return (
   <div className="App">
    <BrowserRouter>
     <Switch>
       <Route path="/" exact component={Choose} />
       <Route path="/game" exact component={Questions} />
       <Route path="/result" component={Finish} />
     </Switch>
   </BrowserRouter>
   </div>

  )
}


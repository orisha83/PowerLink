import {Link, Switch,Route, useHistory,Redirect} from 'react-router-dom'
import {useState, useEffect, useContext} from 'react'
import TeamPageComp from './teamPage'
import TeamsPageComp from './teamsPage'

function MainPageComp()
{



    return(
        <div >
            <h1>
                Welcome to Ori's succer website</h1>
            <Redirect to="/team" />
            <Switch>
                <Route exact path='/team' component={TeamsPageComp}/>
                <Route path='/team/:id' component={TeamPageComp}/>
            </Switch>
        </div>
        
    )
}

export default MainPageComp;
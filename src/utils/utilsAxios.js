import axios from 'axios'

const getPlayersFromTeam = async function(team_name)
{
    let DataArr = []
    try{
        let response = await axios.get('https://www.thesportsdb.com/api/v1/json/40130162/searchplayers.php?t=' + team_name)
        DataArr = response.data
        return DataArr
    }catch(error)
    {
        console.error(error);
    }
        

}
const getTeamDataFromServer = async function (team_id) 
{
    let DataArr = []
    try{
        let response = await axios.get('https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=' + team_id) 
        DataArr = response.data
        return DataArr
    }catch(error)
    {
        console.error(error);
    }
    
    
}
const getTeamsDataFromServer = async function () 
{
    let DataArr = []
    try{
        let response = await axios.get('https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=English%20Premier%20League')
        DataArr = response.data       
        return DataArr 
    }catch(error)
    {
        console.error(error);
    }
          
}

export default {getTeamsDataFromServer, getTeamDataFromServer, getPlayersFromTeam};

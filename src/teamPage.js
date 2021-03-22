import {useState, useEffect, useRef} from 'react'
import utilsAxios from './utils/utilsAxios'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 800,
    },
    image: {
      width: 200,
      height: 200,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    table: {
        minWidth: 650,
      },
  }));

function TeamPageComp(props)
{
    const classes = useStyles();
    const [teamData, setTeamData] = useState()
    const [used, setUsed] = useState(false)
    const [used2, setUsed2] = useState(false)
    const [used3, setUsed3] = useState(false)
    const [link, setLink] = useState()
    const [players, setPlayers] = useState()
    const [rows, setrows] = useState([])
    const [table, setTable] = useState()

    const getTeamData = async () => 
    {
        let teamArr = await utilsAxios.getTeamDataFromServer(props.match.params.id)
        setTeamData(teamArr)
    }

    const createPage = async () =>
    {
        let linkURL = teamData.teams[0].strWebsite
        let fullUrl = 'http://' + linkURL
        let linkToWebsite = <a href={fullUrl}>{linkURL}</a>
        setLink(linkToWebsite)
    }

    const getPlayersData = async () =>
    {
        let playersData = await utilsAxios.getPlayersFromTeam(teamData.teams[0].strTeam)
        setPlayers(playersData)
    }

    const createData = (playerName, playerNumber) =>
    {
        return { playerName, playerNumber};
    }

    const createTable = () =>
    {
        let table = <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Player Name</TableCell>
                        <TableCell align="right">Player Number</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row,index) => {
                            return  <TableRow key={row.playerName}>
                                        <TableCell component="th" scope="row">{row.playerName}</TableCell>
                                        <TableCell align="right">{row.playerNumber}</TableCell>
                                    </TableRow>}
                                )}
                    </TableBody>
                </Table>
            </TableContainer>

        setTable(table)
    } 

    const createDataTable = () =>
    {
        let lrows = []
        players.player.forEach(function(element) 
        {      
            let lrow = createData(element.strPlayer, element.strNumber)
            lrows.push(lrow)
        });

        setrows(lrows)
    }

    useEffect( async () => {
        getTeamData()
    },[])

    const initialRender = useRef(true);
    useEffect( async () => {
        if(initialRender.current)
    {
      initialRender.current = false;
    }
    else
    {
        getPlayersData()
        createPage()
        setUsed(true)
    }
    },[teamData])

    const initialRender2 = useRef(true);
    useEffect(() => {
        if(initialRender2.current)
    {
      initialRender2.current = false;
    }
    else
    {
        createDataTable()
        setUsed2(true)
    }
    },[players])

    const initialRender3 = useRef(true);
    useEffect(() => {
        if(initialRender3.current)
    {
      initialRender3.current = false;
    }
    else
    {
        createTable()
        setUsed3(true)
    }
    },[rows])

    return(
        
        <div className={classes.root}>
            {teamData &&
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item container direction="row" justify="space-around" alignItems="flex-start">
                <Grid item >
                    <h1 gutterBottom variant="subtitle1">
                        {teamData.teams[0].strTeam}
                    </h1>
                </Grid>
                <Grid item>
                <ButtonBase className={classes.image}>
                    <img className={classes.img} alt="complex" src={teamData.teams[0].strTeamLogo}/>
                </ButtonBase>
                </Grid>
                </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                founded : {teamData.teams[0].intFormedYear}
                </Grid>
                <Grid item xs>
                Link to team website: {link}
                </Grid>
                <Grid item xs>
                {table}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>}
      </div>
    )
}

export default TeamPageComp;
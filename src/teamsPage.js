import {Link, useHistory} from 'react-router-dom'
import {useState, useEffect, useRef} from 'react'
import utilsAxios from './utils/utilsAxios'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function TeamsPageComp()
{
    const classes = useStyles();
    const [TeamsData,setTeamsData] = useState()
    const [rows, setrows] = useState([])
    const [used, setUsed] = useState(false)
    const [used2, setUsed2] = useState(false)
    const [used3, setUsed3] = useState(false)
    const [table, setTable] = useState()
    const [linkArray, setLinkArray] = useState()
    
    const history = useHistory()

    const createData = (Name, Founded, Stadium, team_id) =>
    {
        return { Name, Founded, Stadium, team_id};
    }

    const getTeamsData = async () =>
    {
        let res = await utilsAxios.getTeamsDataFromServer()
        setTeamsData(res)
    }

    const createDataTable = () =>
    {
        let lrows = []
        TeamsData.teams.forEach(function(element) 
        {      
            let lrow = createData(element.strTeam, element.intFormedYear, element.strStadium, element.idTeam)
            lrows.push(lrow)
        });

        console.log(lrows)
        setrows(lrows)
    }


    const handleRowClick = (row) => 
    {
        history.push(`/team/${row.team_id}`);
    } 

    const createTable = () =>
    {
        let table = <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Founded</TableCell>
                        <TableCell align="right">Stadium</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row,index) => {
                            return  <TableRow onClick={() => {handleRowClick(row)}} key={row.Name}>
                                        <TableCell component="th" scope="row">{row.Name}</TableCell>
                                        <TableCell align="right">{row.Founded}</TableCell>
                                        <TableCell align="right">{row.Stadium}</TableCell>
                                    </TableRow>}
                                )}
                    </TableBody>
                </Table>
            </TableContainer>

        setTable(table)
    } 

    useEffect( async () => {
        getTeamsData()
    },[])

    const initialRender = useRef(true);
    useEffect(() => {
        if(initialRender.current)
    {
      initialRender.current = false;
    }
    else
    {
        createDataTable()
        setUsed(true)
    }
    },[TeamsData])

    
    const initialRender2 = useRef(true);
    useEffect(() => {
        if(initialRender2.current)
    {
      initialRender2.current = false;
    }
    else
    {
        createTable()
        setUsed2(true)
    }
    },[rows])

    return(
        <div >
            {table}
            </div>
        
    )
}

export default TeamsPageComp;
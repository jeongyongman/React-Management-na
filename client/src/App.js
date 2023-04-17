import React, { Component } from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import { Paper } from '@mui/material'
import { Table } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableBody } from '@mui/material';
import { CircularProgress } from '@mui/material';

// import { makeStyles } from '@mui/material';

// const styles = theme =>({
// const useStyles = makeStyles(theme => ({
//   root: {
//     width : '100%',
//     marginTop: theme.spacing(3),
//     // marginTop: theme.spacing.unit * 3,
//     overflowX: "auto"
//   },
//   table:{
//     minWidth:1080,
//   }
// }));

class App extends Component {

  state = {
    customers: "",
    completed: 0
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }
  
  render() {
    // const { classes } = this.props;
    return (
      <div>
        <Paper sx={{width : '100%', mt: 3, overflowX: "auto"}}>
          <Table sx={{minWidth: '1080px'}}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? this.state.customers.map(c => { return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />);
            }) : 
            <TableRow>
              <TableCell colSpan="6" align="center">
                {/* <CircularProgress sx={{m: 2}} variant="determinate" value={this.state.completed}/> */}
                <CircularProgress sx={{m: 2}} value={this.state.completed}/>
              </TableCell>
            </TableRow>
            }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd/>
      </div>

    );
  }
}

// export default withStyles(styles)(App);
export default App;

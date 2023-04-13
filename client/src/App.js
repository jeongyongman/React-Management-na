import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';
import { Paper } from '@mui/material'
import { Table } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableBody } from '@mui/material';

// const styles = theme =>({
//   root: {
//     width : '100%',
//     // marginTop: theme.spacing(3),
//     marginTop: theme.spacing.unit * 3,
//     overflowX: "auto"
//   },
//   table:{
//     minWidth:1080,
//   }
// })

class App extends Component {

  state = {
    customers: ""
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }
  
  render() {
    const { classes } = this.props;
    return (
      <Paper sx={{width : '100%', overflowX: "auto"}}>
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
          }) : ""}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default App;

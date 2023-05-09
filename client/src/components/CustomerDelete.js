import React, { Component } from 'react';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';

class CustomerDelete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  deleteCustomer(id){
    const url = '/api/customers/' + id;
    fetch(url, {
      method: 'DELETE'
    });
    this.props.stateRefresh();
  }

  handleClickopen = () => {
    this.setState({
      open: true
    });
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }
  
  render() {
    return (
      <div>
        <Button variant='contained' color='secondary' onClick={this.handleClickopen}>삭제</Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle onClose={this.handleClose}>
            삭제 경고
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              선택한 고객 정보가 삭제됩니다.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='primary' onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</Button>
            <Button variant='outlined' color='primary' onClick={this.handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CustomerDelete;
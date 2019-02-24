import React, {Component} from 'react';
import styled from 'styled-components';

import {Radio} from 'antd';

const RadioGroup = Radio.Group

export default class Payment extends Component {
  state = {
    paymentType: 1
  }

  onChange = (e) => {
    this.setState({
      paymentType: e.target.value,
    });
  }

  render() {
    const {paymentType} = this.state

    const radioStyle = {
      display: 'block',
      height: '40px',
      lineHeight: '40px',
    };

    return (
      <Wrapper>
        <h1>Metode Pembayaran</h1>
        <RadioWrapper>
          <RadioGroup onChange={this.onChange} value={paymentType}>
            <Radio style={radioStyle} value={1}>DANA</Radio>
            <Radio style={radioStyle} value={2}>Saldo</Radio>
            <Radio style={radioStyle} value={3}>Visa / MasterCard</Radio>
          </RadioGroup>
        </RadioWrapper>
      </Wrapper>
    )
  }
}

const Wrapper =  styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    padding: 20px;
    border-bottom: 1px solid #ddd;
    background: #fff;
  }
`

const RadioWrapper = styled.div`
  padding: 20px;
`

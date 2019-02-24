import React, { Component } from 'react';
import {func, object} from 'prop-types';
import styled from 'styled-components';

import { Checkbox } from 'antd';

import TrashIcon  from '../svg/trash.svg';
import IndomiePhoto from '../img/indomie.png';
import TehKotak from '../img/tehkotak.jpeg';

export default class Item extends Component {
  static propTypes = {
    item: object,
    onAddQty: func,
    onDeleteItem: func,
    onCheckedItem: func
  }

  render() {
    const {item, onDeleteItem, onAddQty, onCheckedItem} =  this.props;

    return (
      <Wrapper checked={item.checked}>
        <SectionOne>
          <Product>
            <Checkbox
              checked={item.checked}
              onChange={(e) => onCheckedItem(e.target.checked, item.id)}
              style={{marginRight: '20px'}}
            />
            <div>
              <h3>{item.name}</h3>
              <span>{`Rp ${item.price * item.qty}`}</span>
            </div>
          </Product>
          <ProductImage>
            <img src={item.id === 'indomie-goreng' ? IndomiePhoto : TehKotak} alt="foto produk"/>
          </ProductImage>
        </SectionOne>
        <SectionTwo>
          <InputNumber>
            <span onClick={() => onAddQty((item.qty !== 0 ? item.qty - 1 : 0),item.id)}>-</span>
            {/* <input type="number" value={item.qty}/> */}
            <span>{item.qty}</span>
            <span onClick={() => onAddQty((item.qty + 1),item.id)}>+</span>
          </InputNumber>
          <img src={TrashIcon} alt="trash icon" onClick={() => onDeleteItem(item.id)}/>
        </SectionTwo>
      </Wrapper>
    )
  } 
} 

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #fff;
  margin-bottom: 10px;

  ${props => `
    opacity: ${props.checked ? "1" : "0.5"}
  `}
`

const SectionOne = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`

const ProductImage = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  img {
    width: auto;
    height: 100%;
  }
`

const Product =  styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;

  input {
    margin-right: 10px;
  }

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
  }

  span {
    font-weight: 600;
    color: #fd4060;
  }
`

const SectionTwo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  img {
    width: 18px;
    height: auto;
  }
`

const InputNumber = styled.div`
  display: flex;
  flex: row;
  margin-left: 35px;
  border: 1px solid #e7e7e7;

  span {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: #fafafa;
    color: #a3a3a3;
    width: 25px;
    height: 25px;

    :nth-child(2) {
      background: #ffffff;
      border-right: 1px solid #e7e7e7;
      border-left: 1px solid #e7e7e7;
    }
  }

  input {
    border: 1px solid #e7e7e7;
    width: 25px;
    height: 25px;
  }
`


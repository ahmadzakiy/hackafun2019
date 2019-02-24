import React, { Component } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import {reactLocalStorage} from './helpers/localStorage';

import Item from './components/Item';
import Payment from './components/Payment';

import ArrowLeft from './svg/arrow-left.svg';
import Store from './svg/home.svg';

import DataItems from './data.json';

export default class App extends Component {
  state = {
    mitra: "Kios PCV",
    items: []
  }

  componentWillMount() {
    const queryItem = queryString.parse(window.location.search);
    const findItem = DataItems.find(c => {
      return c.id === queryItem.id
    })

    const getItems = reactLocalStorage.getObject('items')
    const allItems = getItems.length !== 0 ? getItems.filter(c => c.id !== queryItem.id).concat([findItem]) : [findItem]

    this.setState({
      items: allItems
    })
  }

  handleAddQty = (newQty, id) => {
    const {items} =  this.state;

    const findItem = items.find(c => c.id === id)
    findItem.qty = newQty;

    this.forceUpdate()
  }

  handleCheckedItem = (checked, id) => {
    const {items} =  this.state;

    const findItem = items.find(c => c.id === id)
    findItem.checked = checked;

    this.forceUpdate()
  }

  handleDeleteItem = id => {
    this.setState({
      items: this.state.items.filter(c => c.id !== id) 
    });
  };

  handleTotalPrice = () => {
    const {items} = this.state;
    
    let i = 0;
    let calculatePrice = 0;

    for(i; i < items.length; i++) {
      if (items[i].checked) {
        calculatePrice += items[i].price * items[i].qty 
      }
    }

    return calculatePrice;
  }

  render() {
    const {mitra, items} =  this.state;
    const totalPrice = this.handleTotalPrice()

    reactLocalStorage.setObject('items', items)

    console.log('ITEMS: ', items)

    return (
      <Wrapper>
        <Header>
          <img src={ArrowLeft} alt="arrow icon"/>
          <h1>Keranjang Belanja</h1>
        </Header>
        <Mitra>
          <img src={Store} alt="store icon"/>
          <h3>{mitra}</h3>
        </Mitra>
        {
          items.map((item, index) => {
            return(
              <Item 
                key={index} 
                item={item} 
                onAddQty={this.handleAddQty} 
                onDeleteItem={this.handleDeleteItem}
                onCheckedItem={this.handleCheckedItem}  
              />
            )
          })
        }
        <Payment/>
        <Footer>
          <TotalPrice>
            <h4>Total Tagihan</h4>
            <span>{`Rp ${totalPrice}`}</span>
          </TotalPrice>
          <ButtonPay onClick={() => alert('Terima kasih sudah belanja di BukaLapak :)')}>Bayar</ButtonPay>
        </Footer>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
`

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  background: #fff;

  h1 {
    margin: 0;
    font-weight: 400;
    font-size: 18px;
  }

  img {
    position: absolute;
    left: 10px;
  }
`

const Mitra = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(243,99,138,1) 0%, rgba(250,115,120,1) 100%);
  color: #fff;
  padding: 20px;

  h3 {
    margin: 0;
    font-weight: 400;
    font-size: 16px;
    color: #fff;
  }

  img {
    margin-right: 30px;
  }
`

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`

const TotalPrice = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    margin: 0;
    font-size: 14px;
  }

  span {
    font-weight: 600;
    color: #fd4060;
  }
`

const ButtonPay = styled.div`
  margin: 5px;
  padding: 5px 50px;
  color: #fff;
  background: #fd4060;
  border-radius: 4px;
`


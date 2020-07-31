import React, { Component } from 'react';
import { Container, Header, Content, ListItem, CheckBox, Text, Body, View } from 'native-base';
export default class FiltroScreen extends Component {


    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.state = {
             checked: true,
             Ushuaia: false,
             modalVisible: true, 
        }
    }

    onClose = () => this.setState({ modalVisible: false});

    handleClick = () => {
        this.setState({ checked: !this.state.checked})
        console.log(this.state.checked)
        if (this.state.checked) {
          
        }
        else {

        }
        
       }
       
  render() {
    return (
          <Container>
            <Header />
            <Content>
                <ListItem>
                  <CheckBox  checked={this.state.Ushuaia} onPress={this.handleClick} />
                  <Body>
                    <Text>Ushuaia</Text>
                  </Body>
                </ListItem>
                <ListItem>
                  <CheckBox checked={this.state.checked} onPress={this.handleClick}/>
                  <Body>
                    <Text>Rio Grande</Text>
                  </Body>
                </ListItem>
                <ListItem>
                  <CheckBox checked={this.state.checked}/>
                  <Body>
                    <Text>Tolhuin</Text>
                  </Body>
                </ListItem>
            </Content>
      </Container>
    );
  }
}
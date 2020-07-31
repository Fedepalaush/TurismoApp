import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Button = props => {
    const addedColor = {
      backgroundColor: props.backgroundColor,
      borderColor: props.backgroundColor,
    };
  
    return (
      <View style={[styles.buttonStyle, addedColor]}>
        <Text style={styles.buttonTextStyle}>{props.label}</Text>
      </View>
    );
  };
  
  Button.defaultProps = {
    backgroundColor: 'blue',
  };
  
  Button.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  };
  
  export default Button;
  
  const styles = StyleSheet.create({
    buttonStyle: {
      color: 'white',
      padding: 5,
      borderRadius: 5,
      borderWidth: 1,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonTextStyle: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  
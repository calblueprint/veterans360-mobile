import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { colors } from '../styles/colors';

export default class Button extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentAction: null,
    };

    this.timer = null  // Disable button for 1s after submit

    this.resetState = this.resetState.bind(this);
    this.showError = this.showError.bind(this);
    this.endSave = this.endSave.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  resetState() {
    this.setState({ currentAction: null });
  }

  startSave() {
    this.setState({ currentAction: 'saving' });
  }

  endSave() {
    this.setState({ currentAction: 'success' });
    this.timer = setTimeout(this.resetState, 2000);
  }

  showError(error) {
    this.setState({ currentAction: 'error' });
    this.timer = setTimeout(this.resetState, 2000);
  }

  getStyle() {
    let buttonStyle;
    switch (this.state.currentAction) {
      case 'saving':
        buttonStyle = [styles.buttonStyle, styles.savingButtonStyle]
      case 'success':
        buttonStyle = [styles.buttonStyle, styles.successButtonStyle]
      case 'error':
        buttonStyle = [styles.buttonStyle, styles.errorButtonStyle]
      default:
        buttonStyle = [styles.buttonStyle]
    }
    if (this.props.style) {
      buttonStyle.push(this.props.style);
    }
    return buttonStyle;
  }

  getIcon() {
    switch (this.state.currentAction) {
      case 'saving':
        return <Icon name="spinner" style={styles.iconStyle} size={14} color={colors.white} />
      case 'success':
        return <Icon name="check" style={styles.iconStyle} size={14} color={colors.white} />
      case 'error':
        return <Icon name="times" style={styles.iconStyle} size={14} color={colors.white} />
      default:
        return
    }
  }

  submit(event) {
    this.startSave();
    this.props.onPress(event, this.endSave, this.showError);
  }

  render() {
    return (
      <TouchableHighlight
        style={this.getStyle()}
        onPress={this.submit}
        underlayColor={colors.dark_green}
      >
        <View style={styles.innerButtonStyle}>
          {this.getIcon()}
          <Text style={styles.textStyle}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 20,
    backgroundColor: colors.green,
  },
  savingButtonStyle: {
    backgroundColor: colors.dark_green,
  },
  successButtonStyle: {
    backgroundColor: colors.light_green,
  },
  errorButtonStyle: {
    backgroundColor: colors.red,
  },
  innerButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    marginRight: 8,
  },
  textStyle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

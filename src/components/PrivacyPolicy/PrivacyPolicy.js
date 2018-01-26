// src/components/About/index.js
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Header from '../Header/Header.js';
import './style.css';
import { Link } from 'react-router';

class PrivacyPolicy extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {} 

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('About', className)} {...props}>
        <Header />
        <p> PrivacyPolicy </p>
      </div>
    );
  }
}



export default PrivacyPolicy;
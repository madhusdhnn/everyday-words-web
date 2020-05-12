import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import Loader from 'react-loader';
import {withTheme} from '@material-ui/core/styles';

class Spinner extends Component {
   render() {
      const {theme} = this.props;
      if (!this.props.isLoaded) {
         return (
            <Loader color={theme.palette.secondary.main} />
         );
      }
      return <Fragment />;
   }
}

Spinner.propTypes = {
   isLoaded: PropTypes.bool,
   theme: PropTypes.object
};

const mapStateToProps = state => {
   const {firebase} = state;
   return {
      isLoaded: firebase.auth.isLoaded
   };
};

export default compose(
   withTheme,
   connect(mapStateToProps)
)(Spinner);

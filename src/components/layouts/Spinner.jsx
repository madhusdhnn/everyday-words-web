import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import Loader from 'react-loader';
import {withTheme} from '@material-ui/core/styles';

class Spinner extends Component {
   render() {
      const {theme} = this.props;
      if (this.props.isLoading) {
         return (
            <Loader color={theme.palette.secondary.dark} />
         );
      }
      return <Fragment />;
   }
}

Spinner.propTypes = {
   isLoading: PropTypes.bool,
   theme: PropTypes.object
};

const mapStateToProps = state => {
   const {loader} = state;
   return {
      isLoading: loader.isLoading
   };
};

export default compose(
   withTheme,
   connect(mapStateToProps)
)(Spinner);

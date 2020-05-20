import React from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import PropTypes from 'prop-types';

function ElevationScroll(props) {
   const {children} = props;
   const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0
   });
   return React.cloneElement(children, {elevation: trigger ? 3 : 0});
}

ElevationScroll.propTypes = {
   children: PropTypes.element.isRequired
};

export default ElevationScroll;

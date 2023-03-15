/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import './Container.css';

const Container = ({ children }) => {
  <section className="container">
    {children}
  </section>;
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;

/* eslint-disable-next-line */
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ message, onClose, type }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClose();
    }
  };
  return (
    <>
      <div onClick={onClose} className="backdrop flex flex-column" role="button" tabIndex={0} onKeyDown={handleKeyDown}>close</div>
      <div className="modalContainer">
        <div className="modalMessage">
          {type === 'success' ? (
            <p>Success</p>
          ) : (
            <p> Error</p>
          )}
          <p>{message}</p>
        </div>
        <button type="button" onClick={onClose}>Close</button>
      </div>
    </>
  );
};
Modal.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
};

export default Modal;

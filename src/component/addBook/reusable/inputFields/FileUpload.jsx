import PropTypes from 'prop-types';
import styles from './FileUpload.module.css';

const FileUpload = ({
  handleFileChange, type,
}) => (
  <div className={
    type === 'upload' ? `${styles.uploadImgContainer} flex gap`
      : 'flex flex-column gap center'
  }
  >
    <label htmlFor="file-upload" className={styles.upload}>
      Upload photo
      <input id="file-upload" type="file" onChange={handleFileChange} />
    </label>
  </div>
);
FileUpload.propTypes = {
  handleFileChange: PropTypes.func.isRequired,
  // file: PropTypes.shape({
  //   name: PropTypes.string,
  // }).isRequired,
  type: PropTypes.oneOf(['upload', 'avatar']).isRequired,
};

export default FileUpload;

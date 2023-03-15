import PropTypes from 'prop-types';
import { CiUser } from 'react-icons/ci';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { BsUpload } from 'react-icons/bs';
import './FileUpload.css';

const FileUpload = ({ 
    preview,
    onChange,
    file,
    type,
}) => (
    <div className={
        type === 'upload' ? `${uploadContainer}` : `${previewContainer}`
    }
    >
        {type === 'upload' ? (
            <div className={
                `${uploadImage}`
            }>
                {
                    preview 
                        ? 
                        <img src={preview} alt={file.name} /> 
                        : 
                    <BsUpload />
                    }
            </div>
        ) : (
            <div className='avatar'>
                {
                    preview ? (
                        <img src={preview} alt={file.name} />
                    ) : (
                        <span className='flex-center'>
                            <CiUser />
                        </span>
                    )
                }
            </div>
        )}
        <label htmlFor='file-upload' className='custom-file-upload'>
            Upload photo
            { ' ' }
            <MdOutlineCloudUpload />
            <input id="file-upload" type="file" onChange={onChange} />
        </label>
    </div>
);

FileUpload.propTypes = {
    preview: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    file: PropTypes.shape({
        name: PropTypes.string,
    }).isRequired,
    type: PropTypes.oneOf(['upload', 'avatar']).isRequired,
};

export default FileUpload;
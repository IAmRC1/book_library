const FILE_SIZE = 2 * 1024 * 1024; // 2mb
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png"
];

const validate = values => {
  const errors = {};
  if (!values.bookName) {
    errors.bookName = 'Required';
  } else if (values.bookName.length > 20) {
    errors.bookName = 'Not more than 20 characters';
  }

  if (!values.bookAuthor) {
    errors.bookAuthor = 'Required';
  } else if (values.bookAuthor.length > 15) {
    errors.bookAuthor = 'Not more than 15 characters';
  }

  if (!values.bookImage) {
    errors.bookImage = 'Required';
  } else if(!SUPPORTED_FORMATS.includes(values.bookImage.type)) {
    errors.bookImage = 'Supports only jpg, jpeg, gif, png'
  } else if(FILE_SIZE < values.bookImage.size) {
    errors.bookImage = 'Only files smaller than 2mb are allowed'
  }

  return errors;
};
export default validate;
import moment from 'moment';

export const formatDate = (value) => {
  return moment(value).format('HH:mm, MMM D'); 
};
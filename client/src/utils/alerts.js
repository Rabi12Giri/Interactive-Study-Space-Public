import Swal from 'sweetalert2';

export const showNotification = ({ icon, title, message: text }) => {
  Swal.fire({
    icon,
    title,
    text,
    confirmButtonColor: '#3a92f0',
  });
};

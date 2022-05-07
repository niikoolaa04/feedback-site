import { toast } from 'react-toastify';

export const errorBar = (message, pos = "top-right", closeTime = 5000) => toast.error(message, {
  position: pos,
  autoClose: closeTime,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored"
});

export const infoBar = (message, pos = "top-right", closeTime = 5000) => toast.info(message, {
  position: pos,
  autoClose: closeTime,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored"
});

export const successBar = (message, pos = "top-right", closeTime = 5000) => toast.success(message, {
  position: pos,
  autoClose: closeTime,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored"
});
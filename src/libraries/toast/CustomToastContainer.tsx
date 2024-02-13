import { ToastContainer, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const customToastProps: ToastOptions = {
  position: 'top-right',
  autoClose: 10000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: 'dark',
  style: { zIndex: 9999 },
}

const CustomToastContainer = () => (
  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss={false}
    draggable={false}
    pauseOnHover
    theme="dark"
    style={{ zIndex: 10000 }}
  />
)

export default CustomToastContainer

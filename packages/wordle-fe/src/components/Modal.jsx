import { modal } from './Modal.module.css';
const Modal = ({ children, close }) => {
  return (
    <div className={modal} onClick={close}>
      {children}
    </div>
  );
};

export default Modal;

import { loaderWarper, loader } from './Loader.module.css';
const Loader = () => {
  return (
    <div className={loaderWarper}>
      <h2>Connecting to server</h2>
      <i className={loader} />
    </div>
  );
};

export default Loader;

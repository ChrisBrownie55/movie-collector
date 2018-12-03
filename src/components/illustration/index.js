import { h } from 'preact';
import style from './style.css';

const Illustration = ({ src, alt, children }) => (
  <div class={style.illustration}>
    <img src={src} alt={alt} />
    <p>{children}</p>
  </div>
);

export default Illustration;

import { h, Component } from 'preact';
import style from './style.css';

export default class Movie extends Component {
  state = {
    validImage: true
  };

  handleError = () => {
    this.setState({ validImage: false });
  };

  render({ movieName, posterSrc }, { validImage }) {
    return (
      <figure class={style.movie}>
        {validImage
          ? <img class={style.moviePoster} onError={this.handleError} src={`https://image.tmdb.org/t/p/w185${this.props.posterSrc}`} alt="movie poster" />
          : (
            <svg class={style.moviePoster} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85 110" fill="none">
              <path fill="#000" d="M10.43 106h-1.7L2.3 96.14V106H.6V93.2h1.7l6.46 9.9v-9.9h1.68V106zm3.57-4.84c0-.93.19-1.77.55-2.52.37-.74.88-1.31 1.53-1.72.65-.4 1.4-.6 2.24-.6a4 4 0 0 1 3.14 1.34c.8.9 1.2 2.09 1.2 3.58v.11c0 .93-.18 1.76-.53 2.5a4.01 4.01 0 0 1-3.8 2.33 4.01 4.01 0 0 1-3.13-1.35c-.8-.9-1.2-2.08-1.2-3.56v-.11zm1.64.2c0 1.05.24 1.9.73 2.53.5.64 1.15.96 1.97.96.82 0 1.48-.32 1.97-.97.48-.65.73-1.56.73-2.72 0-1.05-.25-1.89-.75-2.53a2.35 2.35 0 0 0-1.97-.98c-.8 0-1.45.32-1.94.96-.5.64-.74 1.55-.74 2.74zM33.75 106h-1.69V93.2h1.7V106zm5.63-9.51l.04 1.05a3.51 3.51 0 0 1 2.82-1.23c1.33 0 2.24.51 2.72 1.53.32-.45.73-.82 1.23-1.1a3.67 3.67 0 0 1 1.8-.43c2.09 0 3.15 1.1 3.18 3.32V106h-1.62v-6.28c0-.68-.16-1.18-.47-1.52-.3-.34-.83-.5-1.56-.5-.6 0-1.1.18-1.5.54-.4.36-.64.84-.7 1.45V106h-1.63v-6.23c0-1.38-.68-2.08-2.03-2.08-1.07 0-1.8.46-2.2 1.37V106h-1.62v-9.51h1.54zM60.77 106c-.1-.19-.17-.52-.23-1a3.63 3.63 0 0 1-2.71 1.18c-.94 0-1.7-.27-2.31-.8a2.6 2.6 0 0 1-.9-2.02c0-.99.38-1.75 1.13-2.3a5.32 5.32 0 0 1 3.18-.83h1.58v-.74c0-.57-.17-1.02-.5-1.36-.35-.34-.85-.5-1.51-.5-.58 0-1.07.14-1.46.43-.4.3-.59.65-.59 1.07h-1.63c0-.48.16-.93.5-1.37.34-.45.8-.8 1.37-1.06a4.64 4.64 0 0 1 1.9-.39c1.1 0 1.96.28 2.58.83.62.55.94 1.3.97 2.26v4.38c0 .87.1 1.56.33 2.08v.14h-1.7zm-2.7-1.24c.5 0 1-.13 1.45-.4.45-.26.79-.6 1-1.02v-1.95h-1.28c-2 0-3 .58-3 1.75 0 .5.18.9.52 1.19.34.29.77.43 1.3.43zm7.49-3.6c0-1.48.34-2.65 1.03-3.53a3.28 3.28 0 0 1 2.72-1.32c1.16 0 2.07.41 2.72 1.23l.08-1.05h1.48v9.28c0 1.23-.36 2.2-1.1 2.91-.72.71-1.7 1.06-2.93 1.06-.69 0-1.36-.14-2.01-.43-.66-.3-1.16-.7-1.5-1.2l.84-.98c.7.86 1.55 1.29 2.55 1.29.8 0 1.41-.23 1.85-.67.44-.45.67-1.07.67-1.88v-.82a3.34 3.34 0 0 1-2.67 1.13 3.26 3.26 0 0 1-2.7-1.35 5.9 5.9 0 0 1-1.03-3.66zm1.63.2c0 1.06.22 1.9.66 2.52.44.61 1.06.92 1.85.92 1.02 0 1.78-.47 2.26-1.4v-4.34a2.41 2.41 0 0 0-2.24-1.37c-.8 0-1.41.31-1.86.93a4.65 4.65 0 0 0-.67 2.73zm14.07 4.82a4.16 4.16 0 0 1-3.15-1.27 4.73 4.73 0 0 1-1.21-3.4v-.3c0-.94.18-1.78.54-2.52.36-.75.86-1.33 1.5-1.74a3.8 3.8 0 0 1 2.12-.64c1.23 0 2.2.41 2.88 1.23.69.81 1.03 1.98 1.03 3.5v.67h-6.44c.02.94.3 1.7.81 2.28.53.57 1.2.86 2 .86.58 0 1.07-.12 1.47-.35.4-.24.74-.55 1.04-.94l1 .78a4 4 0 0 1-3.59 1.84zm-.2-8.53c-.66 0-1.21.24-1.66.72a3.46 3.46 0 0 0-.82 2h4.76v-.12a3.08 3.08 0 0 0-.67-1.91c-.4-.46-.93-.69-1.61-.69zM70.24 23.87h-45.2l43.18-12.55a1.76 1.76 0 0 0 1.2-2.18l-2.3-7.87a1.76 1.76 0 0 0-2.17-1.2L12.27 15.38a1.76 1.76 0 0 0-1.2 2.18l2.3 7.87c.05.2.14.37.25.52v7.87c0 .97.79 1.76 1.76 1.76h1.17V70.6a1.4 1.4 0 0 0 1.4 1.4h49.71a1.4 1.4 0 0 0 1.4-1.4V35.57h1.18c.97 0 1.76-.79 1.76-1.76v-8.2a1.76 1.76 0 0 0-1.76-1.75zm-23.36.7h5.63l-5.61 10.3h-5.63l5.61-10.3zm-15.24 0h5.63l-5.61 10.3h-5.63l5.61-10.3zM56.7 3.2l8.26 8.33-5.4 1.57-8.27-8.33 5.4-1.57zM42.73 7.26L51 15.59l-5.4 1.57-8.28-8.33 5.4-1.57zM12.96 21.55l-1.21-4.19a1.05 1.05 0 0 1 .71-1.3l1.56-.46 8.2 8.27H15.29l-2.32-2.32zm7.15 3.02l-3.22.94-.26-.27.36-.67h3.12zM17 34.87h-1.63a1.06 1.06 0 0 1-1.05-1.05v-4.36l1.6-2.94 6.68-1.95-5.6 10.3zm11.08-23.36l8.27 8.33-5.4 1.58-8.27-8.34 5.4-1.57zM62.3 55.3H23.14v-2.27H62.3v2.27zm0-9.6H23.14v-2.27H62.3v2.26zm-.85-10.81H55.8l5.6-10.31h5.63l-5.6 10.3z"/>
            </svg>
          )
        }
        <figcaption title={movieName}>{movieName}</figcaption>
      </figure>
    );
  }
}

import { h, Component } from 'preact';
import CSSTransitionGroup from 'preact-css-transition-group';
import { route } from 'preact-router';
import { connect } from 'preact-redux';
import { logout } from '../../store';

// Material Components
import TopAppBar from 'preact-material-components/TopAppBar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import Button from 'preact-material-components/Button';

// Material CSS
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/TopAppBar/style.css';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';

// My CSS
import style from './style';

class Header extends Component {
  drawerRef = drawer => this.drawer = drawer;

  closeDrawer = () => this.drawer.MDComponent.open = false;
  openDrawer = () => this.drawer.MDComponent.open = true;

  linkTo = path => () => {
    route(path);
    this.closeDrawer();
  };

  goHome = this.linkTo('/');
  goToSearch = this.linkTo('/search');
  goToLogin = this.linkTo('/login');

  render({ currentURL, user }) {
    return (
      <div>
        <TopAppBar class="topappbar">
          <TopAppBar.Row>
            <TopAppBar.Section align-start>
              <TopAppBar.Icon class={`${style.pointer} ${style.menuIcon}`} menu navigation onClick={this.openDrawer}>
                menu
              </TopAppBar.Icon>
              <TopAppBar.Title class={style.title}>
                <img class={style.filmIcon} src="../../assets/logo.svg" alt="movie collector logo" />
                Movie Collector
              </TopAppBar.Title>
            </TopAppBar.Section>
            <TopAppBar.Section align-end shrink-to-fit>
              <CSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={250}
                transitionLeaveTimeout={250}
                exclusive
              >
                {
                  user
                    ? <Button key={0} ripple class={style.logoutButton} onClick={logout}>Logout</Button>
                    : (
                      <svg key={1} xmlns="http://www.w3.org/2000/svg" fill="#01d277" data-name="Layer 1" viewBox="0 0 407.34 160.81" height="35">
                        <path d="M50.38 102.47h6.94V74.71h8.64v-6.89H41.74v6.89h8.64v27.76zM88.53 102.47h6.94v-34.7h-6.94v13.88H78.14V67.77H71.2v34.7h6.94V88.59h10.39v13.88zM121.25 95.53h-13.02v-6.94h11.12v-6.94h-11.12v-6.94h12.43v-6.94h-19.38v34.7h19.97v-6.94zM157.79 82.54L144.1 67.3h-2.23v35.24h7.03V83.17l8.89 9.32 8.88-9.32-.05 19.37h7.04V67.3h-2.19l-13.68 15.24z" class="cls-1"/>
                        <path d="M197.17 67.25c-23.88 0-23.88 35.77 0 35.77s23.9-35.77 0-35.77zm0 28.59c-13.88 0-13.88-21.45 0-21.45s13.9 21.45 0 21.45zM254.5 67.83h6.94v34.7h-6.94zM274.19 95.6v-6.94h11.13v-6.94h-11.13v-6.94h12.44v-6.95h-19.38v34.71h19.96V95.6h-13.02zM317.55 68.23h-10.34v34.7h10.34c23.1 0 23.1-34.7 0-34.7zm0 27.76h-3.4V75.17h3.4c13.52 0 13.52 20.82 0 20.82z" class="cls-1"/>
                        <path d="M360.77 85.55c2.18-1.5 3.11-4.22 3.2-6.84.15-6.12-3.69-10.53-9.85-10.53h-13.74v34.75h13.69a10.32 10.32 0 0 0 10.24-10.44 8.43 8.43 0 0 0-3.54-6.94zm-13.4-10.44h6.17a3.51 3.51 0 0 1 0 7h-6.17v-7zm6.17 20.87h-6.17v-6.94h6.17a3.41 3.41 0 0 1 3.49 3.45 3.45 3.45 0 0 1-3.49 3.5zM233.13 86.57L224 67.83h-8.01l16.37 35.44h1.55l16.37-35.44h-8.01l-9.14 18.74z" class="cls-1"/>
                        <path d="M382.85 146.25c14.6 0 24.48-9.88 24.48-24.48V24.49c0-14.6-9.88-24.48-24.48-24.48H24.48C9.88.01 0 9.89 0 24.49v136.33l12.56-14.56V24.49a11.94 11.94 0 0 1 11.92-11.92h358.37a11.94 11.94 0 0 1 11.92 11.92v97.28a11.94 11.94 0 0 1-11.92 11.92H43.07l-12.56 12.56-.08-.1z" class="cls-1"/>
                        <path d="M42.37 52.85v-15h5.9c5.84 0 5.82 9.26 0 9.26h-2.9v5.73h-3zm5.65-8.65c2 0 2-3.36 0-3.36h-2.65v3.36h2.65zM64.14 37.59c10.33 0 10.33 15.47 0 15.47s-10.33-15.47 0-15.47zm0 3.09c-6 0-6 9.28 0 9.28s6.01-9.29 0-9.29zM81.19 53.17l-6.15-15.33h3.38l3 7.66 2.94-7.52h.15l2.94 7.52 3-7.66h3.38L87.7 53.1h-.55l-2.75-6.66-2.73 6.72h-.52zM97.6 52.85v-15h7.47v3h-4.51v3h3.95v3h-3.95v3h4.77v3h-7.77zM117.54 52.85l-3-5.73h-1.47v5.73h-3v-15h5.92c5.35 0 5.88 7.54 1.47 8.82l3.49 6.19h-3.4zm-4.47-8.65h2.65c2 0 2-3.36 0-3.36h-2.65v3.36zM124.83 52.85v-15h7.52v3h-4.51v3h3.95v3h-3.95v3h4.77v3h-7.77zM141.78 52.85h-4.47v-15h4.47c9.99-.01 9.99 15 0 15zm-1.47-12v9h1.47c5.84 0 5.84-9 0-9h-1.47zM179.96 46.09l-5.23-8.25h3.65l3.07 5.17 3.07-5.17h3.67l-5.25 8.25v6.76h-3v-6.76zM170.65 45.5a3.68 3.68 0 0 0 1.39-3 4.13 4.13 0 0 0-4.26-4.56h-5.94v15h5.94a4.46 4.46 0 0 0 4.43-4.51 3.65 3.65 0 0 0-1.56-2.93zm-5.79-4.51h2.67a1.52 1.52 0 0 1 0 3h-2.67v-3zm2.67 9h-2.67v-3h2.67a1.47 1.47 0 0 1 1.51 1.49 1.49 1.49 0 0 1-1.52 1.54z" class="cls-1"/>
                      </svg>
                    )
                }
              </CSSTransitionGroup>
            </TopAppBar.Section>
          </TopAppBar.Row>
        </TopAppBar>
        <Drawer modal ref={this.drawerRef}>
          <Drawer.DrawerContent>
            <Drawer.DrawerItem class={style.pointer} selected={currentURL === '/'} onClick={this.goHome}>
              <List.ItemGraphic>movie</List.ItemGraphic>
              Movies
            </Drawer.DrawerItem>
            <Drawer.DrawerItem class={style.pointer} selected={currentURL === '/search'} onClick={this.goToSearch}>
              <List.ItemGraphic>search</List.ItemGraphic>
              Search
            </Drawer.DrawerItem>
            <Drawer.DrawerItem class={style.pointer} selected={currentURL === '/login'} onClick={this.goToLogin}>
              <List.ItemGraphic>fingerprint</List.ItemGraphic>
              Login
            </Drawer.DrawerItem>
          </Drawer.DrawerContent>
        </Drawer>
      </div>
    );
  }
}

export default connect(
  ({ user, currentURL }) => ({ user, currentURL })
)(Header);
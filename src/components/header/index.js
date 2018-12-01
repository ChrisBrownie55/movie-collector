import { h, Component } from 'preact';
import CSSTransitionGroup from 'preact-css-transition-group';
import { route, logout } from '../../store';
import { connect } from 'preact-redux';

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
                <img class={style.filmIcon} src="../../assets/film-solid.svg" alt="film icon" />
                Movie Collector
              </TopAppBar.Title>
            </TopAppBar.Section>
            <TopAppBar.Section align-end shrink-to-fit>
              <CSSTransitionGroup transitionName="fade">
                {
                  user
                    ? <Button key={0} ripple class={style.logoutButton} onClick={logout}>Logout</Button>
                    : null
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
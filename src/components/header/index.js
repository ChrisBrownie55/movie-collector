import { h, Component } from 'preact';
import { route } from 'preact-router';
import CSSTransitionGroup from 'preact-css-transition-group';

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

export default class Header extends Component {
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

  render(props) {
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
                  this.props.user
                    ? <Button key={0} ripple class={style.logoutButton} onClick={this.props.onLogout}>Logout</Button>
                    : null
                }
              </CSSTransitionGroup>
            </TopAppBar.Section>
          </TopAppBar.Row>
        </TopAppBar>
        <Drawer modal ref={this.drawerRef}>
          <Drawer.DrawerContent>
            <Drawer.DrawerItem class={style.pointer} selected={props.selectedRoute === '/'} onClick={this.goHome}>
              <List.ItemGraphic>movie</List.ItemGraphic>
              Movies
            </Drawer.DrawerItem>
            <Drawer.DrawerItem class={style.pointer} selected={props.selectedRoute === '/search'} onClick={this.goToSearch}>
              <List.ItemGraphic>search</List.ItemGraphic>
              Search
            </Drawer.DrawerItem>
            <Drawer.DrawerItem class={style.pointer} selected={props.selectedRoute === '/login'} onClick={this.goToLogin}>
              <List.ItemGraphic>fingerprint</List.ItemGraphic>
              Login
            </Drawer.DrawerItem>
          </Drawer.DrawerContent>
        </Drawer>
      </div>
    );
  }

  static propTypes = {
    user: {
      checker: value => value instanceof Object || value === null,
      message: 'user must be an object or null',
      isRequired: true
    },
    onLogout: {
      checker: value => value instanceof Function,
      message: 'onLogout must be a function',
      isRequired: true
    },
    selectedRoute: {
      checker: value => typeof value === 'string',
      message: 'selectedRoute must be a string',
      isRequired: true
    }
  }
}

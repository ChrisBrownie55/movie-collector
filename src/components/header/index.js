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
  goToLogin = this.linkTo('/login');

  render(props) {
    return (
      <div>
        <TopAppBar className="topappbar">
          <TopAppBar.Row>
            <TopAppBar.Section align-start>
              <TopAppBar.Icon className={style.pointer} menu onClick={this.openDrawer}>
                menu
              </TopAppBar.Icon>
              <TopAppBar.Title>Movie Collector</TopAppBar.Title>
            </TopAppBar.Section>
            <TopAppBar.Section align-end shrink-to-fit>
              <CSSTransitionGroup transitionName="fade" >
                {
                  this.props.user
                    ? <Button key={0} ripple className={style.logoutButton} onClick={this.props.onLogout}>Logout</Button>
                    : null
                }
              </CSSTransitionGroup>
            </TopAppBar.Section>
          </TopAppBar.Row>
        </TopAppBar>
        <Drawer modal ref={this.drawerRef}>
          <Drawer.DrawerContent>
            <Drawer.DrawerItem className={style.pointer} selected={props.selectedRoute === '/'} onClick={this.goHome}>
              <List.ItemGraphic>movie</List.ItemGraphic>
              Movies
            </Drawer.DrawerItem>
            <Drawer.DrawerItem className={style.pointer} selected={props.selectedRoute === '/login'} onClick={this.goToLogin}>
              <List.ItemGraphic>fingerprint</List.ItemGraphic>
              Login
            </Drawer.DrawerItem>
          </Drawer.DrawerContent>
        </Drawer>
      </div>
    );
  }
}

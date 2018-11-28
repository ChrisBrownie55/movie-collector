import { h, Component } from 'preact';
import { route } from 'preact-router';

// Material Components
import TopAppBar from 'preact-material-components/TopAppBar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import Switch from 'preact-material-components/Switch';

// Material CSS
import 'preact-material-components/Switch/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/TopAppBar/style.css';

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
            </TopAppBar.Section>
          </TopAppBar.Row>
        </TopAppBar>
        <Drawer modal ref={this.drawerRef}>
          <Drawer.DrawerContent>
            <Drawer.DrawerItem disabled className={style.pointer} selected={props.selectedRoute === '/'} onClick={this.goHome}>
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

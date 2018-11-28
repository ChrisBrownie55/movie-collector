import { h, Component } from 'preact';
import { route } from 'preact-router';

// Material Components
import TopAppBar from 'preact-material-components/TopAppBar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import Dialog from 'preact-material-components/Dialog';
import Switch from 'preact-material-components/Switch';

// Material CSS
import 'preact-material-components/Switch/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/TopAppBar/style.css';

// My CSS
import style from './style';

export default class Header extends Component {
  closeDrawer() {
    this.drawer.MDComponent.open = false;
    this.state = {
      darkThemeEnabled: false
    };
  }

  openDrawer = () => (this.drawer.MDComponent.open = true);

  openSettings = () => this.dialog.MDComponent.show();

  drawerRef = drawer => (this.drawer = drawer);
  dialogRef = dialog => (this.dialog = dialog);

  linkTo = path => () => {
    route(path);
    this.closeDrawer();
  };

  goHome = this.linkTo('/');
  goToMyProfile = this.linkTo('/movies/');

  toggleDarkTheme = () => {
    this.setState({
      darkThemeEnabled: !this.state.darkThemeEnabled
    }, () =>
      this.state.darkThemeEnabled
        ? document.body.classList.add('mdc-theme--dark')
        : document.body.classList.remove('mdc-theme--dark')
    );
  }

  render(props) {
    return (
      <div>
        <TopAppBar className="topappbar">
          <TopAppBar.Row>
            <TopAppBar.Section align-start>
              <TopAppBar.Icon menu onClick={this.openDrawer}>
                menu
              </TopAppBar.Icon>
              <TopAppBar.Title>Movie Collector</TopAppBar.Title>
            </TopAppBar.Section>
            <TopAppBar.Section align-end shrink-to-fit onClick={this.openSettings}>
              Settings &nbsp; <TopAppBar.Icon>settings</TopAppBar.Icon>
            </TopAppBar.Section>
          </TopAppBar.Row>
        </TopAppBar>
        <Drawer modal ref={this.drawerRef}>
          <Drawer.DrawerContent>
            <Drawer.DrawerItem className={style.drawerItem} selected={props.selectedRoute === '/'} onClick={this.goHome}>
              <List.ItemGraphic>home</List.ItemGraphic>
              Home
            </Drawer.DrawerItem>
            <Drawer.DrawerItem className={style.drawerItem} selected={props.selectedRoute === '/movies/'} onClick={this.goToMyProfile}>
              <List.ItemGraphic>movie</List.ItemGraphic>
              Movies
            </Drawer.DrawerItem>
          </Drawer.DrawerContent>
        </Drawer>
        <Dialog ref={this.dialogRef}>
          <Dialog.Header>Settings</Dialog.Header>
          <Dialog.Body>
            <div>
              Enable dark theme <Switch onClick={this.toggleDarkTheme} />
            </div>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.FooterButton accept>OK</Dialog.FooterButton>
          </Dialog.Footer>
        </Dialog>
      </div>
    );
  }
}

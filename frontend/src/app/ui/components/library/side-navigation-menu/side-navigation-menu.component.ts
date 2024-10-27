import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit, NgModule } from '@angular/core';
import { DxTreeViewModule, DxTreeViewComponent } from 'devextreme-angular/ui/tree-view';
import * as events from 'devextreme/events';
import { navigation } from '../../../../core/app-navigation';
import { AuthService } from 'src/app/core/services';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss'],
})
export class SideNavigationMenuComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DxTreeViewComponent, { static: true }) menu!: DxTreeViewComponent;

  @Output() selectedItemChanged = new EventEmitter<any>();
  @Output() openMenu = new EventEmitter<any>();

  @Input() compactMode = false;

  private userRole = JSON.parse(localStorage.getItem('user') || '{}').role?.id || null;
  private _items!: Record<string, unknown>[];
  private _selectedItem: string = '';

  @Input()
  set selectedItem(value: string) {
    this._selectedItem = value;
    this.setSelectedItem();
  }

  get selectedItem(): string {
    return this._selectedItem;
  }

  get items() {
    if (!this._items) {
      this._items = navigation.map(section => ({
        ...section,
        expanded: !this.compactMode,
        items: section.items ? section.items.filter(subItem => this.isAuthorized(subItem.roles)) : undefined,
      })).filter(section => section.items ? section.items.length > 0 : true);
    }
    return this._items;
  }

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    private router: Router
  ) {}

  setSelectedItem() {
    if (!this.menu.instance) return;
    this.menu.instance.selectItem(this.selectedItem);
  }

  onItemClick(event: any) {
    const clickedItem = event.itemData;
    if (clickedItem.path && !clickedItem.items) {
      this.router.navigate([clickedItem.path]);
    }
    this.selectedItemChanged.emit(event);
  }

  ngOnInit() {
    this.userRole = this.authService.getUserInfo()?.role?.id || null;

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.selectedItem = this.router.url;
      this.setSelectedItem();
    });
  }

  ngAfterViewInit() {
    this.setSelectedItem();
    events.on(this.elementRef.nativeElement, 'dxclick', (e: Event) => {
      this.openMenu.emit(e);
    });
  }

  ngOnDestroy() {
    events.off(this.elementRef.nativeElement, 'dxclick');
  }

  private isAuthorized(roles: number[] | undefined): boolean {
    return roles ? roles.includes(this.userRole) : true;
  }
}


@NgModule({
  imports: [DxTreeViewModule],
  declarations: [SideNavigationMenuComponent],
  exports: [SideNavigationMenuComponent],
})
export class SideNavigationMenuModule { }

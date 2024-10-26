import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit, NgModule } from '@angular/core';
import { DxTreeViewModule, DxTreeViewComponent, DxTreeViewTypes } from 'devextreme-angular/ui/tree-view';
import * as events from 'devextreme/events';
import { navigation } from '../../../../core/app-navigation';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss'],
})
export class SideNavigationMenuComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DxTreeViewComponent, { static: true })
  menu!: DxTreeViewComponent;

  @Output() selectedItemChanged = new EventEmitter<DxTreeViewTypes.ItemClickEvent>();
  @Output() openMenu = new EventEmitter<any>();

  @Input() compactMode = false;

  private userRole = JSON.parse(localStorage.getItem('user') || '{}').role?.id || null;
  private _items!: Record<string, unknown>[];

  // Declara `selectedItem`
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
      this._items = navigation
        .map(section => ({
          ...section,
          expanded: !this.compactMode,
          items: section.items?.filter(subItem => this.isAuthorized(subItem.roles)),
        }))
        .filter(section => section.items && section.items.length > 0);
    }
    return this._items;
  }

  constructor(private elementRef: ElementRef,
              private authService: AuthService  
  ) {}

  setSelectedItem() {
    if (!this.menu.instance) {
      return;
    }
    this.menu.instance.selectItem(this.selectedItem);
  }

  onItemClick(event: DxTreeViewTypes.ItemClickEvent) {
    this.selectedItemChanged.emit(event);
  }

  ngOnInit(){
    this.userRole = this.authService.getUserInfo()?.role?.id;
  }

  ngAfterViewInit() {
    this.setSelectedItem();
    events.on(this.elementRef.nativeElement, 'dxclick', (e: Event) => {
      this.openMenu.next(e);
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
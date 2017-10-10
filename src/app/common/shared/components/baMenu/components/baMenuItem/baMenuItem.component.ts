import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "ba-menu-item",
  templateUrl: "./baMenuItem.component.html",
  styleUrls: ["./baMenuItem.component.scss"]
})
export class BaMenuItem {
  @Input() menuItem: any;
  @Input() child: boolean = false;

  @Output() itemHover = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();


  public activeClick: boolean = false;

  constructor(private router: Router) {
	
  }

  ngOnInit() {
	
  }

  public onHoverItem($event): void {
    // this.itemHover.emit($event);
    this.itemHover.emit({ event: $event, items: this.menuItem });
  }

  public onClickItem($event): void {
    if (!this.menuItem.selected) {
      this.router.navigate(this.menuItem.route.paths);
    }

    postal
      .channel("COMPONENTS_CHANNEL")
      .publish("selected", { component: this.menuItem.id });
  }

  public onToggleSubMenu($event, item): boolean {
    $event.item = item;
    this.toggleSubMenu.emit($event);
    return false;
  }

  public toggleActive($event): void {
    let activeMenu = jQuery($event.currentTarget);

    // 非子节点
    if (activeMenu.hasClass("al-sidebar-list-item")) {
      this.activeClick = true;
      activeMenu
        .parent()
        .parent()
        .find("ba-menu-item > li")
        .removeClass("active");

      activeMenu.addClass("active");
    } else if (activeMenu.hasClass("ba-sidebar-sublist-item")) {
      //子节点
      this.activeClick = true;
      activeMenu
        .parent()
        .parent()
        .find("ba-menu-item > li")
        .removeClass("active");

      activeMenu.addClass("active");

      $event.stopPropagation();
    }
  }
}

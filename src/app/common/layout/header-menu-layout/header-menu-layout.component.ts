import { Component, OnInit } from "@angular/core";

@Component({
  selector: "header-menu-layout",
  templateUrl: "./header-menu-layout.component.html",
  styleUrls: ["./header-menu-layout.component.scss"]
})
export class HeaderMenuLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    
    postal.channel('MENU_CHANNEL').publish('menu.update');
  }
}

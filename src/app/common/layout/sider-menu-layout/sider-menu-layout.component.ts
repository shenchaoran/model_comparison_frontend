import { Component } from "@angular/core";

@Component({
  selector: "sider-menu-layout",
  templateUrl: "./sider-menu-layout.component.html",
  styleUrls: ["./sider-menu-layout.component.scss"]
})
export class SiderMenuLayoutComponent {
  panelHide: boolean = true;
  dateNow: Date;

  sidebarDiffWidth = 183;
  panelDiffWidth = 250;

  constructor() {
    this.dateNow = new Date();

    postal.channel("MENU_CHANNEL").subscribe("menu.isCollapsed", data => {
      let menuCollapsed = data.isCollapsed;
      let gridColumns = jQuery(".wrapper").css("grid-template-columns");

      this.changeGridColumn(
        gridColumns,
        0,
        this.sidebarDiffWidth * Math.pow(-1, Number(menuCollapsed))
      );
    });
  }

  changeGridColumn(gridColumns, position, changeValue) {
    let columnsArr = _.split(gridColumns, " ");

    let sidebarWidth = parseFloat(columnsArr[position]);
    sidebarWidth += changeValue;

    // 删除指定项，并插入新项
    columnsArr.splice(position, 1, sidebarWidth + "px");

    // 删除最后一项，并插入最后一项
    columnsArr.pop();
    columnsArr.push("auto");

    jQuery(".wrapper").css("grid-template-columns", _.join(columnsArr, " "));
  }
}

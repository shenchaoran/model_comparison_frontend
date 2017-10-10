import { Component, EventEmitter, Input } from "@angular/core";
import { XciePopUpService } from "./xcie-popup.service";

@Component({
  selector: "xcie-popup",
  templateUrl: "./xcie-popup.component.html",
  styleUrls: ["./xcie-popup.component.css"],
  providers: [XciePopUpService]
})
export class XciePopUp {
  _popContent: any;

  _taxInfo: any = {};
  _tagsArray: any = [];
  _level: string;
  _qybh: string;
  _dkbm: string;
  _ydlb: string;

  @Input()
  set popContent(value: string) {
    this._popContent = value;
    

    let subscription = postal
    .channel("XCIE_POPUP_CHANNEL")
    .subscribe("getEntSaleTax.callback", (data, envelope) => {
        this._taxInfo = data.result[0].attribute;
        postal.unsubscribe(subscription);

    });

    let subscription2 = postal
    .channel("XCIE_POPUP_CHANNEL")
    .subscribe("getEntTag.callback", (data, envelope) => {
        if(data.result){
            this._tagsArray = data.result;
        }
        // console.log(data);
        postal.unsubscribe(subscription2);
    });

    let subscription3 = postal
    .channel("XCIE_POPUP_CHANNEL")
    .subscribe("getEntNum.callback", (data, envelope) => {
        if(data.result){
            this._level = "./assets/img/app/qyfb/class_" + data.result[0].attribute["分级代码"] +".png";
        }
        postal.unsubscribe(subscription3);
    });

    let subscription4 = postal
    .channel("XCIE_POPUP_CHANNEL")
    .subscribe("getEntYdlb.callback", (data, envelope) => {
        this._ydlb = data.result[0].attribute["用地类别"];
        postal.unsubscribe(subscription3);
    });

    this._qybh = this._popContent.popAttributes["企业编号"];
    this._dkbm = this._popContent.popAttributes["地块编码"];
    this.xciePopUpService.getEntSaleTax(this._qybh);
    this.xciePopUpService.getEntTag(this._qybh);
    this.xciePopUpService.getEntNum(this._qybh);
    this.xciePopUpService.getEntYdlb(this._qybh);
  }

  close = new EventEmitter();

  constructor(private xciePopUpService: XciePopUpService) {
    
  }

  ngAfterViewInit() {}

  onClickedExit() {
    this.close.emit("event");
  }

  showModal() {
    postal.channel("DETAIL_MODAL_CHANNEL").publish("show", { qybh: this._qybh, dkbm: this._dkbm });
  }

  showDkxqModal(){
    postal.channel("DKXQ_MODAL_CHANNEL").publish("show", { qybh: this._qybh, dkbm: this._dkbm });
  }
}

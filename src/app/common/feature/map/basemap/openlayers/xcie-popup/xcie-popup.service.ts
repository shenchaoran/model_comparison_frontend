import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class XciePopUpService {
  constructor(private httpClient: HttpClient) {}

  getEntSaleTax(qybh) {
    postal.channel("DATA_INQUIRE_CHANNEL").publish('data.inquire.get', {
      serviceId: "ENTSALETAX",
      query: { QYBH: qybh, f: "list", PageSize: 10, PageNo: 1 },
      callback: "XCIE_POPUP_CHANNEL#getEntSaleTax.callback"
    });
  }

  getEntTag(qybh) {
      //TODO:
    postal.channel("DATA_INQUIRE_CHANNEL").publish('data.inquire.get', {
      serviceId: "CXQYBQXX",
      // params: { QYBH: '3940092B-3797-4DE8-9E00-886E987A1BB9', f: "list", PageSize: 10, PageNo: 1 },
      query: { QYBH: qybh, f: "list", PageSize: 10, PageNo: 1 },
      callback: "XCIE_POPUP_CHANNEL#getEntTag.callback"
    });
  }

  getEntYdlb(qybh) {
  postal.channel("DATA_INQUIRE_CHANNEL").publish('data.inquire.get', {
    serviceId: "ENTYDLB",
    // params: { QYBH: '3940092B-3797-4DE8-9E00-886E987A1BB9', f: "list", PageSize: 10, PageNo: 1 },
    query: { QYBH: qybh, f: "list", PageSize: 10, PageNo: 1 },
    callback: "XCIE_POPUP_CHANNEL#getEntYdlb.callback"
  });
}

  getEntNum(qybh){
    postal.channel("DATA_INQUIRE_CHANNEL").publish('data.inquire.get', {
        serviceId: "ENTNUM",
        query: { QYBH: qybh, f: "list", PageSize: 10, PageNo: 1 },
        callback: "XCIE_POPUP_CHANNEL#getEntNum.callback"
      });
  }
}

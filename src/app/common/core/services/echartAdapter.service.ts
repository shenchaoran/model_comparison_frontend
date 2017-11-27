import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class EchartAdapterService {

  constructor () {}

  ///////////////////////////////////////////////Adapter适配器

  // TODO stack
  public multiSeries2DAdapter(xAxisData, seriesDatas, seriesNames){
    let xData = [];
    if(xAxisData === undefined && seriesDatas.length) {
        _.map(seriesDatas[0], (seriesData, i) => xData.push(i + 1));
    }
    else {
        xData = xAxisData;
    }
    return {
      seriesDatas: seriesDatas,
      seriesNames: seriesNames,
      xAxisData: xData
    };
  }

  // TODO
  public multiSeriesMultiY2DAdapter(){
    return {
      serieses: null,
      seriesNames: null,
      xAxisData: null,
      yAxis: null
    };
  }

  public singleSeries2DAdapter(){
    return {
      seriesData: null,
      xAxisData: null
    };
  }

  public multiSeries3DAdapter(){}

  ///////////////////////////////////////////////Assembler装配器
  // 必要属性由外部设置

  // x (n) --> (1) y
  // 相当于table中的多列制图
  public multiSeries2DAssembler(coreOption, chartType){
    return {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: coreOption.seriesNames
      },
      calculable: true,
      toolbox: {
        show: true,
        feature: {
          saveAsImage: { show: true }
        }
      },
      xAxis: [{
        type: 'category',
        data: coreOption.xAxisData,
        axisPointer: {
          type: 'shadow'
        },
        axisLabel:{
          interval: 'auto'
        }
      }],
      yAxis: [{
        type: 'value'
      }],
      series: (() => {
        return _.map(coreOption.seriesDatas, (seriesData, index) => {
          return {
            name: coreOption.seriesNames[index],
            type: chartType,
            data: seriesData
          };
        });
      })()
    }
  }

  // x (n) --> (n) y
  public multiSeriesMultiY2DAssembler(coreOption, chartType){
    return {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        x: 'center',
        y: 'top',
        data: coreOption.seriesNames
      },
      calculable: true,
      toolbox: {
        show: true,
        feature: {
          saveAsImage: { show: true }
        }
      },
      xAxis: [{
        type: 'category',
        data: coreOption.xAxisData,
        axisPointer: {
          type: 'shadow'
        },
        axisLabel:{
          interval:0
        }
      }],
      yAxis: coreOption.yAxis,
      series: (() => {
        return _.map(coreOption.serieses, (series, index) => {
          series["name"] = coreOption.seriesNames[index];
          series["type"] = chartType;
          return series;
        });
      })()
    }
  }

  // x (1) --> (1) y
  public singleSeries2DAssembler(coreOption, chartType){
    return {
      tooltip: {
        trigger: 'axis'
      },
      calculable: true,
      toolbox: {
        show: true,
        feature: {
          saveAsImage: { show: true }
        }
      },
      xAxis: [{
        type: 'category',
        data: coreOption.xAxisData,
        axisPointer: {
          type: 'shadow'
        },
        axisLabel:{
          interval:0
        }
      }],
      yAxis: [{
        type: 'value'
      }],
      series: {
        type: chartType,
        data: coreOption.seriesData
      }
    }
  }
}

import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class EchartAdapterService {

  constructor () {}

  ///////////////////////////////////////////////meta operate

  public getTHs(tts){
    return _.map(tts, 'did');
  }

  // get series name/legend data by table column name
  public getSeriesNameByTh(seriesTh, tdc) {
    let legendData = [];
    _.map(tdc, tr => {
      _.map(tr, td => {
        if(td.did === seriesTh){
          legendData.push(td.dv);
        }
      });
    });
    return _.uniq(legendData);
  }

  // get xAxis data by table column name
  public getXAxisByTh(xAxisTh, tdc) {
    let xAxis = [];
    _.map(tdc, tr => {
      _.map(tr, td => {
        if(td.did === xAxisTh){
          xAxis.push(td.dv);
        }
      });
    });
    return _.uniq(xAxis);
  }

  // 容错：当没有series name时
  public getMultiSeriesData(tdc, xAxisTh, yAxisTh, seriesTh = null, seriesName = null) {
    let kvTrs = [];
    let blockCounter = {};
    let seriesCount;
    let currentX;
    _.map(tdc, tr => {
      let kvTr = {};
      _.map(tr, td => {
        if(td.did === xAxisTh){
          if(blockCounter[td.dv]){
            blockCounter[td.dv]++;
            seriesCount++;
          }
          else {
            blockCounter[td.dv] = 1;
            seriesCount = 1;
          }
          currentX = td.dv;
        }

        kvTr[td.did] = td.dv;
        kvTr['seriesNum'] = blockCounter[currentX];
      });
      kvTrs.push(kvTr);
    });

    if(seriesTh === null){
      let rst = [];
      for(let i=1; i<= seriesCount; i++){
        rst.push(_.map(_.filter(kvTrs, {'seriesNum': i}), yAxisTh));
      }
      return rst;
    }
    else{
      let where = {};
      where[seriesTh] = seriesName;
      let findRst = _.filter(kvTrs, where);
      let seriesData = _.map(findRst, yAxisTh);
      return seriesData;
    }
  }

  public getSingleSeriesData(yAxisTh, tdc){
    let seriesData = [];
    _.map(tdc, tr => {
      _.map(tr, td => {
        if(td.did === yAxisTh){
          seriesData.push(td.dv);
        }
      });
    });
    return seriesData;
  }

  ///////////////////////////////////////////////Adapter适配器

  // TODO stack
  public multiSeries2DAdapter(table, xAxisTh, yAxisTh, seriesTh = null, stack = null){
    let xAxisData = this.getXAxisByTh(xAxisTh, table.tdc);
    let seriesDatas = [];
    let seriesNames = [];

    if(seriesTh){
      seriesNames = this.getSeriesNameByTh(seriesTh, table.tdc);
      _.map(seriesNames, seriesName => {
        seriesDatas.push(this.getMultiSeriesData(table.tdc, xAxisTh, yAxisTh, seriesTh, seriesName));
      });
    }
    else{
      seriesDatas = this.getMultiSeriesData(table.tdc, xAxisTh, yAxisTh);
      seriesNames = _.map(new Array(seriesDatas.length), v => '');
    }

    return {
      seriesDatas: seriesDatas,
      seriesNames: seriesNames,
      xAxisData: xAxisData
    };
  }

  // TODO
  public multiSeriesMultiY2DAdapter(table,xAxisTh, yAxisThs, seriesTh = null, stack = null){
    let serieses = [];
    let seriesNames = [];
    let xAxisData = [];
    let yAxis = _.map(yAxisThs, yAxisTh => {
      return {
        type: 'value',
        name: yAxisTh,
        splitLine :{
            show:false
        },
      };
    });

    _.map(yAxisThs, (yAxisTh, index) => {
      let option = this.multiSeries2DAdapter(table,xAxisTh,yAxisTh,seriesTh);
      _.map(option.seriesDatas, seriesData => {
        let series = {};
        series["yAxisIndex"] = index;
        if(stack){
          series["stack"] = stack[index];
        }
        series["data"] = seriesData;
        serieses.push(series);
      });
      seriesNames = option.seriesNames;
      xAxisData = option.xAxisData;
    });
    return {
      serieses: serieses,
      seriesNames: seriesNames,
      xAxisData: xAxisData,
      yAxis: yAxis
    };
  }

  public singleSeries2DAdapter(table, xAxisTh, yAxisTh){
    let xAxisData = this.getXAxisByTh(xAxisTh, table.tdc);
    let seriesData = this.getSingleSeriesData(yAxisTh, table.tdc);

    return {
      seriesData: seriesData,
      xAxisData: xAxisData
    };
  }

  public multiSeries3DAdapter(){

  }

  ///////////////////////////////////////////////Assembler装配器
  // 必要属性由外部设置

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
          interval:0
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

  public multiSeries3DAssembler(){

  }
}

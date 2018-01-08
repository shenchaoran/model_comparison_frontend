import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ogms-home',
  template: `
        <p>
            home works!
        </p>
        <div id="map" style="width:600px; height:400px;"></div>
        <router-outlet></router-outlet>
    `,
  styles: [`
      .ol-button i
      {	color: inherit;
      }
      .hello
      {	right: 50%;
          top: 0.5em;
      }
      .save
      {	left: 50%;
          top: 0.5em;
      }
      .text
      {	left: 50%;
          top: 2.5em;
      }
      `
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {
    b = true;
    constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    // The map
    var map = new ol.Map({
      target: 'map',
      view: new ol.View({
        zoom: 14,
        center: [270701, 6247637]
      }),
      layers: [new ol.layer.Tile({ source: new ol.source.OSM() })]
    });

    // Add a custom push button with onToggle function
    var hello = new ol.control.Button({
      html: '<i class="fa fa-smile-o"></i>',
      className: 'hello',
      title: 'Hello world!',
      handleClick: function() {
        info('hello World!');
      }
    });
    map.addControl(hello);

    // Add a save button with on active event
    var save = new ol.control.Button({
      html: '<i class="fa fa-download"></i>',
      className: 'save',
      title: 'Save',
      handleClick: function() {
        info(
          'Center: ' +
            map.getView().getCenter() +
            ' - zoom: ' +
            map.getView().getZoom()
        );
      }
    });
    map.addControl(save);

    // Show info
    function info(i) {
      jQuery('#info').html(i || '');
    }
  }
}

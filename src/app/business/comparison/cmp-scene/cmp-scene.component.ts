import { Component, OnInit } from '@angular/core';

import { CmpSceneService } from '../services/cmp-scene.service';

@Component({
  selector: 'ogms-cmp-scene',
  templateUrl: './cmp-scene.component.html',
  styleUrls: ['./cmp-scene.component.scss']
})
export class CmpSceneComponent implements OnInit {

  constructor(private service: CmpSceneService) { }

  ngOnInit() {
  }

}

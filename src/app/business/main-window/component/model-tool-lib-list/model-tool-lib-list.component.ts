import { Component, OnInit } from '@angular/core';

import { ModelToolService } from '../../services/model-tool.service';

@Component({
  selector: 'app-model-tool-lib-list',
  templateUrl: './model-tool-lib-list.component.html',
  styleUrls: ['./model-tool-lib-list.component.scss']
})
export class ModelToolLibListComponent implements OnInit {

  constructor(private modelToolService: ModelToolService) { 
      
  }

  ngOnInit() {
      postal.channel('MODEL_TOOL_CHANNEL').subscribe('getModelList', (data, envelope) => {
        console.log(data);
      });
      this.modelToolService.getModelList({});
  }

}

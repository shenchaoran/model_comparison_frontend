import { Component, OnInit } from '@angular/core';

import { CmpSlnService } from '../services/cmp-sln.service';

@Component({
  selector: 'ogms-cmp-solution',
  templateUrl: './cmp-solution.component.html',
  styleUrls: ['./cmp-solution.component.scss']
})
export class CmpSolutionComponent implements OnInit {

  constructor(private service: CmpSlnService) { }

  ngOnInit() {
  }

}

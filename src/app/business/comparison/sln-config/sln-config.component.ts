import { Component, OnInit, Input, Output,  } from '@angular/core';
import {
    TopicService,
    ConversationService,
    UserService,
    SolutionService,
    MSService,
    CmpMethodService,
} from '../../services';
import {
    Topic,
    Conversation,
    Comment,
    Solution,
} from '../../models';
import { DefaultLifeHook } from '../../../common/shared/classes/default-life-hook.class';

@Component({
    selector: 'ogms-sln-config',
    templateUrl: './sln-config.component.html',
    styleUrls: ['./sln-config.component.scss']
})
export class SlnConfigComponent extends DefaultLifeHook implements OnInit {
    @Input() cfg;

    constructor(
        private solutionService: SolutionService,
        private msService: MSService,
        private userService: UserService,
        private cmpMethodService: CmpMethodService,
    ) {
        super(solutionService);

    }

    ngOnInit() {

    }

}

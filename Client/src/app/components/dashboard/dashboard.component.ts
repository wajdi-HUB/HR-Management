import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AppConfigService } from 'src/app/_services/AppConfigService';
import { CongeService } from 'src/app/_services/conge.service';
import { TaskService } from 'src/app/_services/task.service';
import { UserService } from 'src/app/_services/users.service';
import { AppConfig } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './dashboard.component.html',
    providers: [ConfirmationService, MessageService,AppConfigService],
})
export class DashboardComponent implements OnInit {
    basicData: any;
    multiAxisData: any;
    multiAxisOptions: any;
    lineStylesData: any;
    basicOptions: any;
    subscription!: Subscription;
    data: any;
    data1:any;
    chartOptions: any;
    config!: AppConfig;
    employees: User[] = [];
    countusers: number=0;
    countconge: number=0;
    countPending:number=3;
    countDone:number=2;
    countTodo:number=0;
    countAdmin:number=0;
    countUser:number=0;
    countTimeOut:number=0;

    constructor(private messageService: MessageService, private configService: AppConfigService,  private userService: UserService , private CongeService: CongeService,private taskService:TaskService) {}

    ngOnInit() {


this.taskService.getAllDoneTasks().subscribe((t) => {
    this.countDone = t;


this.taskService.getAllPendingTasks().subscribe((l) => {
    this.countconge = l;


this.taskService.getAllTodoTasks().subscribe((r) => {
    this.countusers = r;
this.taskService.getAllTimeOutTasks().subscribe((m)=>{
    this.countTimeOut=m;
    console.log("ejndjeneji",this.countconge);
    this.data = {
    labels: ['Done','Pending','Todo','TimeOut'],
    datasets: [

        {   label:'Tasks',
            data: [this.countDone, this.countconge,this.countusers,this.countTimeOut],
            backgroundColor: [
                "#42A5F5",
                "#66BB6A",
                "#FFA726",
                "#8B0000"

            ],
            hoverBackgroundColor: [
                "#64B5F6",
                "#81C784",
                "#FFB74D",
                "#8B0000"
            ]
        }
    ]
};
});
});
});
});
this.userService.countAdmin().subscribe((t) => {
    this.countAdmin = t;


this.userService.countUser().subscribe((l) => {
    this.countUser = l;



    this.data1 = {
    labels: ['Admin','User'],
    datasets: [
        {
            data: [this.countAdmin,this.countUser],
            backgroundColor: [
                "#42A5F5",
                "#66BB6A",

            ],
            hoverBackgroundColor: [
                "#64B5F6",
                "#81C784",

            ]
        }
    ]
};

});
});

}
}
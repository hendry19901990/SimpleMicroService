import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MessageService } from 'src/Service/MessageService';
import { Message } from 'src/Model/message';
 
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'Simple Messenger';
  messageList: Message[] = [];
  frmRegister: FormGroup  = new FormGroup({
    message: new FormControl()
  });  

  constructor(public service: MessageService,
    private formBuilder: FormBuilder,) { }

  ngAfterViewInit() {
    this.getMessages();
  }

  SaveMessage(value): void {
     this.service.SaveMessage(value)
     .subscribe((data: any = []) => {
        console.log(data);
        if(data && data.result){
            this.ngAfterViewInit();
            alert(data.result);
        }
      });  
  }

  public getMessages() {
    return this.service.getMessages()
      .subscribe((data: any = []) => {
        this.messageList = data.data;
      });
  }
}
import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MessageService } from 'src/Service/messageService';
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
  existNotfs = false;
  notification = "";
  existNotfsErr = false;
  notificationErr = "";


  frmRegister: FormGroup  = new FormGroup({
    message: new FormControl()
  });  

  constructor(public service: MessageService,
    private formBuilder: FormBuilder,) { }

  ngAfterViewInit() {
    this.getMessages();
    this.service.updatedResult.subscribe((msg: Message) => {
      this.existNotfs = true;
      this.notification = "Message created ID: " + msg.id;
      setTimeout(()=>{
        this.existNotfs = false;
        this.notification = "";
      }, 5000);
    });
  }

  SaveMessage(value): void {
     console.log(value);

     if(value.message.length > 20 || 
      value.message.indexOf("b") != -1 ||
      value.message.indexOf("c") != -1 || 
      value.message.indexOf("d") != -1 ||
      value.message.indexOf("t") != -1){

        this.existNotfsErr = true;
        this.notificationErr = "Invalid content, You must send a max of 20 charactes and not send any of the following characters ('b,c,d,t')";
        this.frmRegister.reset();
        setTimeout(()=>{
          this.existNotfsErr = false;
          this.notificationErr = "";
        }, 5000);

        return;
     }

     this.service.SaveMessage(value)
     .subscribe((data: any = []) => {
        console.log(data);
        if(data && data.result){
            this.frmRegister.reset();
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
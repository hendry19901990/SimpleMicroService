import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Message } from 'src/Model/message';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { Socket } from 'ngx-socket-io';
@Injectable({ providedIn: 'root' })
export class MessageService {
    baseUrl: string = "http://localhost:8080/messages";

    constructor(private httpClient: HttpClient, private socket: Socket) { }

    //SocketIO
    updatedResult = this.socket.fromEvent<Message>('updatedResult');

    public getMessages(): Observable<Array<Message>> {
        return this.httpClient.get<Array<Message>>(this.baseUrl)
            .pipe(
                retry(1),
                catchError(this.errorHandle)
            )
    }

    public SaveMessage(msg): Observable<any>{
        return this.httpClient.post(this.baseUrl, msg)
            .pipe(
                retry(1),
                catchError(this.errorHandle)
            )
    }

    errorHandle(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        alert(error.message);
        return throwError(errorMessage);
    }
}
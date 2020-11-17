import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotifyService {
    constructor(private snackBar: MatSnackBar) {}

    error(msg: string) {
        setTimeout(() => {
            this.snackBar.open(msg, "OK");
        });
    }

    message(msg: string, duration: number = 500) {
        setTimeout(() => {
            this.snackBar.open(msg, "Ok");
        });
    }
}

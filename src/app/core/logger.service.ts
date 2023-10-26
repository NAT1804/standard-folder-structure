import { Injectable } from '@angular/core';

import { LogLevel } from '@data/classes/log-level.class';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  logLevel: LogLevel = new LogLevel();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  log(msg: string): void {
    this.logWith(this.logLevel.None, msg);
  }

  info(msg: string): void {
    this.logWith(this.logLevel.Info, msg);
  }

  warn(msg: string): void {
    this.logWith(this.logLevel.Warn, msg);
  }

  error(msg: string): void {
    this.logWith(this.logLevel.Error, msg);
  }

  debug(msg: string): void {
    this.logWith(this.logLevel.Verbose, msg);
  }

  private logWith(level: number, msg: string): void {
    if (level <= this.logLevel.Error) {
      switch (level) {
        case this.logLevel.None:
          return console.log(msg);
        case this.logLevel.Info:
          return console.info('%c' + msg, 'color: #6495ED');
        case this.logLevel.Warn:
          return console.warn('%c' + msg, 'color: #FF8C00');
        case this.logLevel.Error:
          return console.error('%c' + msg, 'color: #DC143C');
        default:
          console.debug(msg);
      }
    }
  }
}

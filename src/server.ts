import '@src/util/module-alias';
import { Logger } from '@overnightjs/logger';
import { Server } from '@overnightjs/core';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Application } from 'express';
import EmployeeController from '@src/controllers/employee.controller';
import { connection } from '@src/config/typeorm.config';

export class SetupServer extends Server {
  constructor() {
    super();
    this.init();
  }

  public init(): void {
    this.connectDb();
    this.setupExpress();
    this.setupControllers();
  }

  public getApp(): Application {
    return this.app;
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }

  private setupControllers(): void {
    const employeeController = new EmployeeController();
    this.addControllers([employeeController], undefined, cors());
  }

  private connectDb(): void {
    connection();
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      Logger.Info(`Server listening on port: ${port}`);
    });
  }
}

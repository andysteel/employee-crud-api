import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
import { EmployeeRepository } from '@src/repositories/employee.repository';
import { Response, Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { StatusCodes } from 'http-status-codes';
import config from 'config';
import { Logger } from '@overnightjs/logger';
import { PaginationEmployee } from '@src/types/application.types';
import { handleResponseError, handleResponseSuccess, UPDATE_ERROR } from '@src/util/handle-response';

@Controller(`${config.get('apiVersion')}/employees`)
export default class EmployeeController {

  @Post()
  private createEmployee(req: Request, res: Response) {
    const employee = getCustomRepository(EmployeeRepository).saveEmployee(req.body);
    employee.then(response => handleResponseSuccess(res, StatusCodes.CREATED, response))
      .catch((error) => {
        Logger.Err(error.stack);
        handleResponseError(res, StatusCodes.BAD_REQUEST, error.message);
      });
  }

  @Get('index/:index/size/:size')
  private getAllEmployees(req: Request, res: Response) {

    const skip: number = parseInt(req.params.index) || 0;
    const take: number = parseInt(req.params.size) || 10;
    const pagination: PaginationEmployee = { skip, take };

    const employees = getCustomRepository(EmployeeRepository).getAllEmployees(pagination);
    employees.then((response) => {
      if (response.length === 0) {
        res.status(StatusCodes.NO_CONTENT).send();
        return;
      }
      handleResponseSuccess(res, StatusCodes.OK, response);
    }).catch((error) => {
      Logger.Err(error.stack);
      handleResponseError(res, StatusCodes.BAD_REQUEST, error.message);
    });
  }

  @Get(':id')
  private getEmployee(req: Request, res: Response) {
    const employee = getCustomRepository(EmployeeRepository).getEmployee(req.params.id);
    employee.then((response) => {
      if (!response) {
        res.status(StatusCodes.NO_CONTENT).send();
        return;
      }
      handleResponseSuccess(res, StatusCodes.OK, response);
    }).catch((error) => {
      Logger.Err(error.stack);
      handleResponseError(res, StatusCodes.BAD_REQUEST, error.message);
    });
  }

  @Put(':id')
  private updateEmployee(req: Request, res: Response) {
    const employee = getCustomRepository(EmployeeRepository).getEmployee(req.params.id);

    employee.then((response) => {
      if (!response) {
        res.status(StatusCodes.NO_CONTENT).send();
        return;
      }
      let saved;
      if (req.body.id === response.id) {
        saved = getCustomRepository(EmployeeRepository).updateEmployee(req.body);
      } else {
        const error = new Error(UPDATE_ERROR);
        Logger.Err(error.stack);
        handleResponseError(res, StatusCodes.PRECONDITION_REQUIRED, error.message);
      }
      if (saved) {
        saved
          .then(value => handleResponseSuccess(res, StatusCodes.OK, value))
          .catch((error) => {
            Logger.Err(error.stack);
            handleResponseError(res, StatusCodes.BAD_REQUEST, error.message);
          });
      }
    }).catch((error) => {
      Logger.Err(error.stack);
      handleResponseError(res, StatusCodes.BAD_REQUEST, error.message);
    });
  }

  @Delete(':id')
  private removeEmployee(req: Request, res: Response) {
    const result = getCustomRepository(EmployeeRepository).removeEmployee(req.params.id);
    result.then((response) => {
      if (!response) {
        res.status(StatusCodes.NOT_ACCEPTABLE).send();
        return;
      }
      handleResponseSuccess(res, StatusCodes.OK, response);
    }).catch((error) => {
      Logger.Err(error.stack);
      handleResponseError(res, StatusCodes.BAD_REQUEST, error.message);
    });
  }
}

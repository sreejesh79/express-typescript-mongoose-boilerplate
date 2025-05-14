/* eslint-disable */
import { NextFunction, Request, Response } from 'express';
import { Logger  } from 'config/logger';
import { Service } from 'typedi';
import { Middleware } from '../../decorators/middleware.decorator';
import {  All, Get, Use } from '../../decorators/route.decorator';
/* const loggerMiddleware = ( req: Request, resp: Response, next: () => void ) => {
	Logger.info( `Request logged: ${req.method} ${req.path}` );
	next();
}; */

// export default loggerMiddleware;
@Middleware( '' )
@Service()
export  class APIMiddleware {

	@Use('/')
	public logger = ( req: Request, resp: Response, next: NextFunction ) => {
			Logger.info( `Request logged: ${req.method} ${req.path}` );
			next();
		};
}


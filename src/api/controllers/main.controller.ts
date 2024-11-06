/* eslint-disable */ 
import { Controller } from '../../decorators/controller.decorator';
import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import { Get } from '../../decorators/route.decorator';
import * as randomestring from 'randomstring';

@Controller( '/' )
@Service()
export class MainController {

	@Get( '' )
	public index = async ( req: Request, res: Response, next: NextFunction ) =>{
		try {
			// const randomestring = require('randomstring');
			const randome = randomestring.generate(6);
			res.status( 200 ).send( `Welcome to Express Boilerplate ${randome}`);
		} catch ( err ) {
			next( err );
		}
	};

}
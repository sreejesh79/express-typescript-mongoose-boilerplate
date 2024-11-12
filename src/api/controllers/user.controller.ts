import { Request, Response, NextFunction } from 'express';
import UserService from 'services/user.service';
import { IResponse } from 'types';
import { Service } from 'typedi';
import { Controller } from '../../decorators/controller.decorator';
import { Get, Post, Put, Delete } from '../../decorators/route.decorator';
import { IUserBodyPayloadDTO } from 'api/dto/user.dto';

@Controller( '/user' )
@Service()
export class UserController {

	constructor (
    private _userService: UserService
	) { }
  @Post( '' )
	public  create = async ( req: Request, res: Response, next: NextFunction ): Promise<any> => {
  		try {
  			const body: IUserBodyPayloadDTO = <IUserBodyPayloadDTO>req.body;
  			const response: IResponse = await this._userService.create( body );
  			return res.status( response.statusCode ).json( response );
  		} catch ( e ) {
  			next ( e );
  		}
  	};

  @Get( '' )
  public  get = async ( req: Request, res: Response, next: NextFunction ): Promise<any> => {
  		try {
  			const response: IResponse = await this._userService.get( );
  			return res.status( response.statusCode ).json( response );
  		} catch ( e ) {
  			next( e );
  		}
  	};

  @Put( '/:id' )
  public  update = async ( req: Request, res: Response, next: NextFunction ): Promise<any> => {
  		try {
  			const body: IUserBodyPayloadDTO = <IUserBodyPayloadDTO>req.body;
  			const response: IResponse = await this._userService.update( req.params.id, body );
  			return res.status( response.statusCode ).json( response );
  		} catch ( e ) {
  			next( e );
  		}
  	};

  @Delete( '/:id' )
  public  delete = async ( req: Request, res: Response, next: NextFunction ): Promise<any> => {
  		try {
  			const response: IResponse = await this._userService.delete( req.params.id );
  			return res.status( response.statusCode ).json( response );
  		} catch ( e ) {
  			next( e );
  		}
  	};
}

import Responses from 'config/responses';
import { IUserModel } from 'models/user.model';
import { IResponse } from 'types';
import { Service } from 'typedi';
import UserQueries from '../mongo/user.queries';
import { IUserBodyPayloadDTO } from 'api/dto/user.dto';

@Service()
class UserService {

	constructor (
		private _userQueries: UserQueries
	) {}
	public create = async ( body: IUserBodyPayloadDTO ): Promise<IResponse> => {
		const createUser: IUserModel = await this._userQueries.addUser( body );
		const response: IResponse = Responses[200]( createUser );
		return response;
	};

	public get = async ( id?: string ): Promise<IResponse> => {
		if ( id ) {
			const user: IUserModel = await this._userQueries.getById( id );
			if ( user && user._id ) {
				return Responses[200]( user );
			} else {
				return Responses[404]( 'User not found.' );
			}
		} else {
			const users: IUserModel[] = await this._userQueries.getAll();
			const response: IResponse = Responses[200]( users );
			return response;
		}
	};

	public update = async ( id: string, body: IUserBodyPayloadDTO ): Promise<IResponse> => {
		const updatedUser: IUserModel = await this._userQueries.update( id, body );
		if ( updatedUser && updatedUser._id ) {
			return Responses[200]( updatedUser );
		} else {
			return Responses[404]( 'User not found' );
		}
	};

	public delete = async ( id: string ): Promise<IResponse> => {
		const deletedUser: IUserModel = await this._userQueries.delete( id );
		if ( deletedUser._id ) {
			return Responses[200]( deletedUser );
		} else {
			return Responses[404]( 'User not found' );
		}
	};
}

export default UserService;
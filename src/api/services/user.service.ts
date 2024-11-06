import Responses from 'config/responses';
import userModel, { IUserModel } from 'models/user.model';
import { IResponse, IUserPayload } from 'types';
import { Service } from 'typedi';

@Service()
class UserService {


	public create = async ( body: IUserPayload ): Promise<IResponse> => {
		const createUser: IUserModel = await userModel.create( body );
		const response: IResponse = Responses[200]( createUser );
		return response;
	};

	public read = async (  ): Promise<IResponse> => {
		const users: IUserModel[] = await userModel.find();
		const response: IResponse = Responses[200]( users );
		return response;
	};

	public update = async ( id: string, body: IUserPayload ): Promise<IResponse> => {
		const updatedUser: IUserModel = await userModel.findByIdAndUpdate( id, body, { new: true } );
		if ( updatedUser._id ) {
			return Responses[200]( updatedUser );
		} else {
			return Responses[404]( 'User not found' );
		}
	};

	public delete = async ( id: string ): Promise<IResponse> => {
		const deletedUser: IUserModel = await userModel.findByIdAndDelete( id );
		if ( deletedUser._id ) {
			return Responses[200]( deletedUser );
		} else {
			return Responses[404]( 'User not found' );
		}
	};
}

export default UserService;
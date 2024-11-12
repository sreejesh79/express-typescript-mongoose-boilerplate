import { Service } from 'typedi';
import { IUserBodyPayloadDTO } from '../dto/user.dto';
import userModel, { IUserModel } from 'models/user.model';

@Service()
class UserQueries {

	public addUser = async ( payload: IUserBodyPayloadDTO ): Promise<IUserModel> => {
		const newUser: IUserModel = await userModel.create( payload );
		return newUser;
	};

	public getAll = async (): Promise<IUserModel[]> => {
		const users: IUserModel[] = await userModel.find()
			.lean()
			.exec();
		return users;
	};

	public getById = async ( id: string ): Promise<IUserModel> => {
		const user: IUserModel = await userModel.findById( id )
			.lean()
			.exec();
		return user;
	};

	public update = async ( id: string, payload: IUserBodyPayloadDTO ): Promise<IUserModel> => {
		const user: IUserModel = await userModel.findByIdAndUpdate( id, payload, {
			new: true
		} );
		return user;
	};

	public delete = async ( id: string ): Promise<IUserModel> => {
		const deletedUser: IUserModel = await userModel.findByIdAndDelete( id );
		return deletedUser;
	};
}

export default UserQueries;
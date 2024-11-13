import { Service } from 'typedi';
import RoleModel, { IRoleModel } from 'models/role.model';
import Responses from 'config/responses';
import { IResponse } from 'types';

@Service()
class RoleQueries {

	public addRole = async ( name: string ): Promise<IResponse> => {
		const newRole: IRoleModel = await RoleModel.create( {
			name
		} );
		const response: IResponse = Responses[200]( newRole );
		return response;
	};


	public getRoles = async (): Promise<IResponse> => {
		const roles: IRoleModel[] = await RoleModel.find( {
			machine_name: { $ne: 'admin' }
		} )
			.lean()
			.exec();
		return Responses[200]( roles );
	};

	public getRolesByIds = async ( ids: string[] ): Promise<IRoleModel[]> => {
		const roles: IRoleModel[] = await RoleModel.find( { _id : { '$in': ids } } )
			.lean()
			.exec();
		return roles;
	};

	public getRoleByMachineName = async ( machineName: string ): Promise<IRoleModel> => {
		const role = await RoleModel.findOne( {
			machine_name: machineName
		} ).lean().exec();
		return role;
	};
}

export default RoleQueries;

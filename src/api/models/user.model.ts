import { Document, Schema, Model, model } from 'mongoose';
import bcrypt from 'bcrypt';


export interface IUserModel extends Document{
    _id: string;
    mobile: string;
    email: string;
    fullname: string;
    username: string;
    password: string;
}
const types = Schema.Types;
const userSchema: Schema = new Schema( {
	username: { type: types.String, index: true, unique: true, required: true },
	password: { type: types.String, required: true },
	email: { type: types.String, unique: true, required: true, index: true },
	mobile: { type: types.String, unique: true, required: true, index: true },
	firstName: { type: types.String, index: true },
	lastName: { type: types.String, index: true },
} );

/* eslint-disable */
userSchema.pre<any>( 'save', function ( next: any ) {
	if ( this.password && this.isModified( 'password' ) ) {
		const user: any = this;
		const saltRounds = 10;
		try {
			const salt = bcrypt.genSaltSync( saltRounds );
			const hash = bcrypt.hashSync( user.password, salt );
			user.password = hash;
			user.token = '';
			return next();
		}catch( e ) {
			return next( e );
		}
	}
	return next();
} );


userSchema.set( 'toJSON', {
	transform ( doc, ret, opt ) {
		delete ret['password'];
		return ret;
	}
} );

const userModel: Model<IUserModel> = model<IUserModel>( 'User', userSchema );
export default userModel;
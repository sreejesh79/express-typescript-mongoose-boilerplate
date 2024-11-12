import { Document, Schema, Model, model } from 'mongoose';
import { PasswordUtils } from '../../utils/password.utils';


export interface IUserModel extends Document{
    _id: string;
	fullname: string;
    email: string;
    password: string;
	createdAt: number;
	updatedAt: number;
}
const types = Schema.Types;
const userSchema: Schema = new Schema( {
	fullname: { type: types.String, index: true },
	email: { type: types.String, unique: true, required: true, index: true },
	password: { type: types.String, required: true },
} , {
	timestamps: true
} );

/* eslint-disable */
userSchema.pre<any>( 'save', async function ( next: any ) {
	if ( this.password && this.isModified('password') ) {
        try {
            this.password = await PasswordUtils.hashPassword( this.password );
            return next();
        }catch(e) {
            return next(e);
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
/* eslint-disable */ 
import { RouteDefinition  } from 'config/routes';

export function Get ( path: string ) {
	return ( target: any, propertyKey: string ): void => {
		if ( !Reflect.hasMetadata( 'routes', target.constructor ) ) {
			Reflect.defineMetadata( 'routes', [], target.constructor );
		}
		const routes = Reflect.getMetadata( 'routes', target.constructor ) as RouteDefinition[];
		routes.push( {
			method: 'get',
			path,
			methodName: propertyKey
		} );
		Reflect.defineMetadata( 'routes', routes, target.constructor );
	};
}

export function Post ( path: string, middlewares?: [] ) {
	return ( target: any, propertyKey: string ): void => {
		if ( !Reflect.hasMetadata( 'routes', target.constructor ) ) {
			Reflect.defineMetadata( 'routes', [], target.constructor );
		}
		const routes = Reflect.getMetadata( 'routes', target.constructor ) as RouteDefinition[];
		routes.push( {
			method: 'post',
			path,
			methodName: propertyKey
		} );
		Reflect.defineMetadata( 'routes', routes, target.constructor );
	};
}

export function Delete ( path: string ) {
	return ( target: any, propertyKey: string ): void => {
		if ( !Reflect.hasMetadata( 'routes', target.constructor ) ) {
			Reflect.defineMetadata( 'routes', [], target.constructor );
		}
		const routes = Reflect.getMetadata( 'routes', target.constructor ) as RouteDefinition[];
		routes.push( {
			method: 'delete',
			path,
			methodName: propertyKey
		} );
		Reflect.defineMetadata( 'routes', routes, target.constructor );
	};
}

export function Put ( path: string ) {
	return ( target: any, propertyKey: string ): void => {
		if ( !Reflect.hasMetadata( 'routes', target.constructor ) ) {
			Reflect.defineMetadata( 'routes', [], target.constructor );
		}
		const routes = Reflect.getMetadata( 'routes', target.constructor ) as RouteDefinition[];
		routes.push( {
			method: 'put',
			path,
			methodName: propertyKey
		} );
		Reflect.defineMetadata( 'routes', routes, target.constructor );
	};
}

export function Use ( path: string ) {
	return ( target: any, propertyKey: string ): void => {
		if ( !Reflect.hasMetadata( 'routes', target.constructor ) ) {
			Reflect.defineMetadata( 'routes', [], target.constructor );
		}
		const routes = Reflect.getMetadata( 'routes', target.constructor ) as RouteDefinition[];
		routes.push( {
			method: 'use',
			path,
			methodName: propertyKey
		} );
		Reflect.defineMetadata( 'routes', routes, target.constructor );
	};
}

export function All ( path: string ) {
	return ( target: any, propertyKey: string ): void => {
		if ( !Reflect.hasMetadata( 'routes', target.constructor ) ) {
			Reflect.defineMetadata( 'routes', [], target.constructor );
		}
		const routes = Reflect.getMetadata( 'routes', target.constructor ) as RouteDefinition[];
		routes.push( {
			method: 'all',
			path,
			methodName: propertyKey
		} );
		Reflect.defineMetadata( 'routes', routes, target.constructor );
	};
}
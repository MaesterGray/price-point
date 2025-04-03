// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Session {
			id: string;
			expiresAt: Date;
			token: string;
			createdAt: Date;
			updatedAt: Date;
			ipAddress: string;
			userAgent: string;
			userId: string;
		}

		interface User {
			id: string;
			name: string;
			email: string;
			emailVerified: boolean;
			image?: string;
			createdAt: Date;
			updatedAt: Date;
		}

		interface Locals {
			session?: {
				session: Session;
				user: User;
			};
		}
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

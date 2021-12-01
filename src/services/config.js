export default {
	firebase: {
		apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
		authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
		projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
		storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
		appId: process.env.REACT_APP_FIREBASE_APP_ID
	},
	routes: {
		index: {
			pathname: '/',
			isCaseSensitive: true,
			isProtected: false
		},
		login: {
			pathname: '/login',
			isCaseSensitive: false,
			isProtected: false
		},
		register: {
			pathname: '/register',
			isCaseSensitive: false,
			isProtected: false
		},
		entity: {
			pathname: '/admin/:entityName/:actionName',
			isCaseSensitive: true,
			isProtected: true
		},
		admin: {
			pathname: '/admin',
			isCaseSensitive: true,
			isProtected: true
		}
	},
	entities: {
		learning: {
			fields: {			
				name: {
					type: "string"
				},
				category: {
					type: "string"
				},
				resource: {
					type:"string"
				}
			}
		},
		project: {
			fields: {
				projecta: {
					type: "string"
				},
				projectb: {
					type: "number"
				}
					
			}
		},
		phase: {
			fields: {
				name: {
					type: "string"
				},
				learningDays: {
					type: "number"
				},
				learning: {
					type: "ref",
					reference: "learning"
				},
				project: {
					type: "ref",
					reference: "project"
				}
			}
		},
		roadmap: {
			fields: {
				name: {
					type: "string"
				}
			}
		}
	}
};
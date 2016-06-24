var constants = {
   connectionString: 'mongodb://localhost/workout_tracker',
   uri: 'http://localhost:3000/',
   messages: {
       not_foud_exception: 'Document not found',
       generic_exception: 'Exception: ',
       created: 'Document created ',
       duplicated: 'Document already exists',
       updated: 'Document updated',
       removed: 'Document removed'
   },
   routes: {
       empresa: {
           uri: '/empresa',
           name: 'empresa'
       },
       workout: {
           uri: '/workouts',
           name: 'workouts'
       },
       user: {
           uri: '/users',
           name: 'users'
       },
       root: {
           uri: '/',
           name: 'root'
       }
   },
   models: {
       empresa: {
           distance: 8,
           limit: 10
       }
   }
};

module.exports = constants;
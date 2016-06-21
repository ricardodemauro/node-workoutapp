var constants = {
   connectionString: 'mongodb://localhost/workout_tracker',
   messages: {
       not_foud_exception: 'Document not found',
       generic_exception: 'Exception: ',
       created: 'Document created ',
       duplicated: 'Document already exists',
       updated: 'Document updated',
       removed: 'Document removed'
   },
   routes: {
       estabelecimento: {
           uri: '/estabelecimentos',
           name: 'estabelecimentos'
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
   }
};

module.exports = constants;
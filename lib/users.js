var users = [];

exports.getUsers = function(callback) {

  process.nextTick(function() {
    callback(null, users);
  });

};

exports.getUser = function(id, callback) {

  process.nextTick(function() {

    // will explore *much* better ways of doing this in future sessions
    var i, user;

    for (i = 0; i < users.length; i++) {
      user = users[i];
      if (user.id === id) return callback(null, user);
    }

    // not found
    callback();

  });

};

exports.addUser = function(user, callback) {

  process.nextTick(function() {

    if (!user.name) return callback (new Error('missing user name'));

    var id = (users.length + 1).toString();

    user.id = id;

    users.push(user);

    callback(null, user);

  });

};


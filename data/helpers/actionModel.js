const db = require('../dbConfig.js');
const mappers = require('./mappers');

module.exports = {
  get(id) {
    const query = db('actions');

    if (id) {
      return query
        .where('id', id)
        .first()
        .then((action) => {
          if (action) return mappers.actionToBody(action);
          return action;
        });
    }

    return query.then((actions) => actions.map((action) => mappers.actionToBody(action)));
  },
  insert(action) {
    return db('actions')
      .insert(action)
      .then(([id]) => this.get(id));
  },
  update(id, changes) {
    return db('actions')
      .where('id', id)
      .update(changes)
      .then((count) => (count > 0 ? this.get(id) : null));
  },
  remove(id) {
    return db('actions')
      .where('id', id)
      .del();
  },
};

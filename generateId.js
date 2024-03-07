function generateId(prefix) {
    const id = prefix + '-' + Math.floor(Math.random() * 100000);
    let database;
    try {
      database = JSON.parse(fs.readFileSync('databasee.json', 'utf8'));
    } catch (err) {
      console.error('Error reading databasee.json: ', err);
      return;
    }
    if (!Array.isArray(database)) {
      console.error('databasee.json is not an array');
      return;
    }
    database.push({ id });
    try {
      fs.writeFileSync('databasee.json', JSON.stringify(database, null, 2));
    } catch (err) {
      console.error('Error writing to databasee.json: ', err);
    }
    return id;
  }
  
  module.exports = { generateId };
const { MongoClient, ServerApiVersion } = require('mongodb');


const uri = "mongodb+srv://baron:xjFQyvqxnup6vKfQ@lionbot.ymq2zpo.mongodb.net/?retryWrites=true&w=majority&appName=LionBot";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

async function importData() {
  try {
    const dataMappings = [
      { filename: 'databasee.json', collectionName: 'LionBotId' },
      { filename: 'converted_data.json', collectionName: 'LionBotXp' }
    ];
    let totalCount = 0;

    for (const { filename, collectionName } of dataMappings) {
      const jsonData = fs.readFileSync(filename, 'utf8');
      const data = JSON.parse(jsonData);

      console.log(`Trying to read data from ${filename}.`);

      if (!Array.isArray(data)) {
        console.error('Data must be an array of documents.');
        continue;
      }

      if (data.length === 0) {
        console.log('Data is empty.');
        continue;
      }

      const collection = client.db('Datenbank').collection(collectionName);
      const result = await collection.insertMany(data);
      totalCount += result.insertedCount;
      console.log(`${result.insertedCount} documents successfully inserted into the ${collectionName} collection from ${filename}.`);
    }

    console.log(`${totalCount} documents successfully inserted into the database.`);
  } catch (error) {
    console.error('Error saving data to MongoDB:', error);
  }
}

async function main() {
  await run();
  await importData();
  await client.close();
}

main().catch(console.error);
///////////
const cron = require('node-cron');

// Funktion zum Lesen der Daten aus der Datenbankdatei
function readDataFromFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Fehler beim Lesen der Datei:', err);
    return null;
  }
}

// Funktion zum Konvertieren der Daten
function convertData(obj) {
  const usersArray = [];
  for (const user in obj.users) {
    const userData = {
      id: user,
      exp: obj.users[user].exp,
      level: obj.users[user].level,
      role: obj.users[user].role
    };
    usersArray.push(userData);
  }
  return usersArray;
}

// Dateiname der Datenbankdatei
const databaseFilename = 'database.json';

// Funktion zum Speichern der konvertierten Daten in eine neue Datei
function saveConvertedData() {
  const data = readDataFromFile(databaseFilename);
  if (data) {
    const convertedData = convertData(data);
    fs.writeFile('converted_data.json', JSON.stringify(convertedData, null, 2), (err) => {
      if (err) {
        console.error('Fehler beim Schreiben der Datei:', err);
        return;
      }
      console.log('Daten erfolgreich konvertiert und in "converted_data.json" gespeichert.');
    });
  }
}

// Cron-Job zum regelmäßigen Speichern der Daten (z. B. alle 5 Minuten)
cron.schedule('*/5 * * * *', () => {
  console.log('Automatisches Speichern gestartet...');
  saveConvertedData();
});

console.log('Heart.js gestartet.');
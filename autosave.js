const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const cron = require('cron');

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

    // Starte den Cron-Job erneut, nachdem der Importvorgang abgeschlossen ist
    job.start();
  } catch (error) {
    console.error('Error saving data to MongoDB:', error);
  }
}

async function main() {
  await run();
  await importData();
  await client.close();
}

// Cron-Job für die einmalige Ausführung der Funktion alle 5 Minuten
const job = new cron.CronJob('1 * * * * *', async () => {
  console.log('Automatisches Speichern gestartet...');
  // Stoppe den Cron-Job, während der Importvorgang läuft
  job.stop();
  await importData();
});

// Starte den Cron-Job
job.start();

// Führe main() einmalig aus
main().catch(console.error);

const fs = require('fs').promises;
const cron = require('cron');

// Funktion zum Lesen der Daten aus der Datenbankdatei
async function readDataFromFile(filename) {
  try {
    const data = await fs.readFile(filename, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('Die Datenbankdatei existiert nicht:', filename);
    } else {
      console.error('Fehler beim Lesen der Datei:', err);
    }
    return null;
  }
}

// Funktion zum Konvertieren der Daten
function convertData(obj) {
  return Object.entries(obj.users).map(([id, userData]) => ({
    id,
    exp: userData.exp,
    level: userData.level,
    role: userData.role
  }));
}

// Dateiname der Datenbankdatei
const databaseFilename = 'database.json';

// Funktion zum Konvertieren und Speichern der Daten
async function saveConvertedData() {
  const data = await readDataFromFile(databaseFilename);
  if (data) {
    const convertedData = convertData(data);
    try {
      await fs.writeFile('converted_data.json', JSON.stringify(convertedData, null, 2));
      console.log('Daten erfolgreich konvertiert und in "converted_data.json" gespeichert.');
    } catch (err) {
      console.error('Fehler beim Schreiben der Datei:', err);
    }
  }
}

// Cron-Job für die periodische Ausführung der Funktion
const job = new cron.CronJob('* * * * * *', () => {
  console.log('Automatisches Speichern gestartet...');
  saveConvertedData();
});

// Starten des Cron-Jobs
job.start();

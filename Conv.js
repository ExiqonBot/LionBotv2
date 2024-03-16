const fs = require('fs');
const cron = require('cron');

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

// Funktion zum Konvertieren und Speichern der Daten
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

// Cron-Job für die periodische Ausführung der Funktion
const job = new cron.CronJob('* * * * * *', () => {
  console.log('Automatisches Speichern gestartet...');
  saveConvertedData();
});

// Starten des Cron-Jobs
job.start();

const indexedDB =
    window.indexedDB ||
    window.webkitIndexedDB ||
    window.mozIndexedDB ||
    window.OIndexedDB ||
    window.msIndexedDB,
  IDBTransaction =
    window.IDBTransaction ||
    window.webkitIDBTransaction ||
    window.OIDBTransaction ||
    window.msIDBTransaction,
  dbVersion = 1;

class DB {
  constructor(dbName) {
    this.request = indexedDB.open(dbName, dbVersion);
    request.onsuccess = (event) => {
      console.log('Success creating/accessing IndexedDB database');
      this.db = request.result;

      this.db.onerror = (event) => {
        console.error('Error creating/accessing IndexedDB database');
      };

      // Interim solution for Google Chrome to create an objectStore. Will be deprecated
      if (db.setVersion) {
        if (db.version != dbVersion) {
          var setVersion = db.setVersion(dbVersion);
          setVersion.onsuccess = function () {
            createObjectStore(db);
            getImageFile();
          };
        } else {
          getImageFile();
        }
      } else {
        getImageFile();
      }
    };

    // For future use. Currently only in latest Firefox versions
    request.onupgradeneeded = function (event) {
      createObjectStore(event.target.result);
    };
  }

  open
}

export default {};

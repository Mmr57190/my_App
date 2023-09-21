import * as SQLite from 'expo-sqlite';

export class SoRealDB {
    constructor() {
        this.db = SQLite.openDatabase('soreal.db');
        this.init();
    }

    init() {
        this.db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS photos (id INTEGER PRIMARY KEY AUTOINCREMENT, uri TEXT NOT NULL);');
        });
    }

    test(photos) {
        return photos;
    }

    getPhotos() {
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql('SELECT * FROM photos;', [],
                    (txObj, resultSet) => resolve((resultSet.rows._array)),
                    (txObj, error) => reject(error)
                );
            });
        });
    }

    addPhoto(uri) {
        this.db.transaction((tx) => {
            tx.executeSql('INSERT INTO photos (uri) VALUES (?);', [uri],
                (txObj, resultSet) => console.log(resultSet.insertId),
                (txObj, error) => console.log('Error', error)
            );
        });
    }

    deletePhoto(id) {
        console.log(id)
        this.db.transaction((tx) => {
            tx.executeSql('DELETE FROM photos WHERE id = ?;', [id],
                (txObj, resultSet) => console.log(resultSet.insertId),
                (txObj, error) => console.log('Error', error)
            );
        });
    }
}

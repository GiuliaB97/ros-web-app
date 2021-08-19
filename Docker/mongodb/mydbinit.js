var conn = new Mongo();
var db = conn.getDB('aws-ros-web-app');

// crea la collection 'alignments' e la lascia come e' se gia' esiste
db.createCollection('users', function(err, collection) {});

// elimina gli eventuali documenti della collection 'alignments'
try {
   db.users.deleteMany( { } );
} catch (e) {
   print (e);
}

// visualizza documenti esistenti
var cursor = db.users.find();
while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}

// inserisce un documento
db.users.insert({"_id" : {"$oid":"6117a745c5c72d2b09e891ea"},
  "name" : "Seymour",
  "surname" : "Papert",
  "email" : "s@gmail.com",
  "password" : "$2b$10$hmlngR08LevowH4C0Jx6BeswxXkSMlftIR.Y5hqcMSaUS.LnAmWjO",
  "salt" : "$2b$10$hmlngR08LevowH4C0Jx6Be"
})

// visualizza documenti esistenti
var cursor = db.users.find();

while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}


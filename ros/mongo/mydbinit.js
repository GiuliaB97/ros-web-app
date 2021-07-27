var conn = new Mongo();
var db = conn.getDB('db-aws');

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
db.users.insert({"_id":{"$oid":"60d328752c04a91374bf5086"},"name":"G","surname":"G","email":"g@gmail.com","password":"$2b$10$bk4c0MSyzysT1Ahdrui99uxRml9BDODyAO0pBQiHnzSG4.jSUX3sW","salt":"$2b$10$bk4c0MSyzysT1Ahdrui99u"})

// visualizza documenti esistenti
var cursor = db.users.find();

while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}


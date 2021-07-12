**Nodejs**
* piattaforma software cross-platform; 
  * non è un web server e neanche un linguaggio; 
  * è una piattaforma web che permette di eseguire codice JavaScript lato server.
  * Può essere usato per sviluppare un web server.
  
* Caratteristiche: Single-threaded, Event-driven architecture, Asynchronous, Non blocking I/O model

* eseguire un file:
`node app.js`
  
**Moduli Costum**
* Un modulo custom è un file JS che implementa alcune funzioni e le
espone tramite un oggetto exports 
  
* Le funzioni appese all’oggetto exports diventano pubbliche. Tutte le altre
restano private 
  
* Importare un modulo:
  * Specificando solo il nome del modulo da importare, questo verrà cercato nella cartella
node_modules
    * Per importare un modulo custom bisogna specificare il path relativo (o assoluto)
    
**Mongoose**
* «elegant mongodb object modeling for node.js»
* «Mongoose provides a straight-forward, schema-based solution to model your
application data. It includes built-in type casting, validation, query building, business
logic hooks and more, out of the box.» 
  
* In Mongoose è sempre necessario uno schema che mappi la struttura dei
  documenti della collezione
* Nello schema va specificato il tipo dei dati, eventuali valori di default, ecc.

* I tipi di dato disponibili sono:String, Number, Date, Buffer, Boolean, Mixed, Objectid, Array
* Everything in Mongoose starts with a Schema. 
  Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
  
* “Models are fancy constructors compiled from our Schema definitions.
  Instances of these models represent documents which can be saved and
  retrieved from our database. All document creation and retrieval from the
  database is handled by these models.”
  
* Mongoose è basato sul concetto di Schema
  * Ogni Schema mappa una collezione e definisce la forma dei documenti all’interno della
  collezione.
  * Lo schema è già definito nel file moviesModel.js.
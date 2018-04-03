var mysql=require('mysql');

var connection=mysql.createPool({
 
/* host:'itribedbinstance.cdcnrqweikkn.us-east-2.rds.amazonaws.com',
 user:'iTribe',
 password:'qwQWasASzxZX',
 database:'itribedb'*/

 host:'localhost',
 user:'root',
 password:'',
 database:'itribedb'
 
});

connection.getConnection(function(err, connection) {
  	
  	if(err)
  	{
  		console.log("database error ",err);	
  	}
  	else
  	{
  		console.log("Database Connected");		
  	}
  //console.log("database error ",err);

});


connection.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});

module.exports=connection;
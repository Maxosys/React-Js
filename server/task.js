var db=require('./dbconnection'); //reference of dbconnection.js
 
var Task={
 
getAllUsers:function(callback){
 
return db.query("Select * from itribe_users",callback);
 
},
 getUserById:function(id,callback){
 
return db.query("select * from itribe_users where Id=?",[id],callback);
 },
 addUser:function(Task,callback){
 return db.query("Insert into itribe_users values(?,?,?)",[Task.name,Task.email,Task.password],callback);
 },
 deleteTask:function(id,callback){
  return db.query("delete from itribe_users where Id=?",[id],callback);
 },
 updateUser:function(id,Task,callback){
  return db.query("update itribe_users set Title=?,Status=? where Id=?",[Task.name,Task.Status,id],callback);
 }
 
};
 module.exports=Task;
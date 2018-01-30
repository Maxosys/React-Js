// server/app.js
const express = require('express');
const app = express();
//const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
//var router = express.Router();
//var mysql = require('mysql');
const sgMail = require('@sendgrid/mail');
const SHA256 = require("crypto-js/sha256");
const fileUpload = require('express-fileupload');
const cors = require('cors');
//let multiparty = require('multiparty');
let fs = require('fs');



sgMail.setApiKey('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');

var commudata = [];

//connect to mysql don't use var tomake it global

var db = require('./dbconnection'); //reference of dbconnection.js

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));


app.use(cors());


//app.use(bodyParser.json({limit:1024102420}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(cookieParser());
//app.use(fileUpload());

//app.use('/upload-image', uploadImage);

/*

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use( bodyparser.raw({limit: '50mb'}) );
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use( bodyparser.text({
    type : 'application/text-enriched', 
    limit: '50mb'
}) ); 

*/

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));


var routers = require('./routers');

app.use('/',routers);

// update profile in router



app.post('/api/updateprofile', function(req, res, next) {

    db.getConnection(function(err, connection) {

           var postBody = req.body.task;    

            var user_id             = postBody.user_id;
            var user_name           = postBody.user_name;
            var user_location       = postBody.user_location;          
            var userpic       		= postBody.userpic; 

    connection.query('update `itribe_users` set `name` = "'+user_name+'" , `location` = "'+user_location+'"  where id = "'+user_id+'" ', function(err, rows) {

     console.log(err); 

           res.send({ msg: 'Successfully Updated' });   
        });
 

    });

});

// end 


// get message Friends list

app.get('/api/callApiGetFriendList', (req, res) => {

     db.getConnection(function(err, connection) {

    	var postBody     = req.query;    
		var sender_id      = postBody.sender_id;		
   
    	var result = [];
    	var commIdArr = [];

    connection.query("SELECT * FROM itribe_messages WHERE sender_id='" + sender_id + "' OR reciver_id = '"+sender_id+"' ", function(err, rows) {
    
    console.log(err);

    //res.send({ express: 'Hello From Express' });
            if (!err && rows.length > 0) {
            
                rows.forEach((row) => {
                    commIdArr.push(row.sender_id);
                    commIdArr.push(row.reciver_id);
                });           

            	var community_id = 1;

        	connection.query('SELECT * from itribe_users where  itribe_users.id IN  ('+commIdArr+') and itribe_users.id NOT IN ('+sender_id+') ', function (error, results, fields) {
            if (error) throw error;
                
                res.send(JSON.stringify(results));
            
            });

            }
            else
            {
                res.json({ msg: 'Not Found Any Friend' });
            }   
       });
 });

});


// get message getConversationSR

app.get('/api/getConversationSR', (req, res) => {

     db.getConnection(function(err, connection) {

    	var postBody     = req.query;    
		var sender_id      = postBody.sender_id;
		var reciver_id     = postBody.reciver_id; 
   
    	var result = [];
    	var commIdArr = [];

console.log("SELECT * FROM itribe_messages WHERE (sender_id='" + sender_id + "' and reciver_id = '"+reciver_id+"') OR (sender_id='" + reciver_id + "' and reciver_id = '"+sender_id+"') and  status = '1' ");
    connection.query("SELECT * FROM itribe_messages WHERE (sender_id='" + sender_id + "' and reciver_id = '"+reciver_id+"') OR (sender_id='" + reciver_id + "' and reciver_id = '"+sender_id+"') and  status = '1' ", function(err, rows) {
    
    	console.log(err);

    //res.send({ express: 'Hello From Express' });
            
            if (!err && rows.length > 0) {                

        	  res.json(rows);

            }
            else
            {
                res.json([]);
            }
    	});
	});
});



// Add Message DONE

app.post('/api/addmessage', function(req, res, next) {

    db.getConnection(function(err, connection) {

            var postBody       = req.body.task;          

            var sender_id      = postBody.sender_id;
            var reciver_id     = postBody.reciver_id;
            var msg_text       = postBody.msg_text;
            var status         = 1;
            var community_id   = postBody.community_id;
            var chat_file 	   = 'text'; //postBody.chat_file;
            var file_extension = '';//postBody.file_extension;

     connection.query('INSERT INTO `itribe_messages` (`sender_id`, `reciver_id`, `msg_text`, `status`, `community_id`, `chat_file`, `file_extension`) ' +
      'VALUES (?, ? , ?, ?, ?, ?, ?)',[sender_id, reciver_id, msg_text, status, community_id, chat_file, file_extension], function(err, rows) {

     console.log(err);
     
    if (rows.affectedRows) {

      connection.query("SELECT * FROM itribe_messages WHERE msg_id='" + rows.insertId + "' LIMIT 1", function(err, rows) {

        if (!err && rows.length > 0) {

            res.json(rows[0]);

        } else {

            res.json([]);
        }

    });

            }

        });
 

    });

});



// get All Joined Communities by user id DONE

app.get('/api/joinedcommunitybyuid', (req, res) => {

     db.getConnection(function(err, connection) {

    var postBody     = req.query;                 
    var user_id      = postBody.uid;    
   
    var result = [];
    var commIdArr = [];

    connection.query("SELECT * FROM itribe_commu_members WHERE user_id='" + user_id + "' and user_join_status = '1' ", function(err, rows) {
    
    console.log(err);

    //res.send({ express: 'Hello From Express' });
            if (!err && rows.length > 0) {
            
                rows.forEach((row) => {
                    commIdArr.push(row.commun_id);
                });           

            var community_id = 1;

          db.query('SELECT * from itribe_community,itribe_users where  itribe_community.community_owner_id = itribe_users.id and itribe_community.community_id IN  ('+commIdArr+') ', function (error, results, fields) {
            if (error) throw error;
                
                res.send(JSON.stringify(results));
            
            });
               
              // res.contentType('application/json');          

            }
            else
            {
                res.json({ msg: 'Not Found Any Joined Community' });
            }

    });
});
});

// Join Community DONE

app.get('/api/joincommunity', function(req, res, next) {
   

    db.getConnection(function(err, connection) {

        var postBody         = req.query;
            
        console.log(postBody);

            var commun_id        = postBody.commun_id;
            var user_id          = postBody.user_id;
            var user_join_status = 0;
            var status           = 1;

    connection.query("SELECT * FROM itribe_commu_members WHERE user_id='" + user_id + "' and commun_id = '"+ commun_id+"'  LIMIT 1", function(err, rows) {
    
    console.log(err);

    //res.send({ express: 'Hello From Express' });
    if (!err && rows.length > 0) {

        res.json({ msg: 'Already Joined' });
    }
    else
    {
        connection.query('INSERT INTO `itribe_commu_members` (`commun_id`, `user_id`, `user_join_status`, `status`) ' +
        'VALUES (?, ? , ?, ?)',[commun_id, user_id, user_join_status, status], function(err1, rows1) {

        console.log(err1);

        if (rows1.affectedRows) {

        connection.query("SELECT * FROM itribe_commu_members WHERE commun_rel_id='" + rows1.insertId + "' LIMIT 1", function(err, rows) {

        if (!err && rows.length > 0) {

        res.json(rows[0]);

        } else {

        res.json([]);
        }
        });
        }

        });   // end join insert query 

    }

     

    }); 

    });

});


// Delete Join Requests

app.get('/api/delete_join_request', (req, res) => {

	db.getConnection(function(err, connection) {

        var postBody     		= req.query;                 
        var commun_rel_id       = postBody.commun_rel_id; 
        var user_id      		= postBody.user_id; 

    connection.query('delete from `itribe_commu_members` where commun_rel_id = "'+commun_rel_id+'"  and user_id = "'+user_id+'" ', function(err, rows) {

     console.log(err); 

           res.send({ msg: 'Successfully Rejected' });   
        });

    });

});

// Approved Join Requests

app.get('/api/approve_join_request', (req, res) => {

	     db.getConnection(function(err, connection) {

        var postBody     		= req.query;                 
        var commun_rel_id       = postBody.commun_rel_id; 
        var user_id      		= postBody.user_id; 

            connection.query('update `itribe_commu_members` set `user_join_status` = "1"  where commun_rel_id = "'+commun_rel_id+'"  and user_id = "'+user_id+'" ', function(err, rows) {

     console.log(err); 

           res.send({ msg: 'Successfully Approved' });   
        });

    });

});

// Get Invitation Sending Requests

app.get('/api/getpendingjoins', (req, res) => {

    

     db.getConnection(function(err, connection) {

        var postBody     = req.query;                 
        var user_id      = postBody.uid;    

        var result = [];
        var commIdArr = []; 

   connection.query('SELECT community_id from itribe_community where  itribe_community.community_owner_id = ? ',[user_id], function (err, rows, fields) {
    if (err) throw err;
    
            console.log(rows);

            if (!err && rows.length > 0) {
            
                rows.forEach((row) => {
                    commIdArr.push(row.community_id);
                });           

            var community_id = 1;

//console.log('SELECT * from itribe_commu_invitation ici,itribe_users iu,itribe_community ic where  ic.community_id = ici.commu_id and ici.user_id = iu.id and ici.commu_id IN  ('+commIdArr+') and ici.status = 0');
 
//console.log('SELECT * from itribe_commu_members,itribe_users,itribe_community ic where  ic.community_id = itribe_commu_members.commun_id and itribe_commu_members.user_id = itribe_users.id and itribe_commu_members.commun_id IN  ('+commIdArr+') and user_join_status = 0');

          connection.query('SELECT * from itribe_commu_members,itribe_users,itribe_community ic where  ic.community_id = itribe_commu_members.commun_id and itribe_commu_members.user_id = itribe_users.id and itribe_commu_members.commun_id IN  ('+commIdArr+') and user_join_status = 0', function (error, results, fields) {
            if (error) throw error;
                
                res.send(JSON.stringify(results));
            
            });               
              
              // res.contentType('application/json');
             

            }
            else
            {
                res.json([]);

            }
    
    
    }); //3

   }); //2

}); // 1


// Get list of community by cid and invitation id

app.get('/api/communitybycidinviteid', (req, res) => {

    var postBody     = req.query;                 
    var community_id = postBody.cid;   
    var inviteid     = postBody.inviteid;   

    db.query('SELECT * from itribe_commu_invitation, itribe_community,itribe_users where itribe_commu_invitation.invitation_id= ? and  itribe_commu_invitation.commu_id = itribe_community.community_id and itribe_community.community_owner_id = itribe_users.id',[inviteid,'1'], function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
    });
     

});


// send invitaions to other users

app.post('/api/sendinvitaion', function(req, res, next) {

    db.getConnection(function(err, connection) {
            
            var postBody = req.body.task;
               
            var user_id         = postBody[0].user_id;
            var commu_id        = postBody[0].commu_id;
            var user_emailidarr = postBody[1].emailids;  

            var community_name   = "";         
            var community_title  = "";   
            var ownername        = "";   


    connection.query('SELECT * from itribe_community,itribe_users where  itribe_community.community_id = ? and itribe_community.community_status = ? and itribe_community.community_owner_id = itribe_users.id',[commu_id,'1'], function (error, results, fields) {
    
    if (error) throw error;

    community_name   = results[0].community_name;
    community_title  = results[0].community_tagline;
    ownername        = results[0].name;  
                
        for(var i=0 ; i < user_emailidarr.length; i++ )
        {
               var user_emailid = user_emailidarr[i];             


            connection.query('INSERT INTO `itribe_commu_invitation` (`user_id`, `commu_id`, `user_emailid`) ' +
              'VALUES (?, ? , ?)',[user_id, commu_id, user_emailid], function(err, rows) {

             console.log(err);          
           
                if (rows.affectedRows) {

                             var invitationid = rows.insertId;

var htmlContent = '<html>Hi <br/> <strong> Please click on verify link    </strong></html>';

var joinurl = "http://localhost:3000/joincommunity/"+invitationid+"/"+commu_id;

var invitationhtml = '<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><body style="padding: 0; margin:0; background:#F4FBFD;font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#000000; padding:0px 15px 10px 15px;">';
invitationhtml += '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" valign="top" style=""><br><br>';
invitationhtml += '<table width="600" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" valign="top" bgcolor="#fff" style="border-radius: 0.375rem; box-shadow: 12px 15px 20px 0 rgba(46, 61, 73, 0.15); padding:50px " >';
invitationhtml += '<div><img src="images/logo.jpg"></div><br>';
invitationhtml += '<div style=" border-bottom: 1px solid #ddd; border-top: 1px solid #ddd; color: #000; font-size: 48px; padding: 4px 0;"><b>Welcome to iTribe</b></div> <br>';
invitationhtml += '<div><h2 style="font-size: 17px;  text-align: left;">Dear '+user_emailid+',</h2></div>';
invitationhtml += '<div style="text-align: left;">';
invitationhtml += 'Community Title: '+community_title+'  <br>  <br>';
invitationhtml += 'Community Name: '+community_name+'  <br>   <br>';
invitationhtml += 'Owner Name: '+ownername+' ';
invitationhtml += '<br><br><div><a href="'+joinurl+'" style="color: #3ba700; font-size: 16px; text-transform: capitalize;">Join us</a></div>';
invitationhtml += '<br> <br> © Copyright 2018 - iTribe </div></td></tr></table><br><br></td></tr></table></body></html>';

const msg = {
  to: user_emailid,
  from: 'noreply@itribe.com',
  subject: 'iTribe Community Invitation Mail',
  text: 'Welcome to iTribe Dear Community Title Community Name Owner Name Copyright 2018 - iTribe ',
  html: invitationhtml,
};

        sgMail.send(msg);

    // } else {

               
   //  }                        

        }

                });

            }

             res.send({ msg: 'Successfully Sent' }); 

        });          
        
       


    });

});



// get list of community by user id DONE

app.get('/api/communitybysearch', (req, res) => {

    var postBody           = req.query;                 
    var community_tagline = postBody.cstr;  
    

   db.query('SELECT * from itribe_community,itribe_users where  itribe_community.community_tagline LIKE "%'+community_tagline+'%" and itribe_community.community_status = 1 and itribe_community.community_owner_id = itribe_users.id ', function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
    });

});


// get list of community by user id DONE

app.get('/api/communitybyuid', (req, res) => {

    var postBody     = req.query;                 
    var community_owner_id = postBody.uid;  
    

   db.query('SELECT * from itribe_community,itribe_users where  itribe_community.community_owner_id = ? and itribe_community.community_status = ? and itribe_community.community_owner_id = itribe_users.id',[community_owner_id,'1'], function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
    });

});

// get list of community members  by cid DONE

app.get('/api/comm_mem_by_cid', (req, res) => {

    var postBody     = req.query;                 
    var community_id = postBody.cid; 
    

    db.query('SELECT * from itribe_commu_members icm ,itribe_community ic ,itribe_users iu where  icm.commun_id = ? and icm.commun_id = ic.community_id and icm.user_id = iu.id and user_join_status=1',[community_id], function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
    });
     

});

// get list of community by id DONE

app.get('/api/communitybyid', (req, res) => {

    var postBody     = req.query;                 
    var community_id = postBody.cid;   

    db.query('SELECT * from itribe_community,itribe_users where  itribe_community.community_id = ? and itribe_community.community_status = ? and itribe_community.community_owner_id = itribe_users.id',[community_id,'1'], function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
    });
     

});

// list of all communities DONE ... Use in admin pending...


app.get('/api/allcommunitiesadmin', (req, res) => {

    db.query('SELECT * from itribe_community,itribe_users  where   itribe_community.community_owner_id = itribe_users.id ', function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
    });
  
    //res.send({ express: 'Hello From Express' });
    //res.send({ one: 'Express 1', two : 'Express 2', three : 'Express 3' , four : 'Express 4' });

});


app.get('/api/allcommunities', (req, res) => {

    db.query('SELECT * from itribe_community,itribe_users  where  community_visibility = ? and community_status = ? and itribe_community.community_owner_id = itribe_users.id ',['on','1'], function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
    });
  
    //res.send({ express: 'Hello From Express' });
    //res.send({ one: 'Express 1', two : 'Express 2', three : 'Express 3' , four : 'Express 4' });

});



// Update Updatecommunity 

app.post('/api/updatecommunity', function(req, res, next) {

    db.getConnection(function(err, connection) {

            var postBody = req.body.task;    

            console.log(postBody);      

            var community_id         = postBody.community_id;
            var community_owner_id   = postBody.community_owner_id;
            var community_name       = postBody.community_name;
            var community_size       = postBody.community_size;
            var community_religion   = postBody.community_religion;
            var community_spoken     = postBody.community_spoken;
            var community_tagline    = postBody.community_tagline;
            var comminty_desc        = postBody.comminty_desc;
            var community_visibility = postBody.community_visibility;
            var community_status     = postBody.community_status;
            var community_location = postBody.community_location;
            var community_lat_long = postBody.community_lat_long;


    connection.query('update `itribe_community` set `community_name` = "'+community_name+'" , `community_size` = "'+community_size+'" , `community_religion` = "'+community_religion+'"  , `community_spoken` = "'+community_spoken+'" , `community_tagline` = "'+community_tagline+'" , `comminty_desc` = "'+comminty_desc+'" , `community_visibility` = "'+community_visibility+'"  where community_id = "'+community_id+'" ', function(err, rows) {

     console.log(err); 

           res.send({ msg: 'Successfully Updated' });   
        });
 

    });

});

// Add Community DONE

app.post('/api/addcommunity', function(req, res, next) {

    db.getConnection(function(err, connection) {

            var postBody = req.body.task;          

            var community_owner_id = postBody.community_owner_id;
            var community_name = postBody.community_name;
            var community_size = postBody.community_size;
            var community_religion = postBody.community_religion;
            var community_spoken = postBody.community_spoken;
            var community_tagline = postBody.community_tagline;
            var comminty_desc = postBody.comminty_desc;
            var community_visibility = postBody.community_visibility;
            var community_status = postBody.community_status;
            var community_location = postBody.community_location;
            var community_lat_long = postBody.community_lat_long;



     connection.query('INSERT INTO `itribe_community` (`community_owner_id`, `community_name`, `community_size`, `community_religion`, `community_spoken`, `community_tagline`, `comminty_desc`, `community_visibility`, `community_status`, `community_location`, `community_lat_long`) ' +
      'VALUES (?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?)',[community_owner_id, community_name, community_size, community_religion, community_spoken, community_tagline, comminty_desc, community_visibility, community_status, community_location, community_lat_long], function(err, rows) {

     console.log(err);
     
    if (rows.affectedRows) {

      connection.query("SELECT * FROM itribe_community WHERE community_id='" + rows.insertId + "' LIMIT 1", function(err, rows) {

        if (!err && rows.length > 0) {

            res.json(rows[0]);

        } else {

            res.json([]);
        }

    });

            }

        });
 

    });

});

// verify email section Done

app.get('/api/verifyemailservice', (req, res) => {

    db.getConnection(function(err, connection) {
        
    var postBody     = req.query;   

    console.log("request",postBody);       

    var user_id      = postBody.uid;    
    var hashkey      = postBody.hashkey;     
    

    connection.query("SELECT * FROM itribe_users WHERE id = '" + user_id + "' and password = '"+hashkey+"' ", function(err, rows) {
    
    console.log(err);
    
     if (!err && rows.length > 0) {

        db.query("update itribe_users set status = '1'  WHERE id = " + user_id + " and password = '"+hashkey+"' ", function (error, results, fields) {
        if (error) throw error;            
            res.send({ msg: 'Successfully verified' });        
        });
     }
       else
     {
            res.send({ msg: 'Not verified. Please Try Again...' });
     }       

    });
 
  });

});

// end 


// registration join  

app.post('/api/registerjoin', function(req, res, next) {

    db.getConnection(function(err, connection) {

        var postBody = req.body.task;    

        console.log(postBody.username);
        // res.json(postBody);

        var name     = postBody.username;
        var email    = postBody.email;
        var password = postBody.inckey;
        var invitation_id = postBody.invitation_id;
        var community_id = postBody.community_id;
        var location = '';
        var status   = 1;


    connection.query('SELECT * from itribe_users where email="'+email+'" ', function(err, rows) {
  

            if (!err && rows.length > 0) {
                
                //res.send({ msg: 'Email Id Already exists' });

                        var userid = rows[0].id;

        // insert member

    connection.query('INSERT INTO `itribe_commu_members` (`commun_id`, `user_id`, `user_join_status`, `status`) ' +
        'VALUES (?, ? , ?, ?)',[community_id, userid, 1, 1], function(err1, rows1) {

        console.log(err1);

        if (rows1.affectedRows) {

        connection.query("SELECT * FROM itribe_commu_members WHERE commun_rel_id='" + rows1.insertId + "' LIMIT 1", function(err, rows) {

        if (!err && rows.length > 0) {

        res.send({ msg: 'Email Id Already exists And Successfully Joined' });

        } else {
        	
        	res.json([]);

        }

        });

        }

        });   // end join insert query 


            } else {


   connection.query("INSERT INTO itribe_users (name, email, password, location, status) VALUES ('" + name + "','" + email + "','"+password+"','"+location+"','"+status+"')", function(err, rows) {

    // console.log(err);
     
    if (rows.affectedRows) {

        var userid = rows.insertId;

        // insert member

    connection.query('INSERT INTO `itribe_commu_members` (`commun_id`, `user_id`, `user_join_status`, `status`) ' +
        'VALUES (?, ? , ?, ?)',[community_id, userid, 1, 1], function(err1, rows1) {

        console.log(err1);

        if (rows1.affectedRows) {

        connection.query("SELECT * FROM itribe_commu_members WHERE commun_rel_id='" + rows1.insertId + "' LIMIT 1", function(err, rows) {

        if (!err && rows.length > 0) {

        res.send({ msg: 'Successfully Joined' });

        } else {

        res.json([]);
        }
        });
        }

        });   // end join insert query 


        // end insert join members



            }

        });

        
        } // end else account already exists condition
    });

  });

});


// registration DONE mail pending 

app.post('/api/register', function(req, res, next) {

    db.getConnection(function(err, connection) {

        var postBody = req.body.task;    

        console.log(postBody.username);
        // res.json(postBody);

        var name     = postBody.username;
        var email    = postBody.email;
        var password = postBody.inckey;
        var location = '';
        var status 	 = 0;


    connection.query('SELECT * from itribe_users where email="'+email+'" ', function(err, rows) {
  

            if (!err && rows.length > 0) {
                
                res.send({ msg: 'Email Id Already exists' });

            } else {


   connection.query("INSERT INTO itribe_users (name, email, password, location, status) VALUES ('" + name + "','" + email + "','"+password+"','"+location+"','"+status+"')", function(err, rows) {

    // console.log(err);
     
    if (rows.affectedRows) {

        var userid = rows.insertId;
      connection.query("SELECT * FROM itribe_users WHERE id='" + rows.insertId + "' LIMIT 1", function(err, rows) {

        if (!err && rows.length > 0) {

var htmlContent = '<html>Hi, '+name+' , <br/> <strong> Please click on verify link  <a href="http://localhost:3000/verifyemail/'+userid+'/'+password+' " > VERIFY </a>  </strong></html>';

const msg = {
  to: email,
  from: 'noreply@itribe.com',
  subject: 'iTribe Verification Mail',
  text: 'Hi, '+name+', Please click on verify link ',
  html: htmlContent,
};
//sgMail.send(msg);



            res.json(rows[0]);

        } else {

            res.json([]);
        }

    });

            }

        });

        
        } // end else account already exists condition
    });

  });

});


// registration DONE mail pending 

app.post('/api/registerfb', function(req, res, next) {

    db.getConnection(function(err, connection) {

        var postBody = req.body;    

        console.log(postBody.username);
        // res.json(postBody);

        var name     = postBody.username;
        var email    = postBody.email;
        var password = postBody.inckey;
        var usertype = postBody.usertype;
        var dob = postBody.birthday;
        var gender   = postBody.gender;
        var location = '';
        var status   = 1;


    connection.query('SELECT * from itribe_users where email="'+email+'" ', function(err, rows) {
  

            if (!err && rows.length > 0) {
                
                res.json(rows[0]);

            } else {


   connection.query("INSERT INTO itribe_users (name, email, password, location, status , user_type, dob, gender) VALUES ('" + name + "','" + email + "','"+password+"','"+location+"','"+status+"' , '"+usertype+"', '"+dob+"' ,'"+gender+"')", function(err, rows) {

     console.log(err);
     
    if (rows.affectedRows) {

        var userid = rows.insertId;
      connection.query("SELECT * FROM itribe_users WHERE id='" + rows.insertId + "' LIMIT 1", function(err, rows) {

        if (!err && rows.length > 0) {

            res.json(rows[0]);

        } else {

            res.json([]);
        }

    });

            }

        });

        
        } // end else account already exists condition
    });

  });

});

// login DONE

app.post('/api/login', function(req, res, next) {

   var postBody = req.body.task;

    console.log(postBody);

    db.getConnection(function(err, connection) {       
       
        
        var email    = postBody.email;
        var password = postBody.inckey;

      var bytes  = SHA256(password);
      var plaintext = bytes.toString();
      var inckey   = plaintext;

        connection.query('SELECT * from itribe_users where email="'+email+'" and password="'+inckey+'" and status="1"', function(err, rows) {

          console.log('SELECT * from itribe_users where email="'+email+'" and password="'+inckey+'" and status="1"');
          console.log(err);

            if (!err && rows.length > 0) {
                res.json(rows);
            } else {
                res.json([]);
            }
        });

    });

});

// Admin Services

// Update Updatecommunity 

app.get('/api/communitystatusadmin', function(req, res, next) {

    db.getConnection(function(err, connection) {

            var postBody = req.query;    

            console.log(postBody);      

            var commun_id   = postBody.commun_id;
            var community_status   = postBody.statusset;

    connection.query('update `itribe_community` set `community_status` = "'+community_status+'"   where community_id = "'+commun_id+'" ', function(err, rows) {

     console.log(err); 

           res.send({ msg: 'Successfully Updated' });   
        });
 

    });

});


// Admin login DONE

app.post('/api/alogin', function(req, res, next) {

   var postBody = req.body.task;

    console.log(postBody);

    db.getConnection(function(err, connection) {       
       
        
        var email    = postBody.email;
        var password = postBody.inckey;

        connection.query('SELECT * from itribe_admin where email="'+email+'" and password="'+password+'" and status="1"', function(err, rows) {
       
          console.log(err);

            if (!err && rows.length > 0) {
                res.json(rows);
            } else {
                res.json([]);
            }
        });

    });

});


// Get user data by id DONE

app.get('/api/getUserByIdOne', (req, res) => {

    var postBody     = req.query;                 
    var uid          = postBody.uid;

    db.query('SELECT * from itribe_users where id=? limit 1',[uid], function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results[0]));
    });  

});

// Get user data by id DONE

app.get('/api/getUserById', (req, res) => {

    var postBody     = req.query;                 
    var uid          = postBody.uid;

    db.query('SELECT * from itribe_users where id=?',[uid], function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
    });
  
    //res.send({ express: 'Hello From Express' });
    //res.send({ one: 'Express 1', two : 'Express 2', three : 'Express 3' , four : 'Express 4' });

});

// Use in user managment 

app.get('/api/users', (req, res) => {

    db.query('SELECT * from itribe_users', function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
    });
  
    //res.send({ express: 'Hello From Express' });
    //res.send({ one: 'Express 1', two : 'Express 2', three : 'Express 3' , four : 'Express 4' });

});

app.get('/api/hello', (req, res) => {


/*const msg = {
  to: 'ankit.sharma@nanowebtech.com',
  from: 'ankit.sharma@nanowebtech.com',
  subject: 'Sending iTribe Mail Testing',
  text: 'iTribe Mail Testing',
  html: '<strong>iTribe Mail Testing</strong>',
};
sgMail.send(msg);*/


    db.query('SELECT * from itribe_users', function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
    });
  
  	//res.send({ express: 'Hello From Express' });
  	//res.send({ one: 'Express 1', two : 'Express 2', three : 'Express 3' , four : 'Express 4' });

});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
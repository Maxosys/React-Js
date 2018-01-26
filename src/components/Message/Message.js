// src/components/Addmycommunity/index.js
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Header from '../Header/Header.js';
import { Link } from 'react-router';
import $ from 'jquery';

class Message extends Component {  


    constructor(props) {
      
      super(props);    

    this.state = {
      value: "",     
      elements: [],
      communitydata: [],
      userdata: [],
      userdatato: [],
      memberdata: [],
      userfrnddata: [],
      conversation: [],
      successmsg:"",
      errormsg:"",
      showResults: false,
      toid:"",
      fromid:"",
      toname:"",
      fromname:"",
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);

  }

    handleChange(event) {    

    this.setState({value: event.target.value});    

  }

    handleMessageSubmit(event) {
       

          const data = new FormData(event.target);   

          var sender_id    =  data.get('sender_id');
          var reciver_id   =  data.get('reciver_id');
          var community_id =  data.get('community_id');
          var msg_text     =  data.get('msg_text');

          if(msg_text == "")
          {
            this.setState({ successmsg: " Enter Message  ",showResults:true})
            
            alert("Please enter message");

            return;
          }

           var userdata = {sender_id:sender_id,
            reciver_id:reciver_id,
            community_id:community_id,
            msg_text:msg_text            
          };

            fetch('/api/addmessage', {
          method: 'POST',
          body: JSON.stringify({
          task: userdata
           }),
          headers: {"Content-Type": "application/json"}
          }).then( (response) => {
                  return response.json()    
               })
               .then( (json) => {

        this.setState({ successmsg: "Message successfully Sent",showResults:true })
                  
        this.getConversation(sender_id,reciver_id).then((conversation) => {this.setState({ conversation: conversation })});
                
               })
               .catch( (ex) => {
                  console.log('parsing failed', ex)
              });        

    }

  componentWillMount() {

        var fromid = sessionStorage.getItem('session_tokenid');

        this.setState({ fromid: fromid });

//1
         this.callApiGetFriendList(fromid)           
          .then((userfrnddata) => { this.setState({ userfrnddata: userfrnddata }) 
            
            console.log("Friends ",userfrnddata);
        });


        if(this.props.params.fromid)
        {
           fromid = this.props.params.fromid;
        }


//2
        this.callApiFromUser(fromid)           
          .then((userdata) => {this.setState({ userdata: userdata }) 
            
        });

        var toid   = "";

        if(this.props.params.toid)
        {
          var toid   = this.props.params.toid; 
                
//3
       this.callApiToUser(toid)           
          .then((userdatato) => {this.setState({ userdatato: userdatato }) 
            console.log(userdatato);
        });

//4        
       this.getConversation(fromid,toid).then((conversation) => {this.setState({ conversation: conversation }) 
            console.log("conversation DATA ",conversation);
        });

        }

        this.setState({ toid: toid });
    }

    callApiFromUser = async (uid) => {
     
    const response = await fetch('/api/getUserByIdOne?uid='+uid,{
      method: 'GET',   
      headers: {"pragma": "no-cache","cache-control" : "no-cache"}
    });

     const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

      return body;
  }

  callApiToUser = async (toid) => {
     
    const response = await fetch('/api/getUserByIdOne?uid='+toid,{
      method: 'GET',   
      headers: {"pragma": "no-cache","cache-control" : "no-cache"}
    });

     const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

      return body;
  }

    getConversation = async (fromid,toid) => {
     
    const response = await fetch('/api/getConversationSR?sender_id='+fromid+'&reciver_id='+toid,{
      method: 'GET',   
      headers: {"pragma": "no-cache","cache-control" : "no-cache"}
    });

     const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

      return body;
  }

   callApiGetFriendList = async (fromid) => {
     
    const response = await fetch('/api/callApiGetFriendList?sender_id='+fromid,{
      method: 'GET',   
      headers: {"pragma": "no-cache","cache-control" : "no-cache"}
    });

     const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

      return body;
  }


// frineds list


friendslist() {

return (
<div className="user-list desktopview">

  { this.state.userfrnddata.map((data,key) =>

      <a href={"/message/"+sessionStorage.getItem('session_tokenid')+"/"+data.id+"/0"}> <div className="user-w" key={key}>
                <div className="avatar with-status status-green">

                  <img src="/images/1.jpg" alt="" />              
                  
                </div>
                <div className="user-info">
                  <div className="user-date"></div>
                  <div className="user-name">{data.name}</div>
                  <div className="last-message">{data.location}</div>
                </div>
              </div>

      </a>
  )}
                        
            </div>
  );

}

// frineds list for mobile


friendslistmobile() {

return (
 
                <div className="user-list">

  { this.state.userfrnddata.map((data,key) =>

       
                  
                  <a href={"/message/"+sessionStorage.getItem('session_tokenid')+"/"+data.id+"/0"}> 
                  <div className="user-w mobileuser"  key={key}>
                    <div className="avatar with-status status-green">
                      <img src="/images/1.jpg" alt=""/>
                    </div>
                    <div className="user-info">
                      <div className="user-date">12 min</div>
                      <div className="user-name">John Mayers</div>
                      <div className="last-message">What is going on, are we...</div>
                    </div>
                  </div>

                  </a>

               
  )}
                        
            </div>
             
  );

}


getConversationRowTo()
{

  return (
    
     <div>
     { this.state.conversation.map((data,key) =>             


          this.state.fromid ==  data.sender_id ?
          
            <div className="chat-message self" key={key} >
                    <div className="chat-message-content-w">
                      <div className="chat-message-content">{data.msg_text}</div>
                    </div>
                    <div className="chat-message-date">1:23pm</div>
                    <div className="chat-message-avatar">
                      <img src="/images/1.jpg" alt=""/>
                    </div>
                  </div> 

          :

              <div className="chat-message" key={key} >
                              <div className="chat-message-content-w">
                                <div className="chat-message-content">{data.msg_text}</div>
                              </div>
                              <div className="chat-message-avatar">
                                <img src="/images/userpic.jpg" alt=""/>
                              </div>
                              <div className="chat-message-date">9:12am</div>
              </div>            

      )}
      
      </div>    
    );  

}



// send message form rturn

  sendmessage(){


    return (

       <form role="form" onSubmit={this.handleMessageSubmit}>
          <div className="message-input"> 
              <div className="wrap">
              
              <input type="hidden" name="sender_id" value={this.props.params.fromid} />
              <input type="hidden" name="reciver_id" value={this.props.params.toid} />
              <input type="hidden" name="community_id" value={this.props.params.cid} />
            
              <input type="text" name="msg_text" className="messagetext" placeholder="Write your message..." />

              <div className="chat-btn"><button type="submit" className="button--primary">Send</button></div>
              </div>
            </div>
       </form>

      );
  }


  render() {

      const { className, ...props } = this.props;

      var tostatus = true;

      if(this.state.toid == "") { tostatus = false; }

    return (
      <div className={classnames('About', className)} {...props}>
	  
		    <Header  />
	   
        <div className="serachbox chat">
        <div id="frame">
          <div id="sidepanel">
            <div className="user-intro">
              <div className="avatar">
              
                <img src={"/images/userpic_"+this.state.userdata.id+".jpg"} alt="" />
              
              </div>
              <div className="user-intro-info">
                  <h5 className="user-name">{this.state.userdata.name}</h5>
                  <div className="user-sub">{this.state.userdata.location}</div>
                </div>
              </div>
            <div className="chat-search">
              <div className="element-search">
                <input type="text" placeholder="Search users by name..." />
              </div>
            </div>
           
           {this.friendslist()}

           {/* mobile view frnd list */}
           
           <div className="sidelisting">
             
             {this.friendslistmobile()}

           </div>

			       {/* end of mobileview */}

            </div>
          {
                tostatus ? 

            <div className="content desktopview">           
           
                 <div className="contact-profile">
                <img src="/images/userpic.jpg" alt="" />
                <p> {this.state.userdatato.name}</p>
                 </div>              

           
            <div className="messages">
              <div className="chat-content-w ps ps--theme_default" data-ps-id="a557f4c5-2722-94a6-2327-cffba33d6a6c">
                <div className="chat-content">
                  

                {this.getConversationRowTo()}

                {/*  <div className="chat-message">
                    <div className="chat-message-content-w">
                      <div className="chat-message-content">Hi, my name is Mike, I will be happy to assist you</div>
                    </div>
                    <div className="chat-message-avatar">
                      <img src="/images/userpic.jpg" alt=""/>
                    </div>
                    <div className="chat-message-date">9:12am</div>
                  </div>*/}
                  
                  {/*<div className="chat-date-separator"><span>Yesterday</span></div>*/}


                {/*  <div className="chat-message self">
                    <div className="chat-message-content-w">
                      <div className="chat-message-content">That walls over which the drawers. Gone studies to titles have audiences of and concepts was motivator</div>
                    </div>
                    <div className="chat-message-date">1:23pm</div>
                    <div className="chat-message-avatar">
                      <img src="/images/1.jpg" alt=""/>
                    </div>
                  </div>*/}           

                  
                </div>
              </div>
            </div>

            {this.sendmessage()}

          </div>
            :
                <div className="content desktopview">
                <div className="contact-profile">
                <p> User not selected </p>
                </div>
                  
                  <div className="messages">
                  <div className="chat-content-w ps ps--theme_default" data-ps-id="a557f4c5-2722-94a6-2327-cffba33d6a6c">
                  <div className="chat-content">
                  <div className="chat-message">
                  <div className="chat-message-content-w">
                  <div className="chat-message-content">Hi, select user and start conversation </div>
                  </div>
                  </div>
                  </div>
                  </div>  
                  </div>
                  </div>
            }
      
	  {/* mobile view */}
          <div id="myDiv">
              <div className="content slide-in">
                <div className="contact-profile">
                  <a className="conversation-toggle slide-out"  onclick="goBack()"><i className="fa fa-arrow-left"></i></a> 
                  <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                  <p>Harvey Specter</p>
                </div>
                <div className="messages">
                  <div className="chat-content-w ps ps--theme_default" data-ps-id="a557f4c5-2722-94a6-2327-cffba33d6a6c">
                    <div className="chat-content">
                      <div className="chat-message">
                        <div className="chat-message-content-w">
                          <div className="chat-message-content">Hi, my name is Mike, I will be happy to assist you</div>
                        </div>
                        <div className="chat-message-avatar">
                          <img src="http://emilcarlsson.se/assets/mikeross.png" alt=""/>
                        </div>
                        <div className="chat-message-date">9:12am</div>
                      </div>
                      <div className="chat-date-separator"><span>Yesterday</span></div>
                      <div className="chat-message self">
                        <div className="chat-message-content-w">
                          <div className="chat-message-content">That walls over which the drawers. Gone studies to titles have audiences of and concepts was motivator</div>
                        </div>
                        <div className="chat-message-date">1:23pm</div>
                        <div className="chat-message-avatar">
                          <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt=""/>
                        </div>
                      </div>
                      <div className="chat-message">
                        <div className="chat-message-content-w">
                          <div className="chat-message-content">Slept train nearby a its is design size agreeable. And check cons, but countries the was to such any founding company</div>
                        </div>
                        <div className="chat-message-avatar">
                          <img src="http://emilcarlsson.se/assets/mikeross.png" alt=""/>
                        </div>
                        <div className="chat-message-date">3:45am</div>
                      </div>

                      <div className="chat-message self">
                        <div className="chat-message-content-w">
                          <div className="chat-message-content">That walls over which the drawers. Gone studies to titles have audiences of and concepts was motivator</div>
                        </div>
                        <div className="chat-message-date">1:23pm</div>
                        <div className="chat-message-avatar">
                          <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt=""/>
                        </div>
                      </div>

                      <div className="chat-message">
                        <div className="chat-message-content-w">
                          <div className="chat-message-content">Slept train nearby a its is design size agreeable. And check cons, but countries the was to such any founding company</div>
                        </div>
                        <div className="chat-message-avatar">
                          <img src="http://emilcarlsson.se/assets/mikeross.png" alt=""/>
                        </div>
                        <div className="chat-message-date">3:45am</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="message-input">
                  <div className="wrap">
                  <input type="text" placeholder="Write your message..." />
                  <div className="chat-btn"><a href="#" className="button--primary">Reply</a></div>
                  </div>
                </div>
          </div>
		  
		  {/* mobile view */}
		  
        </div>
    </div>
      </div>
    );
  }
}



export default Message;
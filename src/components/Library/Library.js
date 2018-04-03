// src/components/Addmycommunity/index.js
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Header from '../Header/Header.js';

class Library extends Component {  


   constructor(props) {

    super(props);    

    this.state = {
      value: "",     
      elements: [],
      communitydata: [],
      userdata: [],
      memberdata: [],
      librarydata: [],
      librarysingledata: [],
      successmsg:"",
      errormsg:"",
      showResults: false,
      community_name:"",
      community_id:"",
      community_tagline:"",
      uploadedfileextension:"",
      uploadedfile:"",
      library_tagline:""
    };
   
    this.handleLibrarySubmit = this.handleLibrarySubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

      handleChange(event) {    
    
    //event.target.value;

    this.setState({library_tagline: this.refs.library_tagline.value});    

  }
  handleLibrarySubmit(event) {
      
       let form = new FormData(this.refs.addComponentForm);
        form.append('libfiles', this.uploadInput.files[0]);

        // data.append('file', this.uploadInput.files[0]);

       // console.log(form);

      //this.uploadForm(e.target.files[0]);

      //reader.readAsDataURL(file);

       fetch('/api/addlibcomponent', {
          method: 'POST',
          body: form
        }).then((res) => {console.log('res of fetch', res)

        this.setState({ successmsg: "Library successfully added",showResults:true,library_tagline:"" }


        );
        document.location.reload();
      });
  }

 




  componentWillMount() {

    if(this.props.params.libid)
    {
     this.callApiGetSingleLibrary(this.props.params.cid,this.props.params.libid)      
      .then((librarysingledata) => {this.setState({ librarysingledata: librarysingledata })

        console.log(librarysingledata[0].filename);

          var filename  = librarysingledata[0].filename.split(".");

          this.setState({ uploadedfileextension: filename[1], uploadedfile: librarysingledata[0].filename })


        });
    }

       // get Community Library data
    
    if(this.props.params.cid)
    {
      this.callApiGetLibrary(this.props.params.cid)      
      .then((librarydata) => {this.setState({ librarydata: librarydata })

        //console.log(this.state.librarydata);

        });

      // end 
    }

  }

  componentDidMount() {
        
          document.title = this.props.route.title;

          if(!sessionStorage.getItem('session_tokenid'))
          {
            this.props.router.push('/login');
          }   

      this.callApiGetAllCommunity(this.props.params.cid)
      .then((communitydata) => {this.setState({ communitydata: communitydata })         

          this.setState({
            community_name :communitydata[0]['community_name'],
            community_id :communitydata[0]['community_id'],
            community_tagline :communitydata[0]['community_tagline']          
          });

        });

      // end

    }

      // call rerence function for get members

    callApiGetLibrary = async (cid) => {
     
    const response = await fetch('/api/getlibdata?cid='+cid,{
      method: 'GET',   
      headers: {"pragma": "no-cache","cache-control" : "no-cache"}
    });

     const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

      return body;
    }


      // end 

  callApiGetAllCommunity = async (cid) => {
     
    const response = await fetch('/api/communitybyid?cid='+cid,{
      method: 'GET',   
      headers: {"pragma": "no-cache","cache-control" : "no-cache"}
    });

     const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

      return body;
  }

    callApiGetSingleLibrary = async (cid,libid) => {
     
    const response = await fetch('/api/getlibdatabyid?cid='+cid+'&libid='+libid,{
      method: 'GET',   
      headers: {"pragma": "no-cache","cache-control" : "no-cache"}
    });

     const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

      return body;
  }

  uploadForm(file) {

        let form = new FormData(this.refs.addComponentForm);
        form.append('myImage', file);
        fetch('/api/addlibcomponent', {
          method: 'POST',
          body: form
        }).then((res) => {

          console.log('res of fetch', res);

          if(res.library_id)
          {
            alert("Submitted");
          }
          else
          {
           alert("Not Submitted"); 
          }

        });
    }



Videoclip() {
  return (
           <video width="320" height="240" src={'/uploads/library/'+this.state.uploadedfile} type="video/mp4" controls></video>
  )
}


displaylibraryinfo() {

    return(

        this.state.librarysingledata.map(member => 

        <div key={member.library_id}  className="col-sm-7">
        <div className="uploadfile">          

          <h3>  <a href={'/uploads/library/'+this.state.uploadedfile}> {member.originalname} </a> </h3>
                 
          {
            this.state.uploadedfileextension == 'mp4' ? 
            this.Videoclip()
            :
            ''
          }
         
        </div>

        <div className="discreption">
          <div className="meberimage">
            <div className="card-img"><i aria-hidden="true" className="fa fa-user-circle"></i></div>
            <div className="memberinfo">
              <span className="members-name">Member Name</span>
              <span className="author">By {member.name}</span>
            </div>
            <div className="date">February 11, 2014 {member.created_at} </div>
            <p>{member.library_subtitle}</p>
            <p>{member.library_desc}</p>
          </div>

        </div>

      </div>

          )

        )
    }




  render() {
    const { className, ...props } = this.props;

    var datast = false;

    if(this.state.librarydata[0])
    {
      datast = true;
    }


  return (
  
  <div className={classnames('About', className)} {...props}>
  
  <Header displaymessage={this.state.successmsg} showResults={this.state.showResults} />
		
	<div className="communtiy-section login-section">
    <div className="container">
      <div className="title">

    <h3>
      <a href={"/library/"+this.state.community_id} > {this.state.community_name} Community Library </a>

      </h3><div className="sep"><img src="/images/sep.jpg" alt="" /></div></div>
     {/* <div className="breadcrums-search communtiesitribe">
        <div className="searchfaq">
          <div id="imaginary_container"> 
            <div className="input-group stylish-input-group input-append">
              <input type="text" placeholder="Filter" className="form-control" />
              <span className="input-group-addon">
                <button type="submit">
                  <span className="fa fa-search"></span>
                </button>  
              </span>
            </div>
          </div>
        </div>
      </div>*/}

      <div className="col-sm-5">
        <div className="left-section liberary">
          <ul className="thumbnailss">

          {

            datast ? 

            this.state.librarydata.map(member =>            
           
          
              <li key={member.library_id} >
              <div className="thumbnail-icon">
                <i className="fa fa-file-o" aria-hidden="true"></i>
              </div>
              <div className="thumnbcontent">
                
                <span className="desc">{member.library_subtitle}</span>
                
                <a href={"/library/"+member.community_id+"/"+member.library_id} className="readbtn"> Read more </a>
              </div>
             </li>
             )

             :
             
             'No documents uploaded yet'

          }

          </ul>
        </div>
      </div>

      {

        this.props.params.libid ? 

      this.displaylibraryinfo()

  

      :

 <form ref="addComponentForm" encType="multipart/form-data"  onSubmit={this.handleLibrarySubmit} >

      <div className="col-sm-7">
        <div className="uploadfile">
          
          <h3 title="(jpeg|jpg|png|gif|pdf|doc|docx|mp4)"> You Can Upload Your Files </h3>
          <small>(Document/Video/Audio file)</small>
          <input type="file" ref={(ref) => { this.uploadInput = ref; }} id="libfileid" className="userprofilepic"  />
          <input type="hidden" value={this.state.community_id} name="cid"   />
          <input type="hidden" value={sessionStorage.getItem('session_tokenid')} name="user_id"   />
          <button  className="btn button--primary libuploadbtn" id="libuploadbtn" type="button">
          <i className="fa fa-upload" aria-hidden="true"></i>  Upload </button>
        </div>

        <div className="discreption">                   
           
             <label> Component Subtitle </label>

                <input id="library_tagline" value={this.state.library_tagline} required type="text" className="form-control" name="library_tagline" ref="library_tagline" onChange={this.handleChange}  />
            
                <label> Component Description </label>
          
                <textarea className="form-control" required name="library_desc" ></textarea>
                
                <button className="btn button--primary" type="submit">Add Component  <i aria-hidden="true" className="fa fa-angle-right"></i> </button>
          </div>

      </div>
 </form>

        

        }




    </div>
  </div>
  
      </div>
    );
  }
}



export default Library;
// src/components/Addmycommunity/index.js
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Header from '../Header/Header.js';

class Library extends Component {  

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('About', className)} {...props}>
        <Header />
		
	<div className="communtiy-section login-section">
    <div className="container">
      <div className="title"><h3>My Community</h3><div className="sep"><img src="images/sep.jpg" /></div></div>
      <div className="breadcrums-search communtiesitribe">
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
      </div>

      <div className="col-sm-5">
        <div className="left-section liberary">
          <ul className="thumbnails">
            <li>
              <div className="thumbnail-icon">
                <i className="fa fa-file-o" aria-hidden="true"></i>
              </div>
              <div className="thumnbcontent">
                <span className="filename">Document Name</span>
                <span className="desc">Chambray Carles Terry Richardson plaid wolf. Disrupt fashion..</span>
                <a href="javascript" className="readbtn">Read more</a>
              </div>
            </li>

            <li>
              <a href="javascript:;">
                <div className="thumbnail-icon">
                  <i className="fa fa-file-video-o" aria-hidden="true"></i>
                </div>
                <div className="thumnbcontent">
                  <span className="filename">Video Name</span>
                  <span className="desc">Chambray Carles Terry Richardson plaid wolf. Disrupt fashion..</span>
                  <a href="javascript" className="readbtn">Read more</a>
                </div>
              </a>
            </li>

            <li>
              <a href="javascript:;">
                <div className="thumbnail-icon">
                  <i className="fa fa-youtube" aria-hidden="true"></i>
                </div>
                <div className="thumnbcontent">
                  <span className="filename">You Tube Name</span>
                  <span className="desc">Chambray Carles Terry Richardson plaid wolf. Disrupt fashion..</span>
                  <a href="javascript" className="readbtn">Read more</a>
                </div>
              </a>
            </li>

            <li>
              <a href="javascript:;">
                <div className="thumbnail-icon">
                  <i className="fa fa-file-audio-o" aria-hidden="true"></i>
                </div>
                <div className="thumnbcontent">
                  <span className="filename">Audio Name</span>
                  <span className="desc">Chambray Carles Terry Richardson plaid wolf. Disrupt fashion..</span>
                  <a href="javascript" className="readbtn">Read more</a>
                </div>
              </a>
            </li>

            <li>
              <a href="javascript:;">
                <div className="thumbnail-icon">
                  <i className="fa fa-file-image-o" aria-hidden="true"></i>
                </div>
                <div className="thumnbcontent">
                  <span className="filename">Image Name</span>
                  <span className="desc">Chambray Carles Terry Richardson plaid wolf. Disrupt fashion..</span>
                  <a href="javascript" className="readbtn">Read more</a>
                </div>
              </a>
            </li>

            <li>
              <div className="thumbnail-icon">
                <i className="fa fa-file-o" aria-hidden="true"></i>
              </div>
              <div className="thumnbcontent">
                <span className="filename">Document Name</span>
                <span className="desc">Chambray Carles Terry Richardson plaid wolf. Disrupt fashion..</span>
                <a href="javascript" className="readbtn">Read more</a>
              </div>
            </li>

            <li>
              <a href="javascript:;">
                <div className="thumbnail-icon">
                  <i className="fa fa-file-video-o" aria-hidden="true"></i>
                </div>
                <div className="thumnbcontent">
                  <span className="filename">Video Name</span>
                  <span className="desc">Chambray Carles Terry Richardson plaid wolf. Disrupt fashion..</span>
                  <a href="javascript" className="readbtn">Read more</a>
                </div>
              </a>
            </li>

            <li>
              <a href="javascript:;">
                <div className="thumbnail-icon">
                  <i className="fa fa-youtube" aria-hidden="true"></i>
                </div>
                <div className="thumnbcontent">
                  <span className="filename">You Tube Name</span>
                  <span className="desc">Chambray Carles Terry Richardson plaid wolf. Disrupt fashion..</span>
                  <a href="javascript" className="readbtn">Read more</a>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>


      <div className="col-sm-7">
        <div className="uploadfile">
          <h3>You Can Upload Your Files</h3>
          <small>(Document/Video/Audio file/YouTube embed)</small>
          <button className="btn button--primary"><i className="fa fa-upload" aria-hidden="true"></i>  Upload </button>
        </div>

        <div className="discreption">
          <div className="meberimage">
            <div className="card-img"><i aria-hidden="true" className="fa fa-user-circle"></i></div>
            <div className="memberinfo">
              <span className="members-name">Member Name</span>
              <span className="author">By Davis</span>
            </div>
            <div className="date">February 11, 2014</div>
            <p>Chambray Carles Terry Richardson plaid wolf. Disrupt fashion axe 90's quinoa +1 Neutra. Irony ethnic ennui McSweeney's, batch squid direct trade. Readymade salvia Echo Park scenester. <br /> Farm-to-table selvage small batch swag asymmetrical whatever, tattooed American Apparel meh viral wolf tofu trust fund you probably haven't heard of them. Viral 3 wolf moon retro drinking  vinegar. Tote bag mustache keffiyeh, Cosby sweater church-key fingerstache PBR meh salvia.</p>
          </div>

        </div>

      </div>




    </div>
  </div>
  
      </div>
    );
  }
}



export default Library;
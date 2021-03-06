import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Header from '../Header/Header.js';


class PrivacyPolicy extends Component {

  render() {
    const { className, ...props } = this.props;
    var currentLocation = this.props.location.pathname;

    return (
      <div>
        <Header pathn={currentLocation} />
       
      <div className="communtiy-section privacyterms" style={{ minHeight: '77vh' }}>
        <div className="container">
          <div className="title">
            <h3> Privacy Policy </h3>
            <div className="sep"><img src="/images/sep.jpg" /> </div>
          </div>

          <p>This privacy policy has been compiled to better serve those who are concerned with how their 'Personally Identifiable Information' (PII) is being used online. PII, as described in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.
          </p>

          <h4>What personal information do we collect from the people that visit our blog, website or app?</h4>
          <p>When ordering or registering on our site, as appropriate, you may be asked to enter your name, email address, mailing address, phone number or other details to help you with your experience.</p>

          <h4>When do we collect information?</h4>
          <p>We collect information from you when you fill out a form or enter information on our site</p>

          <h4>How do we use your information? </h4>
          <p>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:</p>

          <ul class="normalsytle">
            <li>To improve our website in order to better serve you.</li>
            <li>To follow up with them after correspondence (live chat, email or phone inquiries)</li>
          </ul>

          <h4>How do we protect your information?</h4>
          <ul class="normalsytle">
            <li>We only provide articles and information. We never ask for credit card numbers.</li>
            <li>We do not use vulnerability scanning and/or scanning to PCI standards.</li>
            <li>We do not use Malware Scanning.</li>
            <li>Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology. </li>
            <li>We implement a variety of security measures when a user enters, submits, or accesses their information to maintain the safety of your personal information.</li>
            <li>All transactions are processed through a gateway provider and are not stored or processed on our servers.</li>
          </ul>

          <h4>Do we use 'cookies'?</h4>
          <p>Yes. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information. For instance, we use cookies to help us remember and process the items in your shopping cart. They are also used to help us understand your preferences based on previous or current site activity, which enables us to provide you with improved services. We also use cookies to help us compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.</p>

          <b>We use cookies to:</b>
          <li>• Understand and save user's preferences for future visits.</li>
          <p>You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since browser is a little different, look at your browser's Help Menu to learn the correct way to modify your cookies. <br/>If you turn cookies off, Some of the features that make your site experience more efficient may not function properly.It won't affect the user's experience that make your site experience more efficient and may not function properly.</p>

          <h4>Third-party disclosure?</h4>
          <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential. We may also release information when it's release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property or safety. <br/> However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses. </p>

          <h4>Third-party links</h4>
          <p>We do not include or offer third-party products or services on our website. </p>

          <h4>Google</h4>
          <p>Google's advertising requirements can be summed up by Google's Advertising Principles. They are put in place to provide a positive experience for users. https://support.google.com/adwordspolicy/answer/1316548?hl=en <br/> 
            We use Google AdSense Advertising on our website. <br/>  Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on previous visits to our site and other sites on the Internet. Users may opt-out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy. </p>

          <h4>We have implemented the following:</h4>
          <p>We, along with third-party vendors such as Google use first-party cookies (such as the Google Analytics cookies) and third-party cookies (such as the DoubleClick cookie) or other third-party identifiers together improve the quality of our site</p>

          <h4>Opting out:</h4>
          <p>Users can set preferences for how Google advertises to you using the Google Ad Settings page. Alternatively, you can opt out by visiting the Network Advertising Initiative Opt Out page or by using the Google Analytics Opt Out Browser add on.</p>

          <h4>COPPA (Children Online Privacy Protection Act)</h4>
          <p>When it comes to the collection of personal information from children under the age of 13 years old, the Children's Online Privacy Protection Act (COPPA) puts parents in control. The Federal Trade Commission, United States' consumer protection agency, enforces the COPPA Rule, which spells out what operators of websites and online services must do to protect children's privacy and safety online. <br/>  We do not specifically market to children under the age of 13 years old. <br/>  Do we let third-parties, including ad networks or plug-ins collect PII from children under 13?</p>


          <h4>Fair Information Practices</h4>
          <p>The Fair Information Practices Principles form the backbone of privacy law in the United States and the concepts they include have played a significant role in the development of data protection laws around the globe. Understanding the Fair Information Practice Principles and how they should be implemented is critical to comply with the various privacy laws that protect personal information.</p>
          <b>In order to be in line with Fair Information Practices we will take the following responsive action, should a data breach occur:</b>
          <div class="innerText">We will notify you via email</div>
          <li> • Within 7 business days</li>

          <p>We also agree to the Individual Redress Principle which requires that individuals have the right to legally pursue enforceable rights against data collectors and processors who fail to adhere to the law. This principle requires not only that individuals have enforceable rights against data users, but also that individuals have recourse to courts or government agencies to investigate and/or prosecute non-compliance by data processors.</p>
           

          



        
          
         
         
         

         </div>
        </div>

      </div>
    );
  }
}



export default PrivacyPolicy;
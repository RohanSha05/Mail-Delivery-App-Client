import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaEnvelope, FaInbox, FaEnvelopeOpenText, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import SendMail from '../src/Components/SendMail';
import ReceiveMail from '../src/Components/ReceiveMail';
import UnreadMails from '../src/Components/UnreadMails';
import SearchInbox from '../src/Components/SearchInbox';
import SpamMails from '../src/Components/SpamMails';

const MailApp = () => {
  const closeDrawer = () => {
    document.getElementById('my-drawer-4').checked = false;
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#F7F7F7] p-4">
        <div className="drawer drawer-mobile">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Page content here */}
            <div className="navbar bg-[#0e3047]  mb-4 shadow-lg">
              <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F4B400]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                </label>
              </div>
              <div className="flex-1 font-bold text-3xl px-2 mx-2 text-[#fff8f8]">Your Mail App</div>
            </div>
            <div className="p-4">
              <Routes>
                <Route path="/send-email" element={<>
                  <h2 className="text-3xl font-bold mb-4 text-[#333333]"><FaEnvelope className="inline-block mr-2" />Send Email</h2>
                  <SendMail />
                </>} />
                <Route path="/received-emails" element={<>
                  <h2 className="text-3xl font-bold mb-4 text-[#333333]"><FaInbox className="inline-block mr-2" />Received Emails</h2>
                  <ReceiveMail />
                </>} />
                <Route path="/unread-emails" element={<>
                  <h2 className="text-3xl font-bold mb-4 text-[#333333]"><FaEnvelopeOpenText className="inline-block mr-2" />Unread Emails</h2>
                  <UnreadMails />
                </>} />
                <Route path="/search-inbox" element={<>
                  <h2 className="text-3xl font-bold mb-4 text-[#333333]"><FaSearch className="inline-block mr-2" />Search Inbox</h2>
                  <SearchInbox />
                </>} />
                <Route path="/spam-emails" element={<>
                  <h2 className="text-3xl font-bold mb-4 text-[#333333]"><FaExclamationTriangle className="inline-block mr-2" />Spam Emails</h2>
                  <SpamMails />
                </>} />
                <Route path="/" element={<>
                  <h2 className="text-3xl font-bold mb-4 text-[#333333]">Welcome to Mail Application</h2>
                </>} />
              </Routes>
            </div>
          </div>
          <div className="drawer-start" >
            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
            <ul style={{'height':'1000px'}} className="menu p-4 w-80 bg-[#113b56] text-[#fff8f8]">
              {/* Sidebar content here */}
              <li><Link to="/send-email" onClick={closeDrawer}><FaEnvelope className="inline-block mr-2" />Send Email</Link></li>
              <li><Link to="/received-emails" onClick={closeDrawer}><FaInbox className="inline-block mr-2" />Received Emails</Link></li>
              <li><Link to="/unread-emails" onClick={closeDrawer}><FaEnvelopeOpenText className="inline-block mr-2" />Unread Emails</Link></li>
              <li><Link to="/search-inbox" onClick={closeDrawer}><FaSearch className="inline-block mr-2" />Search Inbox</Link></li>
              <li><Link to="/spam-emails" onClick={closeDrawer}><FaExclamationTriangle className="inline-block mr-2" />Spam Emails</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default MailApp;
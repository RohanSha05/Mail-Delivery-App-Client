import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UnreadMails = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedEmailIndex, setExpandedEmailIndex] = useState(null);

  useEffect(() => {
    const fetchUnreadEmails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/unread-mails');
        setEmails(response.data);
      } catch (error) {
        setError('Error fetching unread emails');
      } finally {
        setLoading(false);
      }
    };

    fetchUnreadEmails();
  }, []);

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  const toggleDetails = (index) => {
    setExpandedEmailIndex(expandedEmailIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>From</th>
                <th>To</th>
                <th>Date</th>
                <th>Body</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email, index) => (
                <React.Fragment key={index}>
                  <tr className="hover:bg-base-100">
                    <td>{index + 1}</td>
                    <td className="font-semibold">{truncateText(email.head.subject, 30)}</td>
                    <td>{truncateText(email.head['from-name'], 20)} ({truncateText(email.head['from-email'], 20)})</td>
                    <td>{truncateText(email.head.to, 20)}</td>
                    <td>{new Date(email.head.date).toLocaleString()}</td>
                    <td>{truncateText(email['body-txt'], 50)}</td>
                    <td><button className="btn btn-sm btn-info" onClick={() => toggleDetails(index)}>Details</button></td>
                  </tr>
                  {expandedEmailIndex === index && (
                    <tr>
                      <td colSpan="7">
                        <div className="p-4 bg-gray-100">
                          <h3 className="font-bold text-lg">{email.head.subject}</h3>
                          <p><strong>From:</strong> {email.head['from-name']} ({email.head['from-email']})</p>
                          <p><strong>To:</strong> {email.head.to}</p>
                          <p><strong>Date:</strong> {new Date(email.head.date).toLocaleString()}</p>
                          <p><strong>Body:</strong> {email['body-txt']}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UnreadMails;
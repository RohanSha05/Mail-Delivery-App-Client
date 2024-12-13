import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpamMails = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpamEmails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/spam-mails');
        setEmails(response.data);
      } catch (error) {
        setError('Error fetching spam emails');
      } finally {
        setLoading(false);
      }
    };

    fetchSpamEmails();
  }, []);

  const truncateText = (text, length) => {
    return text && text.length > length ? text.substring(0, length) + '...' : text;
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
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{truncateText(email.head?.subject, 50)}</td>
                  <td>{email.head?.['from-name']}</td>
                  <td>{email.head?.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SpamMails;
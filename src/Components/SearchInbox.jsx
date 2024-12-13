import { useState } from 'react';
import axios from 'axios';

const SearchInbox = () => {
  const [email, setEmail] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/search-inbox', { email });
      setResults(response.data);
    } catch (error) {
      setError('Error searching inbox');
    } finally {
      setLoading(false);
    }
  };

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Search by Email" onChange={handleChange} required className="input input-bordered w-full" />
        <button type="submit" className="btn btn-primary w-full">Search</button>
      </form>
      {loading ? (
        <div className="flex justify-center items-center mt-4">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-error mt-4">{error}</div>
      ) : (
        <div className="overflow-x-auto mt-4">
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
              {results.map((email, index) => (
                <tr key={index} className="hover:bg-base-100">
                  <td>{index + 1}</td>
                  <td className="font-semibold">{truncateText(email.head.subject, 30)}</td>
                  <td>{truncateText(email.head['from-name'], 20)} ({truncateText(email.head['from-email'], 20)})</td>
                  <td>{truncateText(email.head.to, 20)}</td>
                  <td>{new Date(email.head.date).toLocaleString()}</td>
                  <td>{truncateText(email['body-txt'], 50)}</td>
                  <td><button className="btn btn-sm btn-info">Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchInbox;
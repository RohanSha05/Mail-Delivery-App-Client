import React, { useState } from 'react';
import axios from 'axios';
import img1 from '../../../mail_deliver_app/src/assets/img (1).png';
import img2 from '../../../mail_deliver_app/src/assets/img (2).png';
import img3 from '../../../mail_deliver_app/src/assets/img (3).png';
import img4 from '../../../mail_deliver_app/src/assets/img (4).png';

const SendMail = () => {
  const [email, setEmail] = useState({ to: '', subject: '', body: '' });
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [loading, setLoading] = useState(false);

  const templates = {
    newYear: {
      subject: 'Happy New Year!',
      body: `
        <h1>Happy New Year!</h1>
        <img src="https://i.ibb.co/SrNgYRc/newyear.jpg" alt="New Year" class="image" />
        <p>Wishing you a wonderful new year filled with joy and success.</p>
      `,
      image: 'https://i.ibb.co/SrNgYRc/newyear.jpg'
    },
    santaClause: {
      subject: 'Santa Clause',
      body: `
        <h1>Santa Clause</h1>
        <img src="https://i.ibb.co/PD1kLc8/MV5-BNj-My-OTZi-ODgt-ODEw-Zi00-ZDAx-LWEx-ODUt-Mzlk-OTli-MWU1-Yz-Ex-Xk-Ey-Xk-Fqc-Gde-QXVy-MTkx-Nj-Uy.jpg" alt="Santa Clause" class="image" />
        <p>Ho Ho Ho! Merry Christmas!</p>
      `,
      image: 'https://i.ibb.co/PD1kLc8/MV5-BNj-My-OTZi-ODgt-ODEw-Zi00-ZDAx-LWEx-ODUt-Mzlk-OTli-MWU1-Yz-Ex-Xk-Ey-Xk-Fqc-Gde-QXVy-MTkx-Nj-Uy.jpg'
    },
    tuesdaySpecial: {
      subject: 'Tuesday Special',
      body: `
        <h1>Tuesday Special</h1>
        <img src="https://i.ibb.co/qpzV89s/tuesday.jpg" alt="Tuesday Special" class="image" />
        <p>Enjoy your Tuesday with special offers!</p>
      `,
      image: 'https://i.ibb.co/qpzV89s/tuesday.jpg'
    }
  };

  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const handleTemplateSelect = (templateKey) => {
    const template = templates[templateKey];
    setSelectedTemplate(templateKey);
    setEmail({ ...email, subject: template.subject, body: template.body });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://127.0.0.1:8000/api/send-mail', {
        to: email.to,
        subject: email.subject,
        body: email.body
      });
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Send Email</h2>
        <div className="form-control w-full mb-4">
          <label className="label" htmlFor="template-select">
            <span className="label-text">Select Template</span>
          </label>
          <select
            id="template-select"
            className="select select-bordered w-full"
            value={selectedTemplate}
            onChange={(e) => handleTemplateSelect(e.target.value)}
          >
            <option value="" disabled>Select a template</option>
            {Object.keys(templates).map((key) => (
              <option key={key} value={key}>
                {templates[key].subject}
              </option>
            ))}
          </select>
        </div>
        {selectedTemplate && (
          <div className="mb-4">
            <img src={templates[selectedTemplate].image} alt={templates[selectedTemplate].subject} className="w-28 h-1/2" />
          </div>
        )}
        <div className="form-control w-full mb-4">
          <label className="label" htmlFor="to">
            <span className="label-text">To</span>
          </label>
          <input
            type="email"
            id="to"
            name="to"
            className="input input-bordered w-full"
            value={email.to}
            onChange={handleChange}
          />
        </div>
        <div className="form-control w-full mb-4">
          <label className="label" htmlFor="subject">
            <span className="label-text">Subject</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="input input-bordered w-full"
            value={email.subject}
            onChange={handleChange}
          />
        </div>
        <div className="form-control w-full mb-4">
          <label className="label" htmlFor="body">
            <span className="label-text">Body</span>
          </label>
          <textarea
            id="body"
            name="body"
            className="textarea textarea-bordered w-full"
            value={email.body}
            onChange={handleChange}
            rows={10}
          ></textarea>
        </div>
        <button
          className={`btn btn-primary mt-4 ${loading ? 'loading' : ''}`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Email'}
        </button>
      </div>
    </div>
  );
};

export default SendMail;
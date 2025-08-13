import React, { useState } from "react";

const ContactForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const contactData = {
      username,
      email,
      subject,
    };
    console.log(contactData);
    setTimeout(() => {
      setLoading(false);
      setUsername("");
      setEmail("");
      setSubject("");
      alert("Form submitted successfully!");
    }, 2000);
  };

  return (
    <div className="p-5">
      <form action="" onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block" htmlFor="name">
            Name
          </label>
          <input
            className="border border-black-300"
            type="text"
            id="name"
            name="name"
            placeholder="Enter Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block" htmlFor="email">
            Email
          </label>
          <input
            className="border border-black-300"
            type="text"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block" htmlFor="subject">
            Subject
          </label>
          <textarea
            className="border border-black-300"
            name="subject"
            id="subject"
            placeholder="Message"
            rows={5}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <button
            className="cursor-pointer bg-black text-white px-6 py-2 flex items-center gap-2"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loader"></span> Sending...
              </>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default ContactForm;

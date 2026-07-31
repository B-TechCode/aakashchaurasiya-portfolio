// src/sections/Contact.jsx

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";

import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiFacebook,
  FiInstagram,
  FiCode,
  FiSend,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";

import { submitContactMessage } from "../services/contactService";
import { fetchSocialLinks } from "../services/socialLinkService";

function validate(fields) {
  const errors = {};

  if (!fields.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
    errors.email = "Enter a valid email.";
  }

  if (!fields.message.trim()) {
    errors.message = "Message is required.";
  } else if (fields.message.trim().length < 20) {
    errors.message = "Minimum 20 characters.";
  }

  return errors;
}

// Select the correct icon based on the platform stored in CMS.
const getSocialIcon = (platform) => {
  const name = platform?.trim().toLowerCase();

  switch (name) {
    case "github":
      return FiGithub;

    case "linkedin":
      return FiLinkedin;

    case "leetcode":
      return FiCode;

    case "email":
      return FiMail;

    case "facebook":
      return FiFacebook;

    case "instagram":
      return FiInstagram;

    default:
      return FiCode;
  }
};

export default function Contact() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    loadSocialLinks();
  }, []);

  const loadSocialLinks = async () => {
    try {
      const data = await fetchSocialLinks();
      setSocialLinks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(fields);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setStatus("sending");

      await submitContactMessage(fields);

      setStatus("success");

      setFields({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    } catch (error) {
      console.error(error);

      setStatus("error");

      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    }
  };

  const inputClass = (field) =>
    `w-full bg-navy-800/80 border rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-500
    ${
      errors[field]
        ? "border-red-500"
        : "border-white/10 focus:border-accent"
    }`;

  return (
    <SectionWrapper id="contact">
      <div className="section-container">

        <div className="text-center mb-14">
          <p className="section-label">
            Contact
          </p>

          <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm">
            I'm open to internships, freelance work and collaborations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-4xl mx-auto">

          {/* Left - Social Links */}

          <div className="space-y-6">
            <div className="glass-card p-6">

              <h3 className="font-bold text-white mb-6">
                Get in Touch
              </h3>

              <div className="space-y-4">

                {socialLinks.map((item) => {
                  const Icon = getSocialIcon(item.platform);

                  return (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">

                        <Icon
                          size={18}
                          className="text-accent"
                        />

                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          {item.platform}
                        </p>

                        <p className="text-sm text-white group-hover:text-accent">
                          {item.displayText}
                        </p>
                      </div>
                    </a>
                  );
                })}

              </div>
            </div>
          </div>

          {/* Right - Contact Form */}

          <motion.div className="glass-card p-7">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

             {/* Name */}
<div>
  <input
    type="text"
    name="name"
    value={fields.name}
    onChange={handleChange}
    placeholder="Your Name"
    className={inputClass("name")}
    aria-invalid={!!errors.name}
  />

  {errors.name && (
    <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
      <FiAlertCircle />
      {errors.name}
    </p>
  )}
</div>

{/* Email */}
<div>
  <input
    type="email"
    name="email"
    value={fields.email}
    onChange={handleChange}
    placeholder="Email"
    className={inputClass("email")}
    aria-invalid={!!errors.email}
  />

  {errors.email && (
    <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
      <FiAlertCircle />
      {errors.email}
    </p>
  )}
</div>

{/* Message */}
<div>
  <textarea
    rows={5}
    name="message"
    value={fields.message}
    onChange={handleChange}
    placeholder="Your Message"
    className={`${inputClass("message")} resize-none`}
    aria-invalid={!!errors.message}
  />

  {errors.message && (
    <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
      <FiAlertCircle />
      {errors.message}
    </p>
  )}
</div>

              <motion.button
                type="submit"
                disabled={
                  status === "sending" ||
                  status === "success"
                }
                className={`w-full py-3 rounded-xl ${
                  status === "success"
                    ? "bg-green-600"
                    : "btn-primary"
                }`}
              >

                <AnimatePresence mode="wait">

                  {status === "idle" && (
                    <span className="flex justify-center items-center gap-2">
                      <FiSend />
                      Send Message
                    </span>
                  )}

                  {status === "sending" && (
                    <span>
                      Sending...
                    </span>
                  )}

                  {status === "success" && (
                    <span className="flex justify-center items-center gap-2">
                      <FiCheck />
                      Message Sent
                    </span>
                  )}

                  {status === "error" && (
                    <span className="flex justify-center items-center gap-2">
                      <FiAlertCircle />
                      Failed! Try Again
                    </span>
                  )}

                </AnimatePresence>

              </motion.button>

            </form>

          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  );
}


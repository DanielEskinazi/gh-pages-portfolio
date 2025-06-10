// For more help visit https://formspr.ee/react-help
import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Message } from "semantic-ui-react";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mbjwwvdd");

  if (state.succeeded) {
    return (
      <Message
        success
        icon="check circle"
        header="Thank you for contacting me!"
        content="I will get back to you as soon as possible."
        style={{ maxWidth: "600px", margin: "0 auto" }}
      />
    );
  } else if (state.errors?.length > 0) {
    return (
      <Message
        error
        icon="exclamation triangle"
        header="Oops! Something went wrong."
        content="Please email me directly at contact@danieleskinazi.com"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      />
    );
  }

  return (
    <form
      className="ui form segment"
      onSubmit={handleSubmit}
      style={{ maxWidth: "600px", margin: "0 auto" }}
    >
      <div className="two fields">
        <div className="field">
          <label htmlFor="name">
            <i className="user icon"></i>Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Jane Doe"
            required
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} />
        </div>

        <div className="field">
          <label htmlFor="email">
            <i className="envelope icon"></i>Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="jane.doe@example.com"
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">
          <i className="comment alternate icon"></i>Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="How can I help you?"
          required
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>

      <button
        className="ui primary labeled icon button"
        type="submit"
        disabled={state.submitting}
      >
        <i className="paper plane icon"></i>
        Send Message
      </button>
    </form>
  );
}

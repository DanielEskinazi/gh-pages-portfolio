// For more help visit https://formspr.ee/react-help
import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Message } from "semantic-ui-react";
import { style } from "../styles";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mbjwwvdd");
  if (state.succeeded) {
    return (
      <Message
        success
        header="Thank you for contacting me."
        content="I will get back to you as soon as possible!"
      />
    );
  } else if (state.errors?.length > 0) {
    return (
      <Message
        error
        header="Oops! Something went wrong. Please emaile me directly at contact@danieleskinazi.com"
        content="Please try again later."
      />
    );
  }

  return (
    <form class="ui form" onSubmit={handleSubmit}>
      <div class="field">
        <label htmlFor="email">Email Address</label>
        <div>
          <input type="name" placeholder="jane Doe" id="name" name="name" />
          <ValidationError prefix="Name" field="name" errors={state.errors} />
        </div>
        <div>
          <input
            type="email"
            placeholder="janeDoe@gmail.com"
            id="email"
            name="email"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
      </div>
      <div class="field" style={style.marginTop}>
        <label htmlFor="message">Please leave your message here...</label>
        <textarea id="message" name="message" rows="3" />
      </div>
      <button class="ui button" type="submit" disabled={state.submitting}>
        Confirm
      </button>
    </form>
  );
}

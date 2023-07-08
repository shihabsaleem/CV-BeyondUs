import React from "react";
import "../Footer/footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <ul className="list1">
        <li>
          <a href="terms_and_conditions">Terms and Conditions</a>
        </li>

        <li>
          <a href="/reviews">Reviews</a>
        </li>
        <li>
          <a href="/support">Support</a>
        </li>

        {/* <ul className="list2"> */}
        <li>
          <a href="/faq">FAQ</a>
        </li>
        <li>
          <a href="/contact-us">Contact Us</a>
        </li>
      </ul>

      <ul className="list3">
        <li>
          <p>© 2023, Bold Limited. All rights reserved.</p>
        </li>
      </ul>
    </div>
  );
};

export default Footer;

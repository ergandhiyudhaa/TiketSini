import {
  ArrowUpRight,
  Mail,
} from 'lucide-react'
import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        <div className="site-footer-main">
          <div className="site-footer-brand">
            <a href="/" className="site-footer-logo">
              Tiket<span>Sini</span>
            </a>

            <p>
              Discover events. Get your ticket.
              <br />
              Make the moment count.
            </p>
          </div>

          <div className="site-footer-links">
            <div className="site-footer-column">
              <span>EXPLORE</span>

              <a href="/events">All Events</a>
              <a href="/events">Music</a>
              <a href="/events">Sports</a>
              <a href="/events">Experiences</a>
            </div>

            <div className="site-footer-column">
              <span>HELP</span>

              <a href="/events">How it works</a>
              <a href="/events">Contact us</a>
              <a href="/events">FAQ</a>
            </div>

            <div className="site-footer-column">
              <span>COMPANY</span>

              <a href="/">About TiketSini</a>
              <a href="/">For organizers</a>
              <a href="/">Terms</a>
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <span>
            © {new Date().getFullYear()} TiketSini. All rights reserved.
          </span>

          <div className="site-footer-socials">
            <a
              href="mailto:hello@tiketsini.com"
              aria-label="Email TiketSini"
            >
              <Mail size={16} />
            </a>

            <a
              href="#"
              aria-label="Instagram TiketSini"
            >
              <span className="footer-instagram-icon">◎</span>
            </a>

            <a href="/events" className="site-footer-explore">
              Explore
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

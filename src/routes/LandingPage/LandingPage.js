import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle,  faPencilAlt, faComment, faHeart, faHeartBroken} from '@fortawesome/free-solid-svg-icons'
import './LandingPage.css'
import logo from '../../images/logo.png'
import title from '../../images/title_white.png'
import Nav from '../../components/Nav/Nav'

class LandingPage extends Component {
  render() {
    return (
      <>
        <Nav />
        <main role="main">
          <div className="landing-page">
            <header role="banner" className="showcase">
              <div className="content">
                <img src={title} className="logo" alt="Catty Shack Inc" />
                <div className="title">
                  Welcome To Catty Shack!
                </div>
                <div className="text">
                  A Purrific Place To Get The Latest Scoop
                </div>
                <div className="cred-wrapper">
                  <ul className="default-login">
                    <li className="credentials username">Username - defaultUser</li>
                    <li className="credentials password">Password - AAaa$$11</li>
                  </ul>
                </div>
              </div>
            </header>
            <section className="services">
              <div className="Container grid-4 center">
                <div>
                  <FontAwesomeIcon icon={faPencilAlt} size="3x" />
                  <h3>Create A Meow!</h3>
                   <p>Talk about whatever your furry heart desires: scratch posts, the litter box, kitty nip, you name it!</p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faComment} size="3x" />
                  <h3>Comment</h3>
                  <p>Did a meow bring out the inner tiger in you?</p>
                  <p>Scratch out a comment!</p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faHeart} size="3x" />
                  <h3>Like </h3>
                  <p>Don't be catty! Show some love!</p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faHeartBroken} size="3x" />
                  <h3>UnLike </h3>
                  <p>Feeling Fickle? Unlike and go take a nap!</p>
                </div>
              </div>
            </section>
            <section className="about bg-light">
              <div className="Container">
                <div className="grid-2">
                  <div className="center">
                    <FontAwesomeIcon icon={faInfoCircle} size="10x" />
                  </div>
                  <div>
                    <h3>About Us</h3>
                    <p>CattyShack INC. is a social outlet for our impossible feline friends. Please limit your kittens to a 
                       maximum 2 hours of screen time a day.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
    </>
    )
  }
}

export default LandingPage

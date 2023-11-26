import ContentContainer from '@/components/content-container'
import { Page } from '../utils/typedefs'

// Presents the home page to the user
export default function Home() {
  return (
    <>
      <main>
        <ContentContainer activePage={Page.HOME}>
          <section className="container-fluid">
            <div className="container">
              <div className="row p-3 text-center">
                <div className="col">
                  <figure>
                    <img 
                      src="/nat-donuts-logo.png"
                      alt="Nat Donut Logo" 
                      className='logoImage'
                    />
                  </figure>
                </div>
              </div>
              <div className="row p-3">
                <div className="col text-center">
                  <p>Hello and welcome to Nat Donuts!</p>
                  <p>I am the sole proprietor, Nathanael Scudder. Thank you for visiting our website</p>
                  <p>You can may browse our donut catalog using the menu at the top of the screen.</p>
                </div>
              </div>
              <div className="row p-3">
                <div className="col">
                  <h2>Disclaimer</h2>
                  <p>
                    None of the image assets on this website are my intellectual property.
                    This website is meant for educational purposes and is not fit for commerical use.
                  </p>
                </div>
              </div>
              <div className="row p-3">
                <h2>Contact Us</h2>
                <div className="col">
                  <p>We don't have any social media, but please feel free to contact us at: <em>nscudder@uci.edu</em></p>
                </div>
              </div>
            </div>
          </section>
        </ContentContainer>
      </main>
    </>
  )
}

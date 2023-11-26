// Provides a consistent footer to use across the website
export default function Footer() {
    return (
        <>
          <div className="mb-5"></div>
          <footer className="text-bg-dark fixed-bottom">
              <div className="ps-2 d-flex flex-wrap">
                <p>
                  Copyright 2023, Nathanael Scudder
                </p>
              </div>
          </footer>
        </>
    );
}
import "./styles.scss";

import Editor from "./Editor";
import ImportModal from "./ImportModal";
import logo from "./logo.svg";

export default function App() {
  return (
    <div className="App">
      <div className="main-nav">
        <div className="inner">
          <div>
            <img src={logo} alt="Logo" className="logo" />
            dmpad
          </div>
          <nav>
            <a href="https://wuz.sh">Built by Wuz</a>
          </nav>
        </div>
      </div>
      <Editor />
      <ImportModal />
    </div>
  );
}

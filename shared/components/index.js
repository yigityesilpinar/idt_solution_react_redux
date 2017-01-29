import React, {PropTypes} from "react";


class App extends React.Component {

  render() {
    return (
      <div className="site-view">
        {/* <Header /> */}
        {this.props.children}
        {/* <Footer /> */}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;

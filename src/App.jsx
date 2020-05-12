import React, {Component} from 'react';
import Layout from './components/layouts';

class App extends Component {
   render() {
      return (
         <Layout>
            {this.props.children}
         </Layout>
      );
   }
}

export default App;

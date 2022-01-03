import { useState } from 'react';
import logo from './assets/travel-made-easy.svg';
import './App.css';
import Search from './components/Search/Search';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const App = () => {

  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchQuery, setSearchQuery] = useState(query || '');

  return (
    <Container fluid>
      <Row>
        <Col sm={12}>
          <div className="App">
            <div className="App-title">Travel Made Easy</div>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={3}>
        </Col>
        <Col sm={6} className="searchbar-container">
          <Search
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </Col>
        <Col sm={3}>
        </Col>
      </Row>
    </Container>
  );
};

export default App;

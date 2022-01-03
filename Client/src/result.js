import React, { useState, useEffect } from 'react';
import DatePicker from "./DatePicker";
import { useSearchParams } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import './Result.css';
import Search from './Search';
import logo from './travel-made-easy.svg';
import Container from 'react-bootstrap/Container';
import ReviewPane from './ReviewPane';

const Result = (prop) => {

    const [searchParams] = useSearchParams();
    const [data, setData] = useState(null);
    const [fromDate, setFromDate] = useState(searchParams.get('from'));
    const [toDate, setToDate] = useState(searchParams.get('to'));
    const [searchQuery, setSearchQuery] = useState(searchParams.get('place_name') || '');
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    useEffect(() => {
        fetch(SERVER_URL+searchParams.get('place_name'))
            .then(response => response.json())
            .then(setData);
        // fetch(SERVER_URL + searchParams.get('place_name') + "&start_time=" + new Date(searchParams.get('from')).getTime() + "&end_time=" + new Date(searchParams.get('to')).getTime())
        //     .then(response => response.json())
        //     .then(setData);
    }, [searchParams]);

    if (data != null) {
        return (

            <Container fluid>
                <div className="result">
                    <Row>
                        <Col sm={1}>
                            <div className="result-logo">
                                <a href="/">
                                    <img src={logo} className="App-logo" alt="logo" />
                                </a>
                            </div>
                        </Col>
                        <Col sm={5} className="searchbar-container">
                            <Search
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                            />
                        </Col>
                        <Col sm={3} className="searchbar-container">
                            <DatePicker
                                label="From"
                                date={fromDate}
                                setDate={setFromDate}
                                searchParams={searchParams}
                            />
                        </Col>
                        <Col sm={3} className="searchbar-container">
                            <DatePicker
                                label="To"
                                date={toDate}
                                setDate={setToDate}
                                searchParams={searchParams}
                            />
                        </Col>
                    </Row>
                    <div className="result-header">
                        <Row>
                            <Col sm={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title className="title">{searchParams.get('place_name')}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    <div className="result-tab">
                        <Row>
                            <Col sm={12}>
                                <Tab.Container justify fill id="left-tabs-example" defaultActiveKey="first">
                                    <Row>
                                        <Col sm={3}>
                                            <Nav variant="pills" className="flex-column">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="first">General Information</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="second">Food Places</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="third">Time To Travel</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="fourth">Transportation</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="fifth">Accessibility</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="sixth">Budget</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Col>
                                        <Col sm={9}>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="first">
                                                    <ReviewPane reviewData={JSON.parse(data.general_info).hits.hits} />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="second">
                                                    <ReviewPane reviewData={JSON.parse(data.food).hits.hits} />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="third">
                                                    <ReviewPane reviewData={JSON.parse(data.time_to_travel).hits.hits} />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="fourth">
                                                    <ReviewPane reviewData={JSON.parse(data.transportation).hits.hits} />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="fifth">
                                                    <ReviewPane reviewData={JSON.parse(data.accessibility).hits.hits} />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="sixth">
                                                    <ReviewPane reviewData={JSON.parse(data.budget).hits.hits} />
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        );
    } else {
        return (
            <Container fluid>
                <div className="result">
                    <Row>
                        <Col sm={1}>
                            <div className="result-logo">
                                <a href="/">
                                    <img src={logo} className="App-logo" alt="logo" />
                                </a>
                            </div>
                        </Col>
                        <Col sm={5} className="searchbar-container">
                            <Search
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                            />
                        </Col>
                        <Col sm={3} className="searchbar-container">
                            <DatePicker
                                label="From"
                                date={fromDate}
                                setDate={setFromDate}
                                searchParams={searchParams}
                            />
                        </Col>
                        <Col sm={3} className="searchbar-container">
                            <DatePicker
                                label="To"
                                date={toDate}
                                setDate={setToDate}
                                searchParams={searchParams}
                            />
                        </Col>
                    </Row>
                    <div className="result-header">
                        <Row>
                            <Col sm={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title className="title">Sorry!, We haven't listed that place yet.</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        );
    }
};

export default Result;
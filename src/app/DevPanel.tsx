import * as React from 'react';
import {connect} from 'react-redux';
import './DevPanel.css';
import {
  GrpcAction,
  requestHeaders, requestMessage, requestStart, responseEnd, responseHeaders, responseMessage,
  responseTrailers
} from './actions/grpc';
import {BrowserHeaders, Code} from 'grpc-web-client';
import {Dispatch} from 'redux';

let id = 1;
const REQUEST_MESSAGE = {
  guid: "73f56382-c0b9-47b7-b3ac-3627b02cc1d5",
};
const RESPONSE_MESSAGE = [
  {
    "_id": "59c2de71efd3e9cfac5e6e3a",
    "index": 0,
    "guid": "73f56382-c0b9-47b7-b3ac-3627b02cc1d5",
    "isActive": true,
    "balance": "$2,193.05",
    "picture": "http://placehold.it/32x32",
    "age": 28,
    "eyeColor": "blue",
    "name": "Schwartz Lindsay",
    "gender": "male",
    "company": "SCENTRIC",
    "email": "schwartzlindsay@scentric.com",
    "phone": "+1 (818) 501-2982",
    "address": "403 Bayard Street, Eden, Tennessee, 3401",
    "about": "Ullamco minim elit laborum est dolore tempor magna enim. Magna qui reprehenderit quis cupidatat ut commodo labore magna dolor minim dolor culpa. Veniam dolor nisi minim excepteur qui. Qui consectetur consectetur laboris proident officia.\r\n",
    "registered": "2017-06-03T03:05:11 -01:00",
    "latitude": 7.270749,
    "longitude": 59.170028,
    "tags": [
      "pariatur",
      "exercitation",
      "duis",
      "et",
      "sunt",
      "Lorem",
      "Lorem"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Horn Warren"
      },
      {
        "id": 1,
        "name": "Morgan Bird"
      },
      {
        "id": 2,
        "name": "Hayden Mathews"
      }
    ],
    "greeting": "Hello, Schwartz Lindsay! You have 9 unread messages.",
    "favoriteFruit": "strawberry"
  }
];

interface DevPanelProps {
  dispatch: Dispatch<GrpcAction>
}


export class DevPanel extends React.Component<DevPanelProps, {}> {

  onRequestStart() {
    this.props.dispatch(requestStart.create({
      service: 'RandomTestService',
      host: 'http://test.hostname.com',
      id: id++,
      timestamp: Date.now(),
      method: 'GetRandomData'
    }))
  }

  onRequestHeaders() {
    const headers = new BrowserHeaders();
    headers.set('Test-Header-Key', 'Test Header Value');

    this.props.dispatch(requestHeaders.create({
      id: id,
      headers,
    }))
  }

  onRequestMessage() {
    this.props.dispatch(requestMessage.create({
      message: REQUEST_MESSAGE,
      id,
    }))
  }

  onResponseHeaders() {
    const headers = new BrowserHeaders();
    headers.set('Response-Header-Key', 'Response Header Value');

    this.props.dispatch(responseHeaders.create({
      id: id,
      httpStatus: 200,
      headers,
    }))
  }

  onResponseMessage() {
    this.props.dispatch(responseMessage.create({
      message: RESPONSE_MESSAGE,
      id
    }))
  }

  onResponseTrailers() {
    const trailers = new BrowserHeaders();
    trailers.set('Trailer-Key', 'Trailer Value');
    trailers.set('Trailer-Key-2', 'Trailer Value 2');

    this.props.dispatch(responseTrailers.create({
      trailers,
      id,
    }))
  }

  onResponseEnd() {
    this.props.dispatch(responseEnd.create({
      id,
      grpcStatus: Code.OK,
    }))
  }

  onNewUnaryRequest() {
    this.onRequestStart();
    this.onRequestHeaders();
    this.onRequestMessage();
    this.onResponseHeaders();
    this.onResponseMessage();
    this.onResponseTrailers();
    this.onResponseEnd();
  }

  render() {
    return (
      <div className="devpanel">
        <button
          onClick={() => this.onNewUnaryRequest()}
          style={{ backgroundColor: 'lightgreen' }}
        >New Custom Request</button>
        <button>TODO: New Unary Request</button>
        <button>TODO: New Streaming Request</button>
        <button>TODO: New Error Request</button>

        <div className="devpanel-callbacks">
          <button onClick={() => this.onRequestStart()}>Request Start</button>
          <button onClick={() => this.onRequestHeaders()}>Request Headers</button>
          <button onClick={() => this.onRequestMessage()}>Request Message</button>
          <button onClick={() => this.onResponseHeaders()}>Request Message</button>
          <button onClick={() => this.onResponseHeaders()}>Response Message</button>
          <button onClick={() => this.onResponseTrailers()}>Response Trailers</button>
          <button onClick={() => this.onResponseEnd()}>Response End</button>
          <button>TODO: Grpc Error</button>
        </div>
      </div>
    )
  }

}

export default connect()(DevPanel);
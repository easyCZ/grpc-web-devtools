
import * as React from "react";

const NoRequests = () => (
    <div style={styles.container}>
      <p>Recording gRPC requests...</p>
      <p>Perform a request or reload the page.</p>
    </div>
);

const styles = {
  container: {
    'color': '#777',
    'background-color': 'white',
    'display': 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'text-align': 'center',
  }
};

export default NoRequests;
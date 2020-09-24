import React, { Component } from "react";
import jsPDF from 'jspdf'
import ReactDOMServer from 'react-dom/server';
import 'jspdf-autotable'
import { Button } from "reactstrap";

class ExportButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.pdfExport = this.pdfExport.bind(this)
  }

pdfExport = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
  const string = ReactDOMServer.renderToString("#myTable");
  const pdf = new jsPDF(orientation, unit, size, string);
  pdf.autoTable({ html: '#myTable'});
  pdf.save('requests');
};
  
  render() {
    return (
      <Button onClick={this.pdfExport} color="primary">
        Export PDF
      </Button>
    );
  }
}

export default ExportButton;

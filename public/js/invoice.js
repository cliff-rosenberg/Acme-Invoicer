  const sendInvoice = async (data) => {
    // event.preventDefault();
      const response = await fetch('/api/emails/invoice/' + data, {
        method: 'POST',
        body: JSON.stringify({ data }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to send invoice.');
      }
    };


  $( ".invoice-btn" ).on( "click", function() {
    console.log( $( this ).data( "invoiceid" ));
    let temp =  $( this ).data( "invoiceid" );
    console.log(temp);
    // console.log(this);
    sendInvoice(temp);
  });
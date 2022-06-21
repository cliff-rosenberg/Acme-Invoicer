// function to do POST to NodeMailer
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
        console.log('Failed to send invoice.');
        alert('Failed to send invoice.');
      }
    };

// JQuery to make buttons work for passing invoice ID into function
  $( ".invoice-btn" ).on( "click", function() {
    //console.log( $( this ).data( "invoiceid" ));
    let temp =  $( this ).data( "invoiceid" );
    console.log(temp);
    sendInvoice(temp);
  });

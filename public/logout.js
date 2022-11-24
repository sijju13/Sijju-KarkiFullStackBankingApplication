function Logout(){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');    
  
    return (
      <Card
        bgcolor="info"
        header="Logout of Account"
        status={status}
        body={show ? 
          <LogoutForm setShow={setShow} setStatus={setStatus}/> :
          <LogoutMsg setShow={setShow} setStatus={setStatus}/>}
      />
    ) 
  }
  
  function LogoutMsg(props){
    return(<>
      <h5>Successful logout!</h5>
      <form action="./login">
        <input type="submit" value="Log into Account" />
      </form>
    </>);
  }
  
  function LogoutForm(props){
    const [email, setEmail]       = React.useState('');
  
    function handle(){
      fetch(`/account/logout/${email}/`)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              props.setStatus('');
              props.setShow(false);
              console.log('JSON:', data);
              setIsLogged
          } catch(err) {
              props.setStatus(text)
              console.log('err:', text);
          }
      });
    }
  
  
    return (<>
  
  Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

      <button type="submit" className="btn btn-light" onClick={handle}>Logout</button>
     
    </>);
  }
  

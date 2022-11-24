function Login(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor='info'
      header='Login'
      status={status}
      body={
        show ? (
          <LoginForm
            setUser={props.setUser}
            setShow={setShow}
            setStatus={setStatus}
            setIsLoggedIn={props.setIsLoggedIn}
          />
        ) : (
          <LoginMsg user={props.user} setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function LoginMsg(props) {
  const ctx = React.useContext(UserContext);

  return (
    <>
      <h5>Success, welcome {props.user.name}</h5>
      <button
        type='submit'
        className='btn btn-dark'
        onClick={() => props.setShow(true)}
      >
        Authenticate again
      </button>
    </>
  );
}

function LoginForm(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);

  function handle() {
    fetch(`/account/login/${email}/${password}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus('');
          props.setShow(false);
          ctx.users[0] = data;
          props.setUser(data);
          props.setIsLoggedIn(true);
        } catch (err) {
          props.setStatus(text);
          console.log('err:', err);
        }
      });
  }

  return (
    <>
      Email
      <br />
      <input
        type='input'
        className='form-control'
        placeholder='Enter email'
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type='password'
        className='form-control'
        placeholder='Enter password'
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button type='submit' className='btn btn-light' onClick={handle}>
        Login
      </button>
    </>
  );
}

//export default function LoginForm({email})

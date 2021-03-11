import React from "react";
import { A } from "hookrouter";

function Home() {
  return (
    <div className="home">
      <div className="home__welcome">
        <h1>Musimu</h1>
        <A className="link" href="/login">
          Login
        </A>
        <A className="link" href="/register">
          Register
        </A>
      </div>
    </div>
  );
}

export default Home;

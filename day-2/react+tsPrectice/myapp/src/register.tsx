import  Card  from "./card";

export function Register() {
  return (
    <Card>
      <h1>Register</h1>

      <p>Create your account.</p>

      <form>
        <input
          type="text"
          placeholder="Name"
        />

        <br />
        <br />

        <input
          type="email"
          placeholder="Email"
        />

        <br />
        <br />

        <button type="submit">
          Register
        </button>
      </form>
    </Card>
  );
}
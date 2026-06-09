const { render } = require("@testing-library/react-native");

jest.mock("../src/firebase/firebaseConfig", () => {
  auth: {
  }
});

jest.mock("firebase/auth", () => {
  signInWithEmailAndPassword: jest.fn();
});

jest.mock("expo-router", () => {
  router: {
    push: jest.fn();
  }
});

import Login from "../src/app/login";

test("Deve renderizar a tela de login", () => {
  const tela = render(<Login />);

  console.log(tela);
});

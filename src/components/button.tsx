import React from "react";
import QRCode from "react-qr-code";

import ZkAuthLogo from "./logo";

export type SignInWithZkAuthButtonProps = {
  onSuccess: () => void;
  onError?: (error: any) => void;
};

const BASE_URL = Buffer.from("aHR0cDovL2xvY2FsaG9zdDozMDAw", "base64");

const styles = {
  fontFamily: "Nunito",
  border: "none",
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  alignItems: "center",
  height: "40px",
  borderRadius: "20px",
  padding: "0 20px",
  background: "black",
};

const SignInWithZkAuthButton = ({
  onSuccess,
  onError,
}: SignInWithZkAuthButtonProps) => {
  const [value, setValue] = React.useState<string>("");

  const handlerOnClick = () => {
    fetch(`${BASE_URL}/api/sign-in`)
      .then((r) =>
        Promise.all([Promise.resolve(r.headers.get("x-id")), r.json()])
      )
      .then(([id, data]) => {
        console.log(data);
        setValue(data);
        return id;
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {value == "" ? (
        <button onClick={handlerOnClick} className={`${styles}`} style={styles}>
          <ZkAuthLogo />
          Sign in with ZK Auth
        </button>
      ) : (
        <div
          style={{
            height: "auto",
            margin: "0 auto",
            maxWidth: 64,
            width: "100%",
          }}
        >
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={value}
            viewBox={`0 0 256 256`}
          />
        </div>
      )}
    </div>
  );
};

export default SignInWithZkAuthButton;

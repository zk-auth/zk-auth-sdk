import React from 'react'
import QRCode from "react-qr-code";

// @todo ver si descargar la font y usarla con @font-face
// import { Nunito } from "next/font/google";
// const nunito = Nunito({ subsets: ["latin"], weight: "600" });
const BASE_URL = window.location.origin+window.location.pathname;

const styles = {
    fontFamily: 'Nunito',
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

export default function SignInWithZkAuthButton(): JSX.Element {

    const [value, setValue] = React.useState<string>("");

    const handlerOnClick = () => {
        fetch(`${BASE_URL}/api/sign-in`)
            .then(r => Promise.all([Promise.resolve(r.headers.get('x-id')), r.json()]))
            .then(([id, data]) => {
                console.log(data);
                setValue(data);
                return id;
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            {value == "" 

            ? 

            <button
                onClick={handlerOnClick}
                className={`${styles}`}
                style={styles}
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 31 32"
            >
                <path
                    fill="#fff"
                    d="M2.424 11.463l1.094-.694v-.015a3.644 3.644 0 011.802-2.63l8.126-4.683a3.742 3.742 0 013.694 0 4.039 4.039 0 012.585 3.62v13.178l2.955 1.714V7.061A6.913 6.913 0 0018.573.855l-.004.006a6.674 6.674 0 00-6.6.024L3.843 5.568a6.645 6.645 0 00-3.325 5.748v1.58l.015-.014a9.154 9.154 0 011.891-1.418zm15.454 17.952l-1.123-.665a3.684 3.684 0 01-3.31-.192L5.32 23.873a3.738 3.738 0 01-1.847-3.487 3.87 3.87 0 011.862-3.767l11.42-6.56V6.632L3.872 14.05c-.575.31-1.09.72-1.522 1.212a6.602 6.602 0 00-1.832 4.846 6.752 6.752 0 003.325 6.323l8.126 4.684a6.676 6.676 0 006.648 0l1.389-.798c-.015-.015-.015-.015-.03-.015a8.684 8.684 0 01-2.098-.886zM29.174 7.997a6.645 6.645 0 00-2.431-2.428l-1.404-.813c0 .015.015.044.015.06.19.732.285 1.487.28 2.245v1.315a3.674 3.674 0 011.478 2.94v9.367a3.68 3.68 0 01-1.832 3.176 4.027 4.027 0 01-4.432.444l-11.48-6.605-2.97 1.714 12.973 7.447a6.945 6.945 0 007.594-.577 6.638 6.638 0 003.102-5.6v-9.366a6.647 6.647 0 00-.893-3.319z"
                ></path>
            </svg>
                Sign in with ZK Auth
            </button>

            :

            <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
                <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={value}
                    viewBox={`0 0 256 256`}
                />
            </div>
        }
        </div>
    );
};
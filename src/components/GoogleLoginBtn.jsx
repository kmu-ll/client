import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GoogleLoginBtn = () => {
  const clientId =
    "113286823692-l74r2a8ml52qju25kvj2qn1ru00ssi1b.apps.googleusercontent.com";
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(res) => {
            console.log(res);
          }}
          onFailure={(err) => {
            console.log(err);
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleLoginBtn;

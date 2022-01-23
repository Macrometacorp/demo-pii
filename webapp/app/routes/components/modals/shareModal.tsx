import {
  ModalPaths,
  SHAREABLE_CURL_COMMAND_MESSAGE,
} from "~/constants";
import { getModalId } from "~/utilities/utils";
import { useEffect, useState } from "react";
import { ModalProps, UserData } from "~/interfaces";

const SHARE_FORM_ID = "share_form";
export default ({ modalUserDetails, onModalClose }: ModalProps) => {
  const [decryptData, setDecryptData] = useState({} as UserData);
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [shareableToken, setShareableToken] = useState("");

  const decryptToken = async () => {
    try {
      const result = await fetch(`/decrypt?token=${modalUserDetails.token}`);
      const decryptResult = await result.text();
      const parsedDecryptedResult = JSON.parse(decryptResult);
      const { state, country, zipcode, job_title, token } = modalUserDetails;
      const { login, email, phone } = parsedDecryptedResult?.data;

      const decryptedData: UserData = {
        token,
        name: login,
        email,
        phone,
        state,
        country,
        zipcode,
        job_title,
      };
      setDecryptData(decryptedData);
    } catch (error) {
      alert("failed op");
      console.error(error);
    }
  };

  useEffect(() => {
      decryptToken();
  }, []);

  const getShareableToken = async () => {
    const result = await fetch(`/share?token=${modalUserDetails.token}`);
    const parsed: {status: string; record: string , privacy_service_url:string} =await result.json()
    setShareableToken(parsed.record);
    let messageToBeSent = `curl --location --request GET ${parsed.privacy_service_url}/v1/get/${parsed.record}`;
    setMessage(messageToBeSent);
  };

  useEffect(() => {
    getShareableToken();
  }, []);

  const sendMessage = async () => {
    if (decryptData && shareableToken) {
      setSendingMessage(true);
      const result = await fetch(
        `/share?token=${shareableToken}&phoneNumber=${decryptData.phone}`
      );
      const sendMessageResult = await result.json();
      setSendingMessage(false);
      if (sendMessageResult.sid) {
        onModalClose();
      }
    }
  };

  return (
    <div id={getModalId(ModalPaths.ShareModal)} className="modal modal-open">
      {message ? (
        <div className="modal-box">
          {message}
          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={() => {
                sendMessage();
              }}
            >
              {sendingMessage ? `Sending Message ...` : "Send Message"}
            </button>
            <a onClick={onModalClose} className="btn">
              Close
            </a>
          </div>
        </div>
      ) : (
        <div className="modal-box">
          {SHAREABLE_CURL_COMMAND_MESSAGE}
          <div className="modal-action">
            <a onClick={onModalClose} className="btn">
              Close
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

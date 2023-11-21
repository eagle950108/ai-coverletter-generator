import { useState } from "react";
import LoadingBar from '@root/src/shared/components/LoadingBar';

export default function App() {
  const [modalData, setModalData] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { data, loading } = message;
    setLoading(loading);
    if (data && data.length > 0) {
      setModalData(data);
    } else {
      setModalData('');
    }
  });

  const dismissModal = () => {
    setModalData(null);
  };
  return loading ? (
    <div
      style={{
        position: 'fixed',
        zIndex: 100000,
        backgroundColor: 'rgba(0,0,0,0.4)',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        color: 'white',
        alignItems: 'center',
      }}>
      <LoadingBar displayText="Fetching Data" />
    </div>
  ) : (
    modalData && (<div
      className="coverletter-modal-container"
      style={{
        position: "fixed",
        zIndex: 100000,
        backgroundColor: "rgba(0,0,0,0.4)",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="coverletter-modal"
        style={{
          backgroundColor: "white",
          height: "80vh",
          width: "80vw",
          borderRadius: "15px",
          padding: "20px",
        }}
      >
        <div
          className="coverletter-modal-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "10px",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "25px",
              fontWeight: "500",
            }}
          >
            Cover Letter
          </h1>
          <button
            onClick={dismissModal}
            style={{
              fontSize: "30px",
              border: "none",
              outline: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            X
          </button>
        </div>
        <div
          className="coverletter-modal-content"
          style={{ overflow: "auto" }}
        >
          {modalData !== "" ? (
            <pre>{modalData}</pre>
          ) : (
            <span
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                borderTop: "1px solid darkgray",
              }}
            >
              No Cover letter to display
            </span>
          )}
        </div>
        <div className="coverletter-modal-footer"></div>
      </div>
    </div>)
  );
}
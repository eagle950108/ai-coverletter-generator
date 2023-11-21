import { useState } from 'react';

export default function App() {
  const [modalData, setModalData] = useState(null);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { data } = message;
    if (data && data.length > 0) {
      setModalData(data);
    } else {
      setModalData([]);
    }
  });

  const dismissModal = () => {
    setModalData(null);
  };

  return (
    modalData && (
      <div
        className="coverletter-modal-container"
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
          alignItems: 'center',
        }}>
        <div
          className="coverletter-modal"
          style={{
            backgroundColor: 'white',
            height: '50vh',
            width: '50vw',
            borderRadius: '15px',
            padding: '20px',
          }}>
          <div
            className="coverletter-modal-header"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingBottom: '10px',
              alignItems: 'center',
            }}>
            <h1
              style={{
                fontSize: '25px',
                fontWeight: '500',
              }}>
              Cover Letter
            </h1>
            <button
              onClick={dismissModal}
              style={{
                fontSize: '30px',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}>
              X
            </button>
          </div>
          <div className="coverletter-modal-content" style={{ maxHeight: '40vh', height: '40vh', overflow: 'auto' }}>
            {modalData.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ position: 'sticky', top: -1, background: 'lightGray' }}>
                  <tr>
                    {Object.keys(modalData[0]).map(field => (
                      <th key={field} style={{ padding: 8, border: '1px solid #ddd', textAlign: 'left' }}>
                        {field}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {modalData.map((row, index) => (
                    <tr key={index}>
                      {Object.keys(row).map((key: string, index: number) => {
                        return (
                          <td style={{ padding: 8, border: '1px solid #ddd', textAlign: 'left' }} key={key}>
                            {row[key] || ''}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <span
                style={{
                  display: 'flex',
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  borderTop: '1px solid darkgray',
                }}>
                No Cover letter to display
              </span>
            )}
          </div>
          <div className="coverletter-modal-footer"></div>
        </div>
      </div>
    )
  );
}

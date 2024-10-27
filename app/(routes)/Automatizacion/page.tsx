"use client";
import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

const TestRunner: React.FC = () => {
  const [code, setCode] = useState<string>('console.log("Hello, World!");');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');

  const runCode = () => {
    const originalLog = console.log; // Guarda la función original
    let output = '';

    // Redirige console.log a una variable
    console.log = (message: any) => {
      output += message + '\n'; // Agrega el mensaje a output
    };

    try {
      eval(code); // Ten cuidado con el uso de eval
    } catch (error) {
      if (error instanceof Error) {
        output = 'Error ejecutando el código: ' + error.message;
      } else {
        output = 'Error desconocido';
      }
    } finally {
      console.log = originalLog; // Restaura la función original
      setModalContent(output); // Usa el output capturado
      setModalVisible(true); // Mostrar modal
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent(''); // Limpiar contenido al cerrar
  };

  return (
    <div>
      <CodeMirror
        value={code}
        height="300px"
        extensions={[javascript()]}
        onChange={(value) => setCode(value || '')}
      />
      <button onClick={runCode}>Ejecutar Prueba</button>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <pre>{modalContent}</pre>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .modal {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .modal-content {
          background-color: #fefefe;
          margin: 15% auto;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
          max-width: 600px;
        }
        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }
        .close:hover,
        .close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default TestRunner;

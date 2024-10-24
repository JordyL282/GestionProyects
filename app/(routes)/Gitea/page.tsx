"use client";

import { useState } from 'react';

const Page = () => {
    const [username, setUsername] = useState('');
    const [repoName, setRepoName] = useState('');
    const [repoData, setRepoData] = useState(null);
    const [cloneUrl, setCloneUrl] = useState('');
    const [error, setError] = useState('');

    const handleFetchRepoInfo = async () => {
        setError('');
        setRepoData(null);
        const apiUrl = `https://gitea.com/api/v1/repos/${username}/${repoName}`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            setRepoData(data);
        } catch (err) {
            setError('Error al obtener los detalles del repositorio. Intenta de nuevo.');
        }
    };

    const handleGetCloneUrl = async () => {
        const apiUrl = `https://gitea.com/api/v1/repos/${username}/${repoName}`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            setCloneUrl(data.clone_url);
        } catch (err) {
            setError('Error al obtener la URL de clonación.');
        }
    };

    const handleCreatePullRequest = async () => {
        const apiUrl = `https://gitea.com/api/v1/repos/${username}/${repoName}/pulls`;
        const pullRequestData = {
            title: 'Mi Pull Request',
            head: 'feature-branch', // Cambia esto por la rama de la que quieres hacer el PR
            base: 'main', // Rama base
            body: 'Descripción de la PR',
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token TU_TOKEN_DE_AUTENTICACION`, // Cambia por tu token
                },
                body: JSON.stringify(pullRequestData),
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            console.log('Pull Request Creado:', data);
        } catch (err) {
            setError('Error al crear el pull request.');
        }
    };

    const handleCreateIssue = async () => {
        const apiUrl = `https://gitea.com/api/v1/repos/${username}/${repoName}/issues`;
        const issueData = {
            title: 'Nuevo Issue',
            body: 'Descripción del issue',
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token TU_TOKEN_DE_AUTENTICACION`, // Cambia por tu token
                },
                body: JSON.stringify(issueData),
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            console.log('Issue Creado:', data);
        } catch (err) {
            setError('Error al crear el issue.');
        }
    };

    const handleListPullRequests = async () => {
        const apiUrl = `https://gitea.com/api/v1/repos/${username}/${repoName}/pulls`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            console.log('Pull Requests:', data);
        } catch (err) {
            setError('Error al listar los pull requests.');
        }
    };

    const handleGoToConsole = () => {
        const consoleUrl = `https://gitea.com/${username}/${repoName}/issues`;
        window.open(consoleUrl, '_blank');
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f4ff' }}>
            <h1 style={{ color: '#003366' }}>Ingresa tu usuario y nombre de repositorio</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input 
                        type="text" 
                        placeholder="Usuario" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #007bff', flex: '1' }} 
                    />
                    <input 
                        type="text" 
                        placeholder="Nombre del Repositorio" 
                        value={repoName} 
                        onChange={(e) => setRepoName(e.target.value)} 
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #007bff', flex: '1' }} 
                    />
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button 
                        onClick={handleFetchRepoInfo} 
                        style={{ padding: '10px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', flex: '1' }}
                    >
                        Obtener Info
                    </button>
                    <button 
                        onClick={handleGetCloneUrl} 
                        style={{ padding: '10px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', flex: '1' }}
                    >
                        Obtener URL de Clonación
                    </button>

                    <button 
                        onClick={handleGoToConsole} 
                        disabled={!username || !repoName} 
                        style={{ padding: '10px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', flex: '1' }}
                    >
                        Ir a Consola
                    </button>
                </div>
            </div>

            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            {repoData && (
                <div style={{ marginTop: '20px' }}>
                    <h2 style={{ color: '#003366' }}>Detalles del Repositorio</h2>
                    <pre style={{ background: '#f0f8ff', padding: '10px', borderRadius: '4px' }}>
                        {JSON.stringify(repoData, null, 2)}
                    </pre>
                </div>
            )}
            {cloneUrl && (
                <div style={{ marginTop: '20px' }}>
                    <h2 style={{ color: '#003366' }}>URL de Clonación</h2>
                    <p style={{ background: '#f0f8ff', padding: '10px', borderRadius: '4px' }}>{cloneUrl}</p>
                </div>
            )}
        </div>
    );
};

export default Page;
